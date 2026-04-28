-- ============================================
-- Hajj & Umrah App — Innehallsuppdatering
-- Baserat pa Hadjboken
-- ============================================
-- Kor denna SQL i Supabase SQL Editor (Dashboard > SQL Editor)
-- OBS: Kors som service_role, sa RLS kringas automatiskt.
-- ============================================

BEGIN;

-- ============================================
-- 1. RADERA BEFINTLIGT INNEHALL
-- ============================================
DELETE FROM duas;
DELETE FROM content_pages;
DELETE FROM faqs;

-- ============================================
-- 2. HAJJ — CONTENT PAGES
-- ============================================

-- ----- HAJJ VILLKOR -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('25eabd43-23e6-41b1-936c-b78682f5e0ce', 'hajj-villkor', 'Villkor for Hajj',
'Hajj ar den femte pelaren i islam och ar obligatoriskt for varje muslim som uppfyller foljande villkor:

## 1. Att man ar muslim

Hajj ar en ibadah (gudsdyrkan) och godtas enbart fran en muslim. En icke-muslims handlingar godtas inte av Allah.

## 2. Att man har natt puberteten

Ett barn som utfor Hajj far beloning, men det raknas inte som den obligatoriska Hajj. Nar barnet nar puberteten maste Hajj goras pa nytt om villkoren uppfylls.

## 3. Att man ar vid sina sinnes fulla bruk

Den som saknar forstandsformaga ar befriad fran skyldigheten. Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Pennan ar lyft fran tre: fran den sovande tills han vaknar, fran barnet tills det nar puberteten, och fran den sinnessjuke tills han aterfar sitt forstand."*

## 4. Att man ar ekonomiskt och fysiskt kapabel

Man maste ha rad att bekosta resan **utover** sina grundlaggande behov och familjens forsorjning. Man maste ocksa vara fysiskt kapabel att genomfora riterna. Den som ar for sjuk eller gammal kan skicka en stallforetradare.

---

> **Viktig regel:** Den som uppfyller dessa villkor och har mojlighet att utfora Hajj ska gora det utan onodigt drojsmal. Profeten *(salla Allahu alayhi wa sallam)* sade: *"Skynd er till Hajj — den obligatoriska — ty ingen av er vet vad som kan handa honom."*',
1);

-- ----- HAJJ PELARE -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('451717f1-b360-4835-a756-72528cfaae97', 'hajj-pelare', 'Hadjs pelare',
'Hadjs pelare ar de handlingar som Hadj bygger pa. En persons Hadj ar **inte korrekt** om man lamnar nagon av dessa pelare. De kan inte heller kompenseras med ett offerdjur — de maste utforas.

## 1. al-Ihram — Avsikten att paborja riterna

Ihram ar inte bara kladnaden, utan framfor allt **avsikten (niyyah)** i hjartat att trada in i Hajj-riterna. Fran och med denna punkt galler Ihrams forbudsregler.

## 2. Att sta pa ''Arafah-platan

Detta ar **Hajjs viktigaste moment**. Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Hajj ar ''Arafah."*

Man maste befinna sig pa ''Arafah-platan nagon gang under den 9:e Dhul-Hijjah, fran efter dhuhr till solnedgang. Den som missar ''Arafah har missat Hajj.

## 3. Tawaf ul-Ifadah

Att man gar **sju varv** runt Ka''bah efter att ha lamnat ''Arafah. Detta kallas ocksa Tawaf az-Ziyarah. Allah den Hogste sager:

> *"Lat dem sedan gora slut pa sitt ovardade yttre, infria sina loften och ga runt det urgamla Huset."* (al-Hajj 22:29)

## 4. as-Sa''y — Vandringen mellan as-Safa och al-Marwa

Att man gar **fram och tillbaka** langs as-Safa och al-Marwa **sju ganger**. Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Gor Sa''y, ty Allah har foreskrivit Sa''y for er."*

---

> **Observera:** Om nagon av dessa pelare utelamnas ar Hajj ogiltigt oavsett anledning. Dessa moment kan **inte** kompenseras med nagot offer.',
1);

-- ----- HAJJ OBLIGATORISKA MOMENT -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('9c51ee03-9ccf-42e1-a2ee-6df129150420', 'hajj-obligatoriska', 'Obligatoriska moment i Hajj',
'De obligatoriska momenten (wajibat) i Hajj ar handlingar som **maste utforas**, men om man utelamnar nagon av dem sa ar Hajj fortfarande giltigt — dock maste man **kompensera** genom att slakta ett offerdjur (fidyah).

## 1. Att man gar in i al-Ihram fran al-Miqat

Varje riktning har en bestamt plats (Miqat) dar man maste trada in i Ihram. Man far **inte** passera Miqat utan att vara i Ihram-tillstand.

- Fran Medina: **Dhul-Hulayfah** (Abyar Ali)
- Fran Sham/Egypten: **al-Juhfah** (nara Rabigh)
- Fran Najd: **Qarn al-Manazil**
- Fran Jemen: **Yalamlam**
- Fran Irak: **Dhat ''Irq**

## 2. Att man ar kvar pa ''Arafah tills solen gatt ned

Den som befinner sig pa ''Arafah **fore** solnedgangen maste stanna kvar tills solen gatt ned helt. Att lamna ''Arafah innan solnedgang ar en forsumlighet som kraver kompensation.

## 3. Att man befinner sig i Muzdalifah pa natten till den tionde dagen

Man maste tillbringa natten i Muzdalifah efter att ha lamnat ''Arafah. Har ber man **Maghrib och ''Isha** ihopslagna (jam'' ta''khir). De svaga och sjuka far lamna efter midnatt.

## 4. Att man befinner sig i Mina under Tashriq-natterna

Natterna den 11:e, 12:e och 13:e Dhul-Hijjah ska man tillbringa i Mina. Den som vill snabba pa far lamna den 12:e fore solnedgang.

## 5. Att man under Tashriq-dagarna slanger smastensarna pa pelarna i ratt ordning

Kastningen sker i ordningen:
1. **al-Jamrah as-Sughra** (den lilla pelaren)
2. **al-Jamrah al-Wusta** (den mellersta pelaren)
3. **Jamrat al-''Aqabah** (den stora pelaren)

Varje pelare kastas med **sju stenar**, en i taget, med takbir vid varje kast.

## 6. Att man rakar eller forkortar sitt har

Efter kastningen pa offerdagen rakar eller forkortar man haret. **Rakning** ar battre for man, baserat pa Profetens *(salla Allahu alayhi wa sallam)* du''a:

> *"O Allah, forbarm Dig over dem som rakar."* De sade: "Och dem som forkortar?" Han sade: *"O Allah, forbarm Dig over dem som rakar."* De sade: "Och dem som forkortar?" Han sade vid tredje gangen: *"Och dem som forkortar."*

Kvinnor klipper enbart en fingertopps langd av haret.

## 7. Att man gor avslutnings-tawaf (Tawaf al-Wada'')

Innan man lamnar Mecka maste man gora ett avslutande tawaf. **Undantag:** Kvinnor med menstruation eller postpartum-blodning ar befriade fran detta.

---

> **Viktigt tillagg:** Den som utfor **Tamattu''-hadj** (Umrah forst, sedan Hajj) ar ocksa **obligerad att slakta ett offerdjur** (hady). Om man inte har rad fastar man tre dagar under Hajj och sju dagar nar man atervandar hem — totalt tio dagar.',
1);

-- ----- HAJJ FORBJUDET UNDER IHRAM -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('2c792555-cd4b-4982-9a76-25557fffbfc5', 'hajj-forbjudet-ihram', 'Forbjudet under Ihram',
'Nar man trader in i Ihram-tillstandet galler ett antal forbud. Att bryta mot dessa kan krava **kompensation** (fidyah) i form av fasta, valgorenhet eller slakt.

## Forbud som galler bade man och kvinnor

### 1. Ta bort har fran kroppen
Det ar forbjudet att raka, klippa eller pa annat satt ta bort har fran nagon kroppsdel. Allah den Hogste sager:

> *"Raka inte era huvuden forran offret har natt sin bestammelse."* (al-Baqarah 2:196)

### 2. Klippa naglar
Att klippa naglar pa hander eller fotter under Ihram ar forbjudet.

### 3. Anvanda parfym
Anvandning av parfym, doftande oljor, doftande tval eller nagot med avsiktlig doft ar forbjudet — bade pa kroppen och pa kladerna. Profeten *(salla Allahu alayhi wa sallam)* sade om en man som dog under Ihram:

> *"Tva honom med vatten och sidr (lotustrad), svep honom i hans tva plagg, och anvand ingen parfym pa honom."*

### 4. Sexuellt umgange eller forspel
Samlag ogiltigforklarar Hajj helt om det sker **fore** den forsta tahallul (losgorandet). Forspel och att tala om sadant med avsikt ar ocksa forbjudet.

### 5. Doda jaktdjur
Det ar forbjudet att jaga landdjur eller att hjalpa nagon annan att jaga. Allah den Hogste sager:

> *"Det ar forbjudet for er att jaga till lands sa lange ni befinner er i helig beredskap."* (al-Ma''idah 5:96)

### 6. Ingangande av aktenskapskontrakt
Man far varken gifta sig eller uppvakta for aktenskap under Ihram.

---

## Forbud specifikt for **man**

### Sy ihop klader
Mannen far **inte** bara sydda klader som foljer kroppens form — t.ex. skjorta, byxor, underklader, strumpor eller skor som tacker ankeln. Istallet bar man:
- **Izar** — ett tyg runt underkroppen
- **Rida''** — ett tyg over overkroppen
- **Sandaler** som inte tacker ankeln

### Tacka huvudet
Mannen far inte tacka huvudet med nagot som sitter fast (turban, mossa, huva). Skugga fran parasoll eller biltak ar tillatat.

---

## Forbud specifikt for **kvinnor**

### Niqab (ansiktsskynke)
Kvinnan far inte bara niqab over ansiktet under Ihram. Hon far dock tacka ansiktet med sin huvudduk om framande man ar nara.

### Handskar
Det ar forbjudet for kvinnan att bara handskar under Ihram. Hon far dock tacka handerna med sin kladdnad.

---

> **Kompensation (fidyah):** Den som av forglomska eller okunskap bryter mot ett forbud behovs ingen kompensation. Den som gor det avsiktligt maste valja en av tre: **fasta tre dagar**, **ge mat at sex fattiga**, eller **slakta ett far**.',
1);

-- ----- HAJJ STEG-FOR-STEG -----
-- Dag 1: Umrah vid ankomst
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'umrah-ankomst', 'Umrah vid ankomst',
'## Handlingar vid al-Miqat

For den som utfor **Tamattu''** (den vanligaste formen) borjar man med att gora Umrah vid ankomst.

### Forberedelse vid Miqat
1. **Ghusl** (helbadstvatt) — Sunna att gora ghusl innan man trader in i Ihram, aven for kvinnor med menstruation
2. **Parfymera kroppen** (inte kladerna) — Det ar sunna att parfymera kroppen fore Ihram. ''A''ishah *(radiya Allahu ''anha)* sade: *"Jag brukade parfymera Profeten for hans Ihram."*
3. **Klada sig i Ihram-kladsel** — Mannen: tva vita osydda tyger (izar och rida''). Kvinnan: vanliga, tackande klader
4. **Gora niyyah (avsikt)** — Sag: **"Labbayk Allahumma bi-''Umrah"** (Jag svarar pa Din kallelse med Umrah)
5. **Borja med Talbiyah** — Upprepas flitigt under hela resan

### Resa till Mecka
Upprepa **Talbiyah** kontinuerligt. Nar du ser Ka''bah, gor du''a — det ar ett tillfalle da bon besvaras.

### Ga in i al-Masjid al-Haram
- Trad in med **hoger fot** forst
- Las du''a for att trada in i mosken:

> *"Bismillah, was-salatu was-salamu ''ala Rasulillah. Allahumma-ftah li abwaba rahmatik."*
> (I Allahs namn, och frid och valsignelser over Allahs Sandebud. O Allah, oppna barmhartighetens dorrar for mig.)

### Tawaf (sju varv runt Ka''bah)
1. Borja vid **Svarta stenen** (al-Hajar al-Aswad) — peka mot den och sag **"Bismillah, Allahu Akbar"**
2. Ga **motsols** (Ka''bah pa din vanstra sida)
3. **Idtiba''** — Man lagger rida'' under hoger armhala och over vanster axel
4. **Raml** — Mannen gar med snabba, korta steg de forsta **tre varven**
5. Mellan **Rukn al-Yamani och Svarta stenen** las:

> *"Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina ''adhab an-nar."*

6. Avsluta sju varv vid Svarta stenen

### Tva rak''ah vid Maqam Ibrahim
Efter tawaf, be **tva rak''ah** bakom Maqam Ibrahim (eller var som helst i mosken om det ar trangt). Las Surat al-Kafirun i forsta och Surat al-Ikhlas i andra.

### Sa''y mellan as-Safa och al-Marwa
1. Borja vid **as-Safa** — las: *"Inna as-Safa wal-Marwata min sha''a''irillah"*
2. Ga till **al-Marwa** (1 stracka), sedan tillbaka (2 strackor) osv.
3. Man gar snabbt (harwalah) mellan de **grona markorna** (enbart man)
4. Gor du''a pa bade as-Safa och al-Marwa
5. Totalt: **7 strackor** (avslutas vid al-Marwa)

### Avsluta Umrah
- **Man:** Raka eller forkorta haret (rakning ar battre)
- **Kvinna:** Klipp en fingertopps langd av haret
- Nu ar du fri fran Ihram — allt som var forbjudet ar atigen tillatat
- Vanta i Mecka till den 8:e Dhul-Hijjah',
1, 1);

