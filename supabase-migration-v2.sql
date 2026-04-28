-- ============================================
-- Hajj & Umrah App — V2 Migration
-- Inloggning, Reseplan, Förberedelser, Notifikationer
-- ============================================
-- Kör denna SQL i Supabase SQL Editor EFTER supabase-migration.sql

-- ============================================
-- PROFILES (kopplas till auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TRAVEL PLANS
-- ============================================
CREATE TABLE travel_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pilgrimage_type TEXT NOT NULL CHECK (pilgrimage_type IN ('hajj', 'umrah')),
  departure_date DATE NOT NULL,
  return_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PREPARATION TEMPLATES (admin-hanterade, public read)
-- ============================================
CREATE TABLE preparation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pilgrimage_type TEXT NOT NULL CHECK (pilgrimage_type IN ('hajj', 'umrah', 'both')),
  category TEXT NOT NULL CHECK (category IN ('dokument', 'halsa', 'packning', 'andlig', 'kunskap', 'praktiskt')),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  weeks_before_departure INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- USER TASKS (användarens framsteg)
-- ============================================
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  travel_plan_id UUID NOT NULL REFERENCES travel_plans(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES preparation_templates(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, travel_plan_id, template_id)
);

-- ============================================
-- NOTIFICATION PREFERENCES
-- ============================================
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  push_enabled BOOLEAN DEFAULT true,
  reminder_time TIME DEFAULT '09:00',
  week_before_reminder BOOLEAN DEFAULT true,
  day_before_reminder BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE preparation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Profiles: användare ser/uppdaterar bara sin egen rad
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Travel plans: användare hanterar bara sina egna
CREATE POLICY "Users can view own plans" ON travel_plans
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON travel_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON travel_plans
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own plans" ON travel_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Preparation templates: publikt läsbar
CREATE POLICY "Public read templates" ON preparation_templates
  FOR SELECT USING (true);

-- User tasks: användare hanterar bara sina egna
CREATE POLICY "Users can view own tasks" ON user_tasks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON user_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON user_tasks
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON user_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Notification preferences: användare hanterar bara sina egna
CREATE POLICY "Users can view own prefs" ON notification_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prefs" ON notification_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prefs" ON notification_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_travel_plans_user_id ON travel_plans(user_id);
CREATE INDEX idx_travel_plans_active ON travel_plans(user_id, is_active);
CREATE INDEX idx_user_tasks_plan ON user_tasks(travel_plan_id);
CREATE INDEX idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX idx_preparation_templates_type ON preparation_templates(pilgrimage_type);

-- ============================================
-- TRIGGER: Auto-skapa profil & notifikationsinställningar vid registrering
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));

  INSERT INTO notification_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA: Förberedelseuppgifter
-- ============================================

-- ANDLIG FÖRBEREDELSE
INSERT INTO preparation_templates (pilgrimage_type, category, title, description, icon_name, weeks_before_departure, sort_order) VALUES
  ('both', 'andlig', 'Rena din avsikt (niyyah)', 'Reflektera över varför du gör denna resa. Hajj och Umrah ska göras enbart för Allahs skull.', 'heart', 16, 1),
  ('both', 'andlig', 'Öka i istighfar och tawbah', 'Be Allah om förlåtelse och gör uppriktig ånger. Sök försoning med människor du har orätt mot.', 'refresh', 14, 2),
  ('both', 'andlig', 'Lär dig Talbiyah utantill', 'Memorera Talbiyah och förstå dess betydelse. Öva att recitera den dagligen.', 'musical-notes', 12, 3),
  ('both', 'andlig', 'Öka i dhikr och Koranläsning', 'Skapa en daglig rutin med dhikr och Koranläsning som förberedelse.', 'book', 10, 4),
  ('both', 'andlig', 'Lös eventuella skulder', 'Betala tillbaka skulder eller gör en plan för dem. Skriv ditt testamente om det behövs.', 'wallet', 8, 5),
  ('hajj', 'andlig', 'Förbered dig för Arafah-dagen', 'Lär dig om Arafah-dagens betydelse och planera din ibaadah för denna dag.', 'sunny', 4, 6),

-- DOKUMENT & VISUM
  ('both', 'dokument', 'Kontrollera passets giltighet', 'Passet måste vara giltigt i minst 6 månader efter resan. Förnya vid behov.', 'document-text', 20, 1),
  ('both', 'dokument', 'Ansök om visum', 'Kontakta din researrangör eller Saudi-arabiens ambassad för visumansökan.', 'globe', 16, 2),
  ('both', 'dokument', 'Kopiera viktiga dokument', 'Gör kopior av pass, visum, försäkring och biljetter. Spara digitalt och fysiskt.', 'copy', 12, 3),
  ('both', 'dokument', 'Ordna reseförsäkring', 'Se till att du har en reseförsäkring som täcker sjukvård i Saudiarabien.', 'shield-checkmark', 14, 4),

-- HÄLSA
  ('both', 'halsa', 'Boka läkarbesök', 'Gör en hälsokontroll. Diskutera eventuella mediciner och vaccinationer med din läkare.', 'medkit', 16, 1),
  ('both', 'halsa', 'Ta rekommenderade vaccinationer', 'Meningokockvaccin krävs. Kontrollera även rekommendationer för influensa och COVID-19.', 'fitness', 12, 2),
  ('both', 'halsa', 'Skaffa reseapotek', 'Packa smärtstillande, plåster, solskydd, vätskeersättning och personliga mediciner.', 'bandage', 6, 3),
  ('both', 'halsa', 'Träna kondition', 'Hajj och Umrah kräver mycket gång. Börja gå längre promenader regelbundet.', 'walk', 12, 4),

-- PACKNING
  ('both', 'packning', 'Köp Ihram-kläder', 'Skaffa bekväma Ihram-kläder. Tvätta dem och testa att bära dem hemma.', 'shirt', 8, 1),
  ('both', 'packning', 'Packa bekväma skor', 'Välj skor som tål mycket gång och är lätta att ta av vid moskéer.', 'footsteps', 6, 2),
  ('both', 'packning', 'Förbered resekit', 'Packa bönmatta, Koran, dua-bok, laddare, adapter (typ G) och vattenflaska.', 'bag-handle', 4, 3),
  ('both', 'packning', 'Packa väskan', 'Gör en slutgiltig packlista och packa. Tänk på viktighetsbegränsningar.', 'briefcase', 2, 4),

-- KUNSKAP
  ('both', 'kunskap', 'Läs steg-för-steg-guiden i appen', 'Gå igenom hela guiden noggrant. Förstå varje moment och dess ordning.', 'school', 10, 1),
  ('both', 'kunskap', 'Öva ritualer mentalt', 'Gå igenom Tawaf, Sai och alla moment steg för steg i tanken.', 'bulb', 6, 2),
  ('hajj', 'kunskap', 'Lär dig Hajj-dagarna i detalj', 'Förstå vad som händer dag 8-13 Dhul-Hijjah. Varje dag har specifika ritualer.', 'calendar', 8, 3),
  ('both', 'kunskap', 'Lär dig vanliga duas', 'Memorera de viktigaste duorna för Tawaf, Sai och allmänna åkallelser.', 'chatbubble-ellipses', 8, 4),

-- PRAKTISKT
  ('both', 'praktiskt', 'Boka flygbiljetter', 'Boka flyg i god tid. Direktflyg till Jeddah är att föredra.', 'airplane', 20, 1),
  ('both', 'praktiskt', 'Ordna boende', 'Boka hotell nära Masjid al-Haram i Makkah och Masjid an-Nabawi i Madinah.', 'bed', 18, 2),
  ('both', 'praktiskt', 'Informera arbetsgivare', 'Ansök om ledighet i god tid. Lämna kontaktuppgifter till nödfall.', 'business', 12, 3),
  ('both', 'praktiskt', 'Ordna med hemmet', 'Se till att hemmet är omhändertaget. Informera grannar och ordna post.', 'home', 4, 4),
  ('both', 'praktiskt', 'Växla till lokal valuta', 'Skaffa saudiska riyal (SAR). Ta med dig kontanter och ett betalkort.', 'cash', 3, 5);
