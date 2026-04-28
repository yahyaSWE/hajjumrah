-- ============================================
-- FIX: Skapa profiler för befintliga användare + fixa trigger-rättigheter
-- Kör detta i Supabase SQL Editor
-- ============================================

-- 1. Ge triggerfunktionen rätt att skriva till profiles och notification_preferences
-- (SECURITY DEFINER borde räcka, men vi säkerställer att RLS tillåter insert)
CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert prefs" ON notification_preferences
  FOR INSERT WITH CHECK (true);

-- 2. Skapa profiler för eventuella befintliga auth.users som saknar profil
INSERT INTO profiles (id, display_name)
SELECT id, COALESCE(raw_user_meta_data->>'display_name', '')
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT DO NOTHING;

-- 3. Skapa notification_preferences för befintliga användare som saknar det
INSERT INTO notification_preferences (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT DO NOTHING;

-- 4. Ta bort och återskapa triggerfunktionen med bättre felhantering
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''))
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Verifiera att triggern finns
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