-- Dag 2: 8:e Dhul-Hijjah (Tarwiyah)
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'tarwiyah', 'Den 8:e Dhul-Hijjah (Tarwiyah-dagen)',
'## Forberedelse for Hajj

Pa morgonen den 8:e Dhul-Hijjah paborjar man sjalva Hajj-riterna.

### Pa morgonen
1. **Ghusl** — Ta helbadstvatt (sunna)
2. **Parfymera kroppen** — Samma som vid Umrah
3. **Trad in i Ihram** fran det stalle du befinner dig (t.ex. ditt hotell i Mecka)
4. **Gor niyyah for Hajj** — Sag: **"Labbayk Allahumma bi-Hajj"** (Jag svarar pa Din kallelse med Hajj)
5. **Borja med Talbiyah**

### Bege dig till Mina
- Man beger sig till **Mina** fore dhuhr
- I Mina ber man **alla fem boner** pa sina ratta tider
- Bonerna **forkortas** (4 rak''ah blir 2) men slas **inte ihop**
- Dhuhr, ''Asr och ''Isha forkortas. Maghrib och Fajr bes som vanligt

### Natten i Mina
- Tillbringa natten i Mina
- Agnad tiden at **dhikr**, **du''a** och **forberedelse** for ''Arafah-dagen
- Las Quran och reflektera over Hajjs innebord

---

> **Tips:** Denna dag ar en forberedelse. Spara din energi for ''Arafah-dagen — det ar Hajjs viktigaste dag.',
2, 2);

-- Dag 3: 9:e Dhul-Hijjah (Arafah)
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'arafah-dagen', 'Den 9:e Dhul-Hijjah (''Arafah-dagen)',
'## Hajjs viktigaste dag

Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Hajj ar ''Arafah."*

### Bege dig till ''Arafah
- Pa morgonen efter Fajr beger man sig fran Mina till **''Arafah**
- Hela ''Arafah-platan ar giltig att sta pa **utom** dalen Uranah
- Se till att du befinner dig **inom ''Arafahs granser**

### Bonerna
- **Dhuhr och ''Asr** bes **ihopslagna och forkortade** (jam'' taqdim) med ett adhan och tva iqamah
- Detta ar i enlighet med Profetens *(salla Allahu alayhi wa sallam)* sunna

### Tiden pa ''Arafah
Denna dag ar den **basta dagen** for akallan. Agnad hela tiden at:

- **Du''a** (akallan) — Lyft handerna och be fran hjartat
- **Dhikr** — Prisning av Allah
- **Istighfar** — Be om forlatelse
- **Talbiyah** — Upprepas flitigt

Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Den basta du''a ar du''a pa ''Arafah-dagen, och det basta jag och profeterna fore mig har sagt ar: La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ''ala kulli shay''in qadir."*

### Stanna till solnedgang
- Man **maste** stanna pa ''Arafah tills solen har gatt ned helt
- Att lamna fore solnedgang ar en forsumlighet som kraver kompensation (dam)

### Bege dig till Muzdalifah
- Efter solnedgang beger man sig till **Muzdalifah** lugnt och vardigt
- Uppreppa **Talbiyah** under vandringen

### I Muzdalifah
1. **Maghrib och ''Isha** bes **ihopslagna** (jam'' ta''khir) — Maghrib 3 rak''ah, ''Isha 2 rak''ah
2. **Sov** — Overnatta i Muzdalifah (obligatoriskt)
3. **Samla stenar** — Plocka upp smastenar for kastningen (minst 7 for nasta dag, men samla garna fler)
4. De **svaga**, sjuka och aldre far lamna Muzdalifah **efter midnatt**

---

> **Viktigt:** ''Arafah-dagen ar en unik mojlighet. Allah befriar fler fran Elden denna dag an nagon annan dag. Slosa inte bort tiden — be, grat, och var odmiuk infor din Herre.',
3, 3);

-- Dag 4: 10:e Dhul-Hijjah (Offerdagen)
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'eid-offerdagen', 'Den 10:e Dhul-Hijjah (Offerdagen)',
'## Yawm an-Nahr — den storsta dagen

Profeten *(salla Allahu alayhi wa sallam)* kallade den 10:e Dhul-Hijjah for *"den storsta Hajj-dagen"*. Denna dag utfors flera viktiga handlingar.

### 1. Kasta stenar pa Jamrat al-''Aqabah

- Lamna Muzdalifah efter **Fajr-bon** (eller efter midnatt for svaga)
- Ga till **Jamrat al-''Aqabah** (den stora pelaren, narmast Mecka)
- Kasta **7 smastenar**, en i taget
- Vid varje kast sager man: **"Allahu Akbar"**
- **Sluta med Talbiyah** — fran och med nu sager man inte langre Talbiyah

### 2. Slakta offerdjur (hady)

- Obligatoriskt for den som utfor **Tamattu''** eller **Qiran**
- Offerdjuret ska vara fritt fran uppenbara defekter
- Man kan ge nagon i uppdrag att slakta (t.ex. via ett slaktprojekt i Mecka)
- Sag: **"Bismillah, Allahu Akbar"** vid slakt

### 3. Raka eller klippa haret

- **Rakning** ar battre for man (se Profetens du''a)
- **Forkorta** ar ocksa tillatat
- **Kvinnan** klipper en fingertopps langd
- Detta ar den **forsta tahallul** (del-losgorande)

> **Efter forsta tahallul** ar allt som var forbjudet under Ihram atigen tillatat **utom** sexuellt umgange.

### 4. Tawaf ul-Ifadah

- Bege dig till Mecka for att utfora **Tawaf ul-Ifadah** (pelare i Hajj)
- Utfors som vanlig tawaf — **7 varv** runt Ka''bah
- Ingen idtiba'' eller raml vid denna tawaf
- Be **tva rak''ah** efter tawaf

### 5. Sa''y

- Om du inte gjorde Sa''y efter Tawaf al-Qudum, gor det nu
- **7 strackor** mellan as-Safa och al-Marwa
- Detta ar den **andra (fullstandiga) tahallul** — nu ar aven sexuellt umgange tillatat

### Ordningen pa handlingarna

Profeten *(salla Allahu alayhi wa sallam)* utforde dem i denna ordning:
1. Kastning
2. Slakt
3. Rakning
4. Tawaf

Men han tillfrerades om annan ordning och svarade: **"Gor, det ar inget hinder"** — sa ordningen ar flexibel.

---

> **Tips:** Aterand till Mina efter Tawaf for att tillbringa Tashriq-natterna dar.',
4, 4);

-- Dag 5: Tashriq-dagarna
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'tashriq', 'Tashriq-dagarna (11:e-13:e Dhul-Hijjah)',
'## Dagarna i Mina

Tashriq-dagarna ar de tre dagarna efter offerdagen. Allah den Hogste sager:

> *"Och aminn Allah under de raknade dagarna."* (al-Baqarah 2:203)

### Varje dag: Kasta stenar pa alla tre pelare

Kastningen sker **efter att solen passerat sin hogsta punkt** (efter dhuhr-tid) varje dag.

#### Ordning (viktig!):
1. **al-Jamrah as-Sughra** (den lilla, langst fran Mecka)
   - Kasta **7 stenar**, en i taget, med **"Allahu Akbar"** vid varje kast
   - Stall dig sedan at sidan, vand mot Qiblah, och **gor du''a** en lang stund

2. **al-Jamrah al-Wusta** (den mellersta)
   - Kasta **7 stenar** pa samma satt
   - Stall dig sedan at sidan och **gor du''a** en lang stund

3. **Jamrat al-''Aqabah** (den stora, narmast Mecka)
   - Kasta **7 stenar** pa samma satt
   - **Gor INTE du''a** efter denna — ga direkt vidare

### Natten i Mina
- Man **maste** tillbringa natten i Mina under Tashriq-natterna
- Det innebar att man ska vara i Mina **storre delen av natten**

### Tidig avfard (ta''ajjul)
Den som vill far lamna Mina den **12:e Dhul-Hijjah** efter kastningen, **fore solnedgang**. Allah sager:

> *"Den som snabbar pa och gor det pa tva dagar beginner inte ett fel, och den som drojer beginner inte ett fel — detta for den som ar gudfruktig."* (al-Baqarah 2:203)

Om solen gar ned medan man fortfarande ar i Mina den 12:e, maste man stanna och kasta stenar aven den 13:e.

---

> **Paminelse:** Anvand tiden i Mina for dhikr, du''a och att lasa Quran. Det ar fortfarande heliga dagar.',
5, 5);

-- Dag 6: Avfardstawaf
INSERT INTO content_pages (subsection_id, slug, title, body, day_number, sort_order) VALUES
('c39a70f5-7b8d-476a-a282-67d24eba0c82', 'avfardstawaf', 'Avfardstawaf (Tawaf al-Wada'')',
'## Den sista handlingen innan avresa

Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Lat ingen av er resa harifran forran han gor sin sista handling vid Huset (Ka''bah)."*

### Hur avfardstawaf utfors
1. Nar du ar redo att lamna Mecka, bege dig till **al-Masjid al-Haram**
2. Utfor **tawaf** — 7 varv runt Ka''bah pa vanligt satt
3. Be **tva rak''ah** efter tawaf
4. **Drick Zamzam-vatten** och gor du''a
5. Avfardstawaf ska vara din **allra sista handling** i Mecka — res direkt efter

### Undantag
Kvinnor med **menstruation** eller **postpartum-blodning** ar befriade fran avfardstawaf. Ibn ''Abbas *(radiya Allahu ''anhuma)* sade:

> *"Folk beordrades att gora sin sista handling vid Huset, men det lättades for kvinnan med menstruation."*

### Vanliga misstag
- **Att handla eller stanna lange efter tawaf** — Avfardstawaf ska vara det sista man gor. Kort shopping for fornodenheter ar tillatat, men man ska inte droja.
- **Att ga ut baklänges fran mosken** — Detta har ingen grund i Sunnah. Ga ut normalt.

---

> **Du''a vid avresa fran Mecka:** Be Allah att acceptera din Hajj, forlata dina synder, och att fa aterkomma till Hans heliga Hus. Ma Allah gora dig till en av dem som atervandar renade fran synder som den dag din mor fodde dig.

**Grattis — ma Allah acceptera din Hajj! Hajj Mabrur!**',
6, 6);


-- ============================================
-- 3. UMRAH — CONTENT PAGES
-- ============================================

-- ----- UMRAH VILLKOR -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('a3527ba6-3bc3-42d0-aed3-0e234adbd991', 'umrah-villkor', 'Villkor for Umrah',
'Umrah ar obligatoriskt en gang i livet enligt den starkaste asikten bland de larda, och villkoren ar desamma som for Hajj:

## 1. Att man ar muslim

Umrah ar en ibadah (gudsdyrkan) och godtas enbart fran en muslim.

## 2. Att man har natt puberteten

Ett barns Umrah ar giltig men raknas inte som den obligatoriska Umrah.

## 3. Att man ar vid sina sinnes fulla bruk

Den som saknar forstandsformaga ar befriad fran skyldigheten.

## 4. Att man ar ekonomiskt och fysiskt kapabel

Man maste ha rad och fysisk formaga att genomfora resan.

---

> **Skillnad fran Hajj:** Umrah kan utforas nar som helst under aret, medan Hajj ar bunden till specifika dagar. Umrah kallas darfor "den lilla pilgrimsfarden".',
1);

-- ----- UMRAH PELARE -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('2e17b0c8-528d-4edc-8845-e97f50eb6475', 'umrah-pelare', 'Pelare i Umrah',
'Umrahs pelare ar de handlingar som Umrah bygger pa. Om nagon av dessa utelamnas ar Umrah **ogiltigt**.

## 1. Ihram — Avsikten att paborja riterna

Att man gor niyyah (avsikt) i hjartat att trada in i Umrah och sager:

> **"Labbayk Allahumma bi-''Umrah"**

## 2. Tawaf — Sju varv runt Ka''bah

Att man gar **sju varv** runt Ka''bah med borjan och slut vid Svarta stenen, med Ka''bah pa vanster sida.

## 3. Sa''y — Vandringen mellan as-Safa och al-Marwa

Att man gar **sju strackor** mellan as-Safa och al-Marwa, med borjan vid as-Safa och avslut vid al-Marwa.

## 4. Raka eller klippa haret

Att man rakar eller forkortar haret efter Sa''y. Rakning ar battre for man. Kvinnan klipper en fingertopps langd.

---

> **Observera:** Till skillnad fran Hajj har Umrah farre pelare, men var och en ar lika viktig. Utelamning av nagon pelare gor Umrah ogiltigt.',
1);

-- ----- UMRAH OBLIGATORISKA -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('bcc8c78d-09fd-4831-83c6-891bf56e8973', 'umrah-obligatoriska', 'Obligatoriska moment i Umrah',
'De obligatoriska momenten i Umrah ar farre an i Hajj. Om man utelamnar nagon av dem ar Umrah fortfarande giltig, men man maste kompensera med ett offerdjur (fidyah).

## 1. Ihram fran Miqat

Man maste trada in i Ihram **fran eller fore** sin Miqat-punkt. Att passera Miqat utan Ihram kraver kompensation.

### Miqat-punkterna:
- **Dhul-Hulayfah** (Abyar Ali) — for resande fran Medina
- **al-Juhfah** (nara Rabigh) — for resande fran Sham/vastra riktningen
- **Qarn al-Manazil** — for resande fran Najd
- **Yalamlam** — for resande fran Jemen
- **Dhat ''Irq** — for resande fran Irak

> Den som bor **inom** Miqat-granserna gor Ihram fran sin bostad. Den som bor i Mecka gor Ihram fran **at-Tan''im** eller nagon plats utanfor al-Harams granser.

## 2. Avslutnings-tawaf

Den som utfor Umrah separat (inte som del av Tamattu'') gor avfardstawaf som sista handling innan avresa fran Mecka.

---

> **Paminelse:** Aven om dessa moment ar farre an i Hajj, ar de viktiga. Forsummelse kraver kompensation genom slakt av ett offerdjur.',
1);

