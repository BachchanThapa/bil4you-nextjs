🇬🇧 English version available here: [README in English](README.LIA2.en.md)

# Bil4You – LIA 2 Praktikprojekt

Bil4You är en modern och responsiv bilförsäljningsplattform byggd med **Next.js**, **TypeScript**, **SCSS Modules** och **Supabase**.

Under LIA 2 vidareutvecklades projektet från en statisk och designbaserad webbplats till en mer dynamisk webbapplikation med autentisering, databas, bilannonser, bilbilder, kontaktflöde, användarsidor och adminfunktioner.

Målet med LIA 2 var att skapa en mer verklighetsnära webbapplikation där användare kan registrera sig, logga in, skapa bilannonser, visa bilar från databas och där administratörer kan få en bättre överblick över systemet.

---

## 📌 Projektöversikt

I LIA 2 har Bil4You utvecklats vidare med fokus på dynamisk data, användarflöden och backend-integration via Supabase.

Webbplatsen innehåller bland annat:

- **Startsida** med förbättrad presentation av bilar
- **Köp bilar** med bilar hämtade från Supabase
- **Bilens detaljsida** med dynamisk data och bildgalleri
- **Sälj bil** där inloggade användare kan skapa bilannonser
- **Kontakt** med formulär och bilintresse-flöde
- **Min sida** för inloggade användare
- **Mina annonser** för säljarens egna bilannonser
- **Mina favoriter** med användarspecifik favoritlogik
- **Adminpanel** med statistik, användare och meddelanden

Projektet har byggts stegvis med feature branches, GitHub Projects, reflektioner och kontinuerlig testning.

---

## 🛠 Teknikstack

- Next.js App Router
- TypeScript
- SCSS Modules
- Supabase Auth
- Supabase Database
- Supabase Storage
- PostgreSQL via Supabase
- Next/Image
- Responsive design
- Semantic HTML
- Git och GitHub
- Vercel deployment

---

## 🎯 Funktioner

- Registrering och inloggning med Supabase Auth
- Rollbaserad hantering för användare och admin
- Skyddade routes för privata sidor
- Dynamiska bilannonser från Supabase
- Bilbilder sparade i Supabase Storage
- Möjlighet för användare att skapa egna bilannonser
- Dynamisk bil-detaljsida med bildgalleri
- Kontaktformulär kopplat till bilintresse
- Favoritfunktion kopplad till inloggad användare
- Adminpanel med översikt och statistik
- Adminvy för användare
- Adminvy för meddelanden
- Arkivera och radera meddelanden i adminpanelen
- Responsiv layout för desktop, tablet och mobil

---

## 🔐 Autentisering och roller

Autentisering hanteras med **Supabase Auth**.

Projektet stödjer två huvudsakliga användartyper:

- **User** – kan logga in, skapa bilannonser, se egna annonser och spara favoriter
- **Admin** – kan logga in till adminpanelen och se statistik, användare och meddelanden

Användarroller sparas i tabellen `profiles` i Supabase.  
En databasfunktion och trigger används för att skapa en profil automatiskt när en ny användare registreras.

Detta gör projektet mer realistiskt eftersom användarhantering inte längre bygger på lokal frontend-logik, utan på riktig backend-data.

---

## 🗄 Databas och Supabase

Supabase används som backend-lösning för projektet.

Viktiga tabeller i databasen:

- `profiles` – sparar användarprofiler och roller
- `cars` – sparar bilannonser
- `car_images` – sparar bildlänkar och sorteringsordning
- `messages` – sparar kontaktmeddelanden och bilintresse

Supabase Storage används för att lagra bilbilder.  
Varje bil kan ha flera bilder, och bilderna visas i rätt ordning med hjälp av `sort_order`.

Detta gör att projektet fungerar mer som en riktig bilmarknadsplats där data sparas, hämtas och visas dynamiskt.

---

## 👤 Användarflöde

En vanlig användare kan:

1. Registrera ett konto
2. Logga in
3. Skapa en bilannons
4. Ladda upp bilbilder
5. Se sin bil på Köp bilar-sidan
6. Öppna bilens detaljsida
7. Se sina egna annonser på Mina annonser
8. Spara bilar som favoriter
9. Skicka intresse via kontaktformulär

Detta skapar ett komplett användarflöde från registrering till publicerad bilannons.

---

## 🛡 Adminfunktioner

Adminpanelen innehåller funktioner för bättre överblick och hantering av systemet.

Admin kan bland annat se:

- Totalt antal bilar
- Totalt antal användare
- Antal privata säljarannonser
- Senaste användare
- Meddelanden från kontaktformuläret

Admin kan även hantera meddelanden genom att:

- Läsa meddelanden
- Arkivera meddelanden
- Radera meddelanden

Adminpanelen är skyddad så att endast användare med rollen `admin` kan komma åt den.

---

## ♿ Tillgänglighet och kvalitet

Projektet har fortsatt fokus på tillgänglighet och användarvänlighet.

Exempel på tillgänglighetsarbete:

- Semantisk HTML
- Tydliga knappar och länkar
- `alt`-texter för bilder
- Responsiv layout
- Tydliga formulärfält
- Läsbara felmeddelanden
- Fokus på tydlig navigation

Lighthouse har använts som stöd för att kontrollera kvalitet, tillgänglighet, SEO och best practices.

---

## 🔎 SEO och prestanda

Projektet använder Next.js funktioner för bättre struktur och prestanda.

Exempel:

- Metadata via Next.js
- Optimerade bilder med `next/image`
- Semantisk rubrikstruktur
- Responsiva bilder
- Produktionsredo build
- Deployment via Vercel

Målet har varit att behålla en bra användarupplevelse även när projektet blivit mer dynamiskt.

---

## 🧭 Arbetsprocess

Arbetet under LIA 2 har genomförts stegvis med tydlig versionshantering.

Processen har bland annat innehållit:

1. **Planering och backlog**
   - GitHub Projects
   - Tickets och feature branches
   - Prioritering av funktioner

2. **Supabase-integration**
   - Auth
   - Database
   - Storage
   - Roller och profiler

3. **Dynamiska sidor**
   - Köp bilar från databas
   - Bilens detaljsida
   - Sälj bil-formulär
   - Mina annonser
   - Kontaktflöde

4. **Adminpanel**
   - Statistik
   - Användaröversikt
   - Meddelandehantering

5. **Polish och kvalitet**
   - UI-förbättringar
   - Bugfixar
   - Lighthouse-testning
   - Dokumentation
   - Reflektioner

---

## 🗓 Tidslinje för LIA 2

- **Vecka 1:** Planering, projektstruktur och Supabase-förberedelser
- **Vecka 2:** Autentisering, registrering och inloggning
- **Vecka 3:** Databasstruktur för bilar, profiler och bilder
- **Vecka 4:** Dynamisk Köp bilar-sida och bilens detaljsida
- **Vecka 5:** Sälj bil-flöde, bilbilder och användarsidor
- **Vecka 6:** Favoriter, kontaktflöde och skyddade routes
- **Vecka 7:** Adminpanel, statistik och meddelanden
- **Vecka 8:** Bugfixar, UI-polish, dokumentation och presentation

---

## 📷 Bildhantering

Under LIA 2 flyttades fokus från statiska bilder i projektmappen till mer dynamisk bildhantering via Supabase Storage.

Bilbilder laddas upp, sparas och kopplas till rätt bilannons via databasen.

Detta gör att nya bilar kan läggas till utan att bilder behöver hårdkodas i projektets `public`-mapp.

Alla bilder används endast i utbildningssyfte.

---

## 🤖 Verktyg & stöd

ChatGPT har använts som stödverktyg för:

- Problemlösning
- Felsökning
- Strukturering av kod
- Dokumentation
- Reflektioner
- Förklaringar av tekniska koncept

All kod har testats, anpassats och integrerats manuellt i projektet.  
Beslut kring struktur, funktioner och implementation har gjorts utifrån projektets behov och LIA-planens mål.

---

## 🤖 Lokal AI med Ollama

Bil4You innehåller även en AI-assistent byggd med lokal AI via **Ollama**.

AI-assistenten kan:

- Svara på svenska och engelska
- Hjälpa användaren att hitta bilar
- Visa riktiga bilannonser från databasen
- Generera dynamiska länkar till bilannonser

Frontend och övriga funktioner fungerar online via Next.js, Supabase och Vercel.

Själva AI-funktionen kräver däremot att **Ollama körs lokalt** på datorn, eftersom modellen inte är hostad online.

Detta val gjordes för att:
- Lära mig hur lokal AI fungerar
- Undvika externa API-kostnader
- Experimentera med AI-integration i en riktig webbapplikation

Om Ollama inte är startad visas ett tydligt meddelande i chatten istället för att applikationen kraschar.

---

## 🚀 Kom igång

Installera beroenden:

```bash
npm install