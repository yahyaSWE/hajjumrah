-- ============================================
-- Hajj & Umrah App — Supabase Database Schema
-- ============================================
-- Kör denna SQL i Supabase SQL Editor för att skapa alla tabeller.

-- SECTIONS
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SUBSECTIONS
CREATE TABLE subsections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section_id, slug)
);

-- CONTENT PAGES
CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subsection_id UUID NOT NULL REFERENCES subsections(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  day_number INT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQS
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- DUA CATEGORIES
CREATE TABLE dua_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DUAS
CREATE TABLE duas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES dua_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  arabic_text TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  swedish_translation TEXT NOT NULL,
  context_note TEXT,
  audio_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- MAP ASSETS
CREATE TABLE map_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  location_tag TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- APP SETTINGS
CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY — Public read, no public write
-- ============================================
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dua_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE duas ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON sections FOR SELECT USING (true);
CREATE POLICY "Public read" ON subsections FOR SELECT USING (true);
CREATE POLICY "Public read" ON content_pages FOR SELECT USING (true);
CREATE POLICY "Public read" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read" ON dua_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON duas FOR SELECT USING (true);
CREATE POLICY "Public read" ON map_assets FOR SELECT USING (true);
CREATE POLICY "Public read" ON app_settings FOR SELECT USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_subsections_section_id ON subsections(section_id);
CREATE INDEX idx_content_pages_subsection_id ON content_pages(subsection_id);
CREATE INDEX idx_faqs_section_id ON faqs(section_id);
CREATE INDEX idx_duas_category_id ON duas(category_id);
CREATE INDEX idx_map_assets_location_tag ON map_assets(location_tag);

-- ============================================
-- SEED DATA — Placeholder content
-- ============================================

-- Sections
INSERT INTO sections (slug, title, description, sort_order) VALUES
  ('hajj', 'Hajj', 'Den stora pilgrimsfärden', 1),
  ('umrah', 'Umrah', 'Den lilla pilgrimsfärden', 2),
  ('shared', 'Gemensamt', 'Gemensamt innehåll för Hajj och Umrah', 0);

-- Hajj subsections
INSERT INTO subsections (section_id, slug, title, description, sort_order)
SELECT s.id, sub.slug, sub.title, sub.description, sub.sort_order
FROM sections s,
(VALUES
  ('villkor', 'Villkor för Hajj', 'Vad som gör Hajj obligatoriskt och giltigt', 1),
  ('pelare', 'Pelare i Hajj', 'Moment vars utelämnande gör Hajj ogiltigt', 2),
  ('obligatoriska', 'Obligatoriska moment', 'Moment som kan kompenseras med offer', 3),
  ('forbjudet-ihram', 'Förbjudet under Ihram', 'Vad som är förbjudet i Ihram-tillståndet', 4),
  ('steg-for-steg', 'Steg-för-steg-guide', 'Hur Hajj utförs dag för dag', 5),
  ('faq', 'Frågor & svar', 'Vanliga frågor om Hajj', 6)
) AS sub(slug, title, description, sort_order)
WHERE s.slug = 'hajj';

-- Umrah subsections
INSERT INTO subsections (section_id, slug, title, description, sort_order)
SELECT s.id, sub.slug, sub.title, sub.description, sub.sort_order
FROM sections s,
(VALUES
  ('villkor', 'Villkor för Umrah', 'Förutsättningar för Umrah', 1),
  ('pelare', 'Pelare i Umrah', 'De grundläggande momenten', 2),
  ('obligatoriska', 'Obligatoriska moment', 'Moment som kan kompenseras', 3),
  ('forbjudet-ihram', 'Förbjudet under Ihram', 'Regler under Ihram-tillståndet', 4),
  ('steg-for-steg', 'Steg-för-steg-guide', 'Hur Umrah utförs', 5),
  ('faq', 'Frågor & svar', 'Vanliga frågor om Umrah', 6)
) AS sub(slug, title, description, sort_order)
WHERE s.slug = 'umrah';

-- Shared subsections
INSERT INTO subsections (section_id, slug, title, description, sort_order)
SELECT s.id, sub.slug, sub.title, sub.description, sub.sort_order
FROM sections s,
(VALUES
  ('intro', 'Introduktion', 'Pilgrimsfärdens religiösa betydelse', 1),
  ('travel-prep', 'Förberedelser inför resan', 'Råd och tips innan avresa', 2),
  ('talbiyah', 'Talbiyah', 'Text, uttal och betydelse', 3),
  ('common-dua', 'Gemensamma åkallelser', 'Dhikr som gäller både Hajj och Umrah', 4)
) AS sub(slug, title, description, sort_order)
WHERE s.slug = 'shared';

-- Example content pages (Hajj villkor)
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order)
SELECT sub.id, 'villkor-oversikt', 'Villkor för Hajj',
'Hajj är obligatoriskt för den muslim som uppfyller följande villkor:

**1. Islam** — Hajj är enbart obligatoriskt för muslimer.

**2. Förnuft** — Den som saknar tillräcklig förmåga att förstå är inte skyldig.

**3. Mogenhet** — Hajj är obligatoriskt när man uppnått mogen ålder.

**4. Förmåga** — Fysisk och ekonomisk möjlighet att genomföra resan.

**5. Säkerhet** — Möjligheten att resa tryggt.

> Den som uppfyller dessa villkor och har möjlighet att utföra Hajj ska göra det utan onödigt dröjsmål.',
1
FROM subsections sub
JOIN sections s ON sub.section_id = s.id
WHERE s.slug = 'hajj' AND sub.slug = 'villkor';

-- Example content pages (Hajj pelare)
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order)
SELECT sub.id, 'pelare-oversikt', 'Pelare i Hajj',
'Pelarna är de moment vars utelämnande gör att Hajj inte är giltigt och inte kan kompenseras med ett offer (fidyah).

**1. Ihram** — Avsikten och klädnaden. Att träda in i pilgrimstillståndet med ren avsikt.

**2. Vistelsen i Arafah** — Att stanna i Arafah den 9:e Dhul-Hijjah. Detta är Hajjs viktigaste moment.

**3. Tawaf al-Ifadah** — Att gå sju varv runt Kaaba efter vistelsen i Arafah.

**4. Sa''i mellan Safa och Marwah** — Att gå sju sträckor mellan Safa och Marwah.',
1
FROM subsections sub
JOIN sections s ON sub.section_id = s.id
WHERE s.slug = 'hajj' AND sub.slug = 'pelare';

-- Example Hajj steg-for-steg (dag-för-dag)
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order)
SELECT sub.id, page.slug, page.title, page.body, page.day_number, page.sort_order
FROM subsections sub
JOIN sections s ON sub.section_id = s.id,
(VALUES
  ('fore-ankomst', 'Före ankomst', 'Förberedelse inför resan: intentioner, Ihram från hemlandet eller Miqat, råd inför avresa.

- Se till att du har rätt avsikt (niyyah)
- Förbered dina Ihram-kläder
- Lär dig Talbiyah utantill', 1, 1),
  ('ihram', 'Inträde i Ihram', 'Hur man träder in i Ihram:

**Niyyah (avsikt)** — Gör din avsikt klar i hjärtat.

**Talbiyah** — Säg Talbiyah högt efter att du klätt dig i Ihram.

**Förbudsregler** — Från och med nu gäller Ihrams förbudsregler.', 2, 2),
  ('ankomst-makkah', 'Ankomst till Makkah', 'Vid ankomst till Makkah:

1. Utför **Tawaf al-Qudoom** (ankomstens Tawaf)
2. Utför **Sa''i** mellan Safa och Marwah
3. Vistelse i Makkah fram till den 8:e Dhul-Hijjah', 3, 3)
) AS page(slug, title, body, day_number, sort_order)
WHERE s.slug = 'hajj' AND sub.slug = 'steg-for-steg';

-- Example FAQs
INSERT INTO faqs (section_id, question, answer, sort_order)
SELECT s.id, faq.question, faq.answer, faq.sort_order
FROM sections s,
(VALUES
  ('Måste man utföra Hajj direkt när man har möjlighet?', 'Majoriteten av de lärda anser att Hajj ska utföras så snart man har möjlighet och inte bör fördröjas utan giltig anledning.', 1),
  ('Vad händer om man missar Arafah?', 'Att stanna i Arafah är en pelare i Hajj. Om man missar vistelsen i Arafah helt är Hajj inte giltigt och måste göras om.', 2),
  ('Kan en kvinna utföra Hajj utan mahram?', 'Enligt majoriteten av de lärda behöver en kvinna en mahram (manlig släkting) för att resa till Hajj. Vissa lärda tillåter det i sällskap av trygga kvinnor.', 3)
) AS faq(question, answer, sort_order)
WHERE s.slug = 'hajj';

-- Example Dua categories
INSERT INTO dua_categories (slug, title, description, sort_order) VALUES
  ('talbiyah', 'Talbiyah', 'Pilgrimernas åkallelse', 1),
  ('tawaf', 'Under Tawaf', 'Åkallelser vid rundvandringen runt Kaaba', 2),
  ('sai', 'Under Sa''i', 'Åkallelser mellan Safa och Marwah', 3),
  ('arafah', 'På Arafah', 'Åkallelser under vistelsen i Arafah', 4),
  ('allmanna', 'Allmänna åkallelser', 'Generella böner under pilgrimsfärden', 5);

-- Example Duas
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id, d.title, d.arabic_text, d.transliteration, d.swedish_translation, d.context_note, d.sort_order
FROM dua_categories c,
(VALUES
  ('talbiyah', 'Talbiyah',
   'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
   'Labbayk Allaahumma labbayk, labbayk laa shareeka laka labbayk. Innal-hamda wan-ni''mata laka wal-mulk, laa shareeka lak.',
   'Jag svarar på Din kallelse, o Allah, jag svarar på Din kallelse. Jag svarar på Din kallelse, Du har ingen medhjälpare. All lovprisning och alla välsignelser tillhör Dig, och all makt. Du har ingen medhjälpare.',
   'Reciteras upprepade gånger från det att man träder in i Ihram',
   1)
) AS d(cat_slug, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
WHERE c.slug = d.cat_slug;