-- ----- UMRAH FORBJUDET UNDER IHRAM -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('fb624ee4-491b-4c76-8175-be5abb64c5ac', 'umrah-forbjudet-ihram', 'Forbjudet under Ihram (Umrah)',
'Forbuden under Ihram ar **identiska** oavsett om man utfor Hajj eller Umrah. Nar man trader in i Ihram for Umrah galler foljande:

## Forbud for bade man och kvinnor
1. **Ta bort har** fran nagon kroppsdel
2. **Klippa naglar** pa hander eller fotter
3. **Anvanda parfym** pa kropp eller klader
4. **Sexuellt umgange** eller forspel
5. **Doda jaktdjur**
6. **Inga aktenskapskontrakt** far ingas

## Forbud specifikt for man
- **Sydda klader** som foljer kroppens form (skjorta, byxor, etc.)
- **Tacka huvudet** med nagot fastsittande (mossa, turban)

## Forbud specifikt for kvinnor
- **Niqab** (ansiktsskynke)
- **Handskar**

---

## Kompensation (fidyah)

Om man bryter mot ett forbud **medvetet** valjer man en av:
- **Fasta** tre dagar
- **Ge mat** at sex fattiga
- **Slakta** ett far

Den som gor det av **forglomska eller okunskap** behover inte kompensera.

> Se motsvarande avsnitt under Hajj for mer detaljer och bevis fran Quran och Sunnah.',
1);

-- ----- UMRAH STEG-FOR-STEG -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('f8498d94-7c93-4fd2-b3aa-40d773efac94', 'umrah-steg-for-steg', 'Hur Umrah utfors — steg for steg',
'Umrah bestar av farre steg an Hajj och kan utforas pa nagra timmar. Har foljer en komplett guide:

## Steg 1: Ihram vid Miqat

### Forberedelse
1. **Ghusl** — Ta helbadstvatt
2. **Parfymera kroppen** — Inte kladerna
3. **Klada sig** — Man: tva vita osydda tyger. Kvinna: vanliga tackande klader

### Trada in i Ihram
- Gor **niyyah** (avsikt) for Umrah
- Sag: **"Labbayk Allahumma bi-''Umrah"**
- Borja med **Talbiyah** och upprepa den flitigt:

> *"Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni''mata laka wal-mulk, la sharika lak."*

---

## Steg 2: Tawaf — Sju varv runt Ka''bah

1. Ga in i mosken med **hoger fot** forst, las du''a for intrude i mosken
2. Borja vid **Svarta stenen** — peka och sag **"Bismillah, Allahu Akbar"**
3. **Idtiba''** (man) — Hoger axel bar under rida''
4. **Raml** (man) — Snabba steg de forsta 3 varven
5. Ga **motsols** — Ka''bah pa din vanstra sida
6. Mellan Rukn al-Yamani och Svarta stenen las:

> *"Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina ''adhab an-nar."*

7. Gor du''a fritt under resten av varje varv
8. Avsluta 7 varv vid Svarta stenen

---

## Steg 3: Tva rak''ah vid Maqam Ibrahim

- Be **tva rak''ah** bakom Maqam Ibrahim (eller var som helst i mosken)
- Forsta rak''ah: **Surat al-Kafirun**
- Andra rak''ah: **Surat al-Ikhlas**
- Drick **Zamzam-vatten** och gor du''a

---

## Steg 4: Sa''y — Mellan as-Safa och al-Marwa

1. Ga till **as-Safa** — las: *"Inna as-Safa wal-Marwata min sha''a''irillah"*
2. Stig upp pa as-Safa, vand dig mot Ka''bah, lyft handerna och gor du''a
3. Ga till **al-Marwa** (stracka 1)
4. **Harwalah** (man) — Ga snabbt mellan de grona markorna
5. Vid al-Marwa: vand dig mot Ka''bah och gor du''a
6. Ga tillbaka till as-Safa (stracka 2)
7. Fortsatt tills du avslutart **7 strackor** (avslutas vid al-Marwa)

---

## Steg 5: Klippa eller raka haret

- **Man:** Raka hela huvudet (bast) eller forkorta haret jamt
- **Kvinna:** Klipp en **fingertopps langd** fran harspetsarna

### Nu ar din Umrah avslutad!
Allt som var forbjudet under Ihram ar nu aterigen tillatat.

---

> **Tips:** Umrah kan utforas nar som helst under aret, men ar sarskilt vardefullt under Ramadan. Profeten *(salla Allahu alayhi wa sallam)* sade: *"Umrah under Ramadan motsvarar en Hajj."*',
1);


-- ============================================
-- 4. HAJJ FAQ
-- ============================================

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Kan man anvanda parfym efter att man tagit pa sig Ihram?',
'**Nej**, det ar forbjudet att anvanda parfym pa kroppen eller kladerna sa lange man ar i Ihram-tillstand. Man far parfymera kroppen *fore* Ihram, men inte efter. Att avsiktligt anvanda parfym under Ihram kraver kompensation (fidyah): fasta tre dagar, ge mat at sex fattiga, eller slakta ett far.',
1);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Vad hander om man missar ''Arafah?',
'Om man missar vistelsen pa ''Arafah ar **Hajj inte giltigt** och maste goras om. Profeten *(salla Allahu alayhi wa sallam)* sade: *"Hajj ar ''Arafah."* Man maste befinna sig pa ''Arafah-platan nagon gang mellan dhuhr den 9:e Dhul-Hijjah och Fajr den 10:e. Den som helt missar detta har missat Hajj och maste gora Umrah istallet, och sedan gora om Hajj nasta ar.',
2);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Maste man stanna i Muzdalifah hela natten?',
'Det ar **obligatoriskt** att tillbringa natten i Muzdalifah. Man ber Maghrib och ''Isha ihopslagna dar. Dock far **svaga, sjuka och aldre** lamna Muzdalifah efter midnatt for att undvika trangsel. Friska personer bor stanna till efter Fajr-bonen och gora du''a vid al-Mash''ar al-Haram.',
3);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Ska man raka eller klippa haret?',
'**Rakning ar bast** for man. Profeten *(salla Allahu alayhi wa sallam)* bad for dem som rakar tre ganger innan han bad for dem som forkortar. Men om man har kort tid till nasta Hajj eller Umrah kan forkorta vara batter for att ha har att raka vid nasta tillfalle. **Kvinnor** klipper alltid bara en fingertopps langd — de rakar aldrig huvudet.',
4);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Kan man kasta stenar innan solen natt sin hogsta punkt under Tashriq-dagarna?',
'**Nej**, det ar ett vanligt misstag. Kastningen under Tashriq-dagarna (11:e, 12:e och 13:e) far **inte** ske fore dhuhr-tid (nar solen passerat sin hogsta punkt). Pa offerdagen (10:e) far man dock kasta efter Fajr. Att kasta fore ratt tid ar ogiltigt och maste goras om.',
5);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('74358875-b468-484c-a014-6a6dc7e153ac',
'Hur manga varv gar man runt Ka''bah?',
'Man gar **7 varv** runt Ka''bah (tawaf). Man borjar och avslutar vid Svarta stenen. **Man** gar med snabba, korta steg (raml) under de **forsta 3 varven** och gar normalt de sista 4. Kvinnor gar normalt alla 7 varv. Varje varv borjar med att peka mot Svarta stenen och saga "Bismillah, Allahu Akbar".',
6);


-- ============================================
-- 5. UMRAH FAQ
-- ============================================

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('da9d7b54-de1d-44f7-af90-d1090a590a2b',
'Kan man gora Umrah nar som helst under aret?',
'**Ja**, Umrah kan utforas nar som helst under aret, till skillnad fran Hajj som ar bundet till specifika dagar. Umrah ar sarskilt vardefull under **Ramadan** — Profeten *(salla Allahu alayhi wa sallam)* sade: *"Umrah under Ramadan motsvarar en Hajj."*',
1);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('da9d7b54-de1d-44f7-af90-d1090a590a2b',
'Hur lang tid tar Umrah?',
'Sjalva Umrah-riterna (tawaf, sa''y, och klippning) tar vanligtvis **2-4 timmar** beroende pa trangsel. Under hogsasong (Ramadan, Hajj-sasongen) kan det ta langre tid. Forberedelserna vid Miqat tar ytterligare tid.',
2);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('da9d7b54-de1d-44f7-af90-d1090a590a2b',
'Maste man gora Umrah fran Miqat om man redan ar i Mecka?',
'Ja, den som bor i eller besiker Mecka och vill gora Umrah maste resa till en plats **utanfor al-Harams granser** for att gora Ihram. Den vanligaste platsen ar **at-Tan''im** (Masjid ''A''ishah), som ligger strax utanfor Meckas heliga omrade.',
3);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('da9d7b54-de1d-44f7-af90-d1090a590a2b',
'Vad ar skillnaden mellan Umrah och Hajj?',
'De viktigaste skillnaderna:
- **Tid:** Hajj sker enbart 8-13 Dhul-Hijjah; Umrah kan goras nar som helst
- **Pelare:** Hajj har 4 pelare (inkl. ''Arafah); Umrah har 4 pelare (utan ''Arafah)
- **Omfattning:** Hajj inkluderar Mina, ''Arafah, Muzdalifah och stenkastning; Umrah inkluderar enbart tawaf, sa''y och harklippning
- **Status:** Hajj ar den femte pelaren i islam; Umrah ar obligatorisk en gang enligt starkaste asikten',
4);

INSERT INTO faqs (section_id, question, answer, sort_order) VALUES
('da9d7b54-de1d-44f7-af90-d1090a590a2b',
'Far en kvinna gora Umrah under menstruation?',
'En kvinna med menstruation far trada in i Ihram och gora alla Umrah-riter **utom tawaf**. Hon vantar tills menstruationen ar over, tar ghusl, och utfor sedan tawaf och resten av riterna. Hon ar befriad fran avfardstawaf.',
5);


-- ============================================
-- 6. SHARED — CONTENT PAGES
-- ============================================

-- ----- INTRO -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('4b53be87-f434-43d0-8038-ed231940a9ca', 'forord', 'Pilgrimsfarden — en resa till Allah',
'## Hajj och Umrahs betydelse

All lovprisning tillhor Allah, varldarnas Herre. Frid och valsignelser over var profet Muhammad, hans familj och alla hans foljare.

Hajj ar den **femte pelaren** i islam och en av de storsta ibadah (gudsdyrkan) en muslim kan utfora. Allah den Hogste sager:

> *"Att vallfarda till Huset ar en plikt gentemot Allah for var och en som har mojlighet att genomfora det."* (Al ''Imran 3:97)

---

## Hadiths om Hajjs fortjanster

### 1. Hajj renar fran synder
Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"Den som utfor Hajj och inte begar oanstandigheter eller synder atervandar som den dag hans mor fodde honom."*
> *(al-Bukhari och Muslim)*

### 2. Hajj Mabrur har ingen annan beloning an Paradiset
Profeten *(salla Allahu alayhi wa sallam)* sade:

> *"En godtagen Hajj (Hajj Mabrur) har ingen annan beloning an Paradiset."*
> *(al-Bukhari och Muslim)*

### 3. Hajj ar bland de basta handlingarna
Profeten *(salla Allahu alayhi wa sallam)* tillfragades: *"Vilken handling ar bast?"* Han svarade: *"Tro pa Allah och Hans Sandebud."* Det fragades: *"Sedan da?"* Han svarade: *"Jihad for Allahs sak."* Det fragades: *"Sedan da?"* Han svarade: *"En godtagen Hajj."*
> *(al-Bukhari och Muslim)*

---

## Om denna app

Denna app ar baserad pa **Hadjboken** och presenterar de viktigaste reglerna och stegen for Hajj och Umrah enligt Quran och Sunnah. Innehallet foljer den **hanbalitiska** lagskolans grunder med hanvisningar till majoritetsasikter.

Malet ar att ge dig en **praktisk och palitlig** guide som du kan anvanda fore, under och efter din pilgrimsfard.

> *"O Allah, gor vart Hajj godtaget, var synd forlatad, och var anstrangning belond."*',
1);

-- ----- TRAVEL PREP -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('42d0af9b-2737-40c5-8bc4-8ed84f90cf2d', 'reseforbereldelser', 'Forberedelser infor resan',
'## Innan avresa

### Andliga forberedelser
- **Ren avsikt (niyyah)** — Gor resan enbart for Allahs skull
- **Anger och omvandelse (tawbah)** — Be om forlatelse for alla synder
- **Betala skulder** — Betala tillbaka alla skulder eller ordna avtal
- **Be om forlatelse** fran dem du har felat mot
- **Lar dig riterna** — Studera Hajj/Umrah-reglerna ordentligt
- **Lar dig Talbiyah** utantill

### Praktiska forberedelser
- **Pass och visum** — Kontrollera giltighet i god tid
- **Vaccinationer** — Kontrollera aktuella krav for Saudi-Arabien
- **Ihram-klader** — Kop tva vita osydda tyger (man)
- **Bekvan klader** — Tackande, bekavam klader (kvinna)
- **Medicin** — Ta med nodvandiga lakemedel
- **Pengar** — Saudiska riyal eller kreditkort

---

## Akallan vid resa

Nar man paborjar resan laser man:

> **"Allahu Akbar, Allahu Akbar, Allahu Akbar. Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina la-munqalibun."**

> *"Allah ar storst, Allah ar storst, Allah ar storst. Fri fran brister ar Den som har gjort detta underordnat oss — vi hade inte kunnat gora detta pa egen hand. Och till var Herre ska vi sannerligen atervanda."*

---

## Vid al-Miqat

### Ghusl (helbadstvatt)
Det ar **sunna** att ta ghusl fore Ihram. Aven kvinnor med menstruation tar ghusl, da det ar for renheten vid Ihram och inte for rituell renhet.

### Parfym
- Parfymera **kroppen** (inte kladerna) fore Ihram
- ''A''ishah *(radiya Allahu ''anha)* sade: *"Jag brukade parfymera Allahs Sandebud for hans Ihram innan han tradde in i Ihram."*

### Ihram-kladsel
**Man:**
- **Izar** — Vitt osytt tyg runt underkroppen
- **Rida''** — Vitt osytt tyg over overkroppen
- **Sandaler** — Ska inte tacka ankeln

**Kvinna:**
- Vanliga, **tackande klader** i valfri farg
- Inget ansiktsskynke (niqab) eller handskar under Ihram
- Huvudet ska vara tackt

### Niyyah och Talbiyah
Gor din avsikt och borja med Talbiyah. Fran och med nu galler Ihrams regler.

---

> **Tips:** Gor tva rak''ah fore Ihram (ej obligatoriskt men rekommenderat). Trad in i Ihram vid Miqat — inte fore, inte efter.',
1);

