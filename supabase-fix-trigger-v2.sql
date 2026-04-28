-- ============================================
-- ROBUST FIX: Trigger + RLS för registrering
-- Kör hela scriptet i Supabase SQL Editor
-- ============================================

-- 1. Ta bort ALLA befintliga policies för INSERT (om de finns)
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Service role can insert prefs" ON notification_preferences;
DROP POLICY IF EXISTS "Allow trigger insert profiles" ON profiles;
DROP POLICY IF EXISTS "Allow trigger insert prefs" ON notification_preferences;

-- 2. Skapa NYA policies som tillåter INSERT (för triggern)
CREATE POLICY "Allow trigger insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow trigger insert prefs" ON notification_preferences
  FOR INSERT WITH CHECK (true);

-- 3. Ta bort gamla triggern och funktionen
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- 4. Skapa ny robust trigger-funktion med felhantering
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Försök skapa profil
  BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''))
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Could not create profile for user %: %', NEW.id, SQLERRM;
  END;

  -- Försök skapa notification_preferences
  BEGIN
    INSERT INTO public.notification_preferences (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Could not create notification prefs for user %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;

-- 5. Ge funktionen rätt rättigheter
GRANT EXECUTE ON FUNCTION handle_new_user() TO postgres, anon, authenticated, service_role;

-- 6. Återskapa triggern
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 7. Skapa profiler för befintliga användare som saknar det
INSERT INTO profiles (id, display_name)
SELECT id, COALESCE(raw_user_meta_data->>'display_name', '')
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT DO NOTHING;

INSERT INTO notification_preferences (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT DO NOTHING;

-- 8. Verifiera resultat
SELECT 'Triggers:' as info;
SELECT trigger_name FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';

SELECT 'Insert policies on profiles:' as info;
SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND cmd = 'INSERT';

SELECT 'Insert policies on notification_preferences:' as info;
SELECT policyname FROM pg_policies WHERE tablename = 'notification_preferences' AND cmd = 'INSERT';

SELECT 'Users without profile:' as info;
SELECT COUNT(*) FROM auth.users WHERE id NOT IN (SELECT id FROM profiles);