-- ----- TALBIYAH -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('90670c19-95d4-4163-be1c-0171c5a5bcdc', 'talbiyah', 'Talbiyah — Pilgrimernas rop',
'## Den arabiska texten

> **لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ**

## Translitteration

> **Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni''mata laka wal-mulk, la sharika lak.**

## Svensk oversattning

> **"Jag svarar pa Din kallelse, o Allah, jag svarar pa Din kallelse. Jag svarar pa Din kallelse, Du har ingen medhjalpare, jag svarar pa Din kallelse. Sannerligen tillhor all lovprisning och alla valsignelser Dig, och all makt. Du har ingen medhjalpare."**

---

## Regler for Talbiyah

### Nar borjar man?
- Man borjar med Talbiyah **direkt** efter att man gjort niyyah for Ihram vid Miqat

### Nar slutar man?
- **Umrah:** Man slutar med Talbiyah nar man **borjar tawaf** (vid forsta varvet)
- **Hajj:** Man slutar med Talbiyah nar man **kastar stenar** pa Jamrat al-''Aqabah pa offerdagen

### Hur reciteras den?
- **Man:** Hojer rosten
- **Kvinna:** Sager den sa att de nara henne hor
- Upprepas **ofta** — under resan, vid byte av tillstand (stiga upp, stiga ner), efter bon, och nar man trader Haram

### Talbiyahs innebord
Talbiyah ar ett **svar pa Allahs kallelse** till Ibrahim *(alayhi salam)* att kalla manniskorna till Hajj:

> *"Och utrop for manniskorna skyldigheten att vallfarda — de ska komma till dig till fots och pa varje smal kamel, fran alla avlagsna vagar."* (al-Hajj 22:27)

---

> **Tips:** Lar dig Talbiyah utantill fore resan. Upprepa den sa ofta du kan — den ar ett av de vackraste ljuden under Hajj.',
1);

-- ----- COMMON DUA -----
INSERT INTO content_pages (subsection_id, slug, title, body, sort_order) VALUES
('f85ed4c7-72d7-414f-b9b4-ef4b2cefb1e6', 'gemensamma-akallan', 'Gemensamma akallelser',
'## Akallan vid resa

> **سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ**

> *"Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina la-munqalibun."*

> **"Fri fran brister ar Den som har gjort detta underordnat oss — vi hade inte kunnat gora det pa egen hand. Och till var Herre ska vi sannerligen atervanda."**

---

## Akallan vid intrude i mosken

> **بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ**

> *"Bismillah, was-salatu was-salamu ''ala Rasulillah. Allahumma-ftah li abwaba rahmatik."*

> **"I Allahs namn, och frid och valsignelser over Allahs Sandebud. O Allah, oppna barmhartighetens dorrar for mig."**

---

## Akallan vid utgaende fran mosken

> **بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ**

> *"Bismillah, was-salatu was-salamu ''ala Rasulillah. Allahumma inni as''aluka min fadlik."*

> **"I Allahs namn, och frid och valsignelser over Allahs Sandebud. O Allah, jag ber Dig om Din nad."**

---

## Akallan mellan Rukn al-Yamani och Svarta stenen

Denna du''a lases under **varje varv** i tawaf, mellan det jemenitiska hornet och Svarta stenen:

> **رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ**

> *"Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina ''adhab an-nar."*

> **"Var Herre, ge oss det goda i denna varld och det goda i nasta liv, och skydda oss fran Eldens straff."**

---

## Akallan pa as-Safa och al-Marwa

Nar man stiger upp pa as-Safa eller al-Marwa, vandar sig mot Ka''bah, lyfter handerna och laser:

> **لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ**

> *"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ''ala kulli shay''in qadir. La ilaha illallahu wahdah, anjaza wa''dah, wa nasara ''abdah, wa hazama al-ahzaba wahdah."*

> **"Ingen har ratt att dyrkas utom Allah ensam, utan medhjalpare. Honom tillhor all makt och all lovprisning, och Han formagner allting. Ingen har ratt att dyrkas utom Allah ensam. Han uppfyllde Sitt lofte, gav Sitt stod at Sin tjanare och besegrade koalitionerna ensam."**

Sedan gor man fri du''a, och upprepar denna dhikr **tre ganger** med du''a emellan.

---

## Akallan pa ''Arafah-dagen

Den basta du''a pa ''Arafah:

> **لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ**

> *"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ''ala kulli shay''in qadir."*

> **"Ingen har ratt att dyrkas utom Allah ensam, utan medhjalpare. Honom tillhor all makt och all lovprisning, och Han formagner allting."**

---

> **Paminelse:** Du''a ar gudsdyrkans karna. Profeten *(salla Allahu alayhi wa sallam)* sade: *"Du''a ar ibadah (gudsdyrkan)."* Gor du''a pa ditt eget sprak om du vill — Allah forstar alla sprak.',
1);


-- ============================================
-- 7. DUAS
-- ============================================

-- First, let us reference the dua_categories by slug.
-- We assume these already exist from the seed data.

-- TALBIYAH DUAS
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Talbiyah',
  'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
  'Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni''mata laka wal-mulk, la sharika lak.',
  'Jag svarar pa Din kallelse, o Allah, jag svarar pa Din kallelse. Jag svarar pa Din kallelse, Du har ingen medhjalpare, jag svarar pa Din kallelse. Sannerligen tillhor all lovprisning och alla valsignelser Dig, och all makt. Du har ingen medhjalpare.',
  'Reciteras upprepat fran det att man trader in i Ihram. Man slutar vid Tawaf (Umrah) eller vid stenkastning pa offerdagen (Hajj).',
  1
FROM dua_categories c WHERE c.slug = 'talbiyah';

-- TAWAF DUAS
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Vid Svarta stenen',
  'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ',
  'Bismillah, Allahu Akbar',
  'I Allahs namn, Allah ar storst.',
  'Sags vid borjan av varje varv nar man pekar mot eller beror Svarta stenen.',
  1
FROM dua_categories c WHERE c.slug = 'tawaf';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Mellan Rukn al-Yamani och Svarta stenen',
  'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
  'Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina ''adhab an-nar.',
  'Var Herre, ge oss det goda i denna varld och det goda i nasta liv, och skydda oss fran Eldens straff.',
  'Lases i varje varv mellan det jemenitiska hornet och Svarta stenen. (al-Baqarah 2:201)',
  2
FROM dua_categories c WHERE c.slug = 'tawaf';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Efter Tawaf (vid Maqam Ibrahim)',
  'وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى',
  'Wattakhidhu min Maqami Ibrahima musalla.',
  'Och tag Ibrahims plats som boneplats.',
  'Lases nar man gar till Maqam Ibrahim for att be tva rak''ah efter tawaf. (al-Baqarah 2:125)',
  3
FROM dua_categories c WHERE c.slug = 'tawaf';

-- SA'I DUAS
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Vid as-Safa (borjan)',
  'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
  'Inna as-Safa wal-Marwata min sha''a''irillah.',
  'Sannerligen ar as-Safa och al-Marwa bland Allahs symboler.',
  'Lases en gang nar man borjar Sa''y och narmar sig as-Safa. (al-Baqarah 2:158)',
  1
FROM dua_categories c WHERE c.slug = 'sai';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Pa as-Safa och al-Marwa',
  'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ',
  'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ''ala kulli shay''in qadir. La ilaha illallahu wahdah, anjaza wa''dah, wa nasara ''abdah, wa hazama al-ahzaba wahdah.',
  'Ingen har ratt att dyrkas utom Allah ensam, utan medhjalpare. Honom tillhor all makt och all lovprisning, och Han formagner allting. Ingen har ratt att dyrkas utom Allah ensam. Han uppfyllde Sitt lofte, gav Sitt stod at Sin tjanare och besegrade koalitionerna ensam.',
  'Lases tre ganger pa bade as-Safa och al-Marwa, med fri du''a emellan. Man vandar sig mot Ka''bah och lyfter handerna.',
  2
FROM dua_categories c WHERE c.slug = 'sai';

-- ARAFAH DUAS
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Basta du''a pa ''Arafah',
  'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
  'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ''ala kulli shay''in qadir.',
  'Ingen har ratt att dyrkas utom Allah ensam, utan medhjalpare. Honom tillhor all makt och all lovprisning, och Han formagner allting.',
  'Den basta akallan pa ''Arafah-dagen enligt Profeten (salla Allahu alayhi wa sallam). Upprepas ofta under hela dagen.',
  1
FROM dua_categories c WHERE c.slug = 'arafah';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Sayyid al-Istighfar',
  'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
  'Allahumma Anta Rabbi la ilaha illa Ant, khalaqtani wa ana ''abduk, wa ana ''ala ''ahdika wa wa''dika mastata''t. A''udhu bika min sharri ma sana''t, abu''u laka bi-ni''matika ''alayya wa abu''u bi-dhanbi, faghfir li fa-innahu la yaghfiru-dhunuba illa Ant.',
  'O Allah, Du ar min Herre. Det finns ingen gud utom Du. Du skapade mig och jag ar Din tjanare. Jag haller mig till Ditt foredrag och Ditt lofte sa gott jag kan. Jag soker tillflykt hos Dig fran det onda jag har gjort. Jag erkanner Din valsignelse over mig och jag erkanner min synd. Forlat mig darfor, ty ingen forlater synder utom Du.',
  'Mast utmarkta formen av istighfar (att be om forlatelse). Sarskilt lamplig pa ''Arafah-dagen.',
  2
FROM dua_categories c WHERE c.slug = 'arafah';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Du''a for forlatelse',
  'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
  'Rabbi-ghfir li wa tub ''alayya innaka Anta at-Tawwab ar-Rahim.',
  'Min Herre, forlat mig och acceptera min anger. Du ar sannerligen Den som standigt accepterar anger, Den Barmhartige.',
  'Upprepas ofta pa ''Arafah-dagen. Allah befriar fler fran Elden denna dag an nagon annan.',
  3
FROM dua_categories c WHERE c.slug = 'arafah';

-- ALLMANNA DUAS
INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Akallan vid resa',
  'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
  'Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina la-munqalibun.',
  'Fri fran brister ar Den som har gjort detta underordnat oss — vi hade inte kunnat gora det pa egen hand. Och till var Herre ska vi sannerligen atervanda.',
  'Lases nar man paborjar en resa, stiger pa transportmedel.',
  1
FROM dua_categories c WHERE c.slug = 'allmanna';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Akallan vid intrude i mosken',
  'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
  'Bismillah, was-salatu was-salamu ''ala Rasulillah. Allahumma-ftah li abwaba rahmatik.',
  'I Allahs namn, och frid och valsignelser over Allahs Sandebud. O Allah, oppna barmhartighetens dorrar for mig.',
  'Lases nar man trader in i vilken moske som helst, inklusive al-Masjid al-Haram.',
  2
FROM dua_categories c WHERE c.slug = 'allmanna';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Akallan vid utgaende fran mosken',
  'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
  'Bismillah, was-salatu was-salamu ''ala Rasulillah. Allahumma inni as''aluka min fadlik.',
  'I Allahs namn, och frid och valsignelser over Allahs Sandebud. O Allah, jag ber Dig om Din nad.',
  'Lases nar man lamnar mosken. Trad ut med vanster fot forst.',
  3
FROM dua_categories c WHERE c.slug = 'allmanna';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Vid stenkastning (takbir)',
  'اللَّهُ أَكْبَرُ',
  'Allahu Akbar',
  'Allah ar storst.',
  'Sags vid varje stenkast under Tashriq-dagarna och pa offerdagen.',
  4
FROM dua_categories c WHERE c.slug = 'allmanna';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Akallan efter bon',
  'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
  'Allahumma a''inni ''ala dhikrika wa shukrika wa husni ''ibadatik.',
  'O Allah, hjalp mig att minnas Dig, tacka Dig och dyrka Dig pa basta satt.',
  'Profeten (salla Allahu alayhi wa sallam) rad till Mu''adh ibn Jabal att lasa denna efter varje bon.',
  5
FROM dua_categories c WHERE c.slug = 'allmanna';

INSERT INTO duas (category_id, title, arabic_text, transliteration, swedish_translation, context_note, sort_order)
SELECT c.id,
  'Akallan for acceptans',
  'اللَّهُمَّ تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
  'Allahumma taqabbal minna innaka Anta as-Sami'' al-''Alim.',
  'O Allah, acceptera fran oss. Du ar sannerligen Den Horande, Den Allvetande.',
  'Kan lasas efter varje rit och handling under Hajj och Umrah. Baserad pa Ibrahims och Isma''ils akallan i Quran (al-Baqarah 2:127).',
  6
FROM dua_categories c WHERE c.slug = 'allmanna';

COMMIT;
