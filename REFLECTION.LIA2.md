🇬🇧 English version available here: [REFLECTION in English](REFLECTION.LIA2.en.md)

# Bil4You LIA 2 Reflektioner

---

## Ticket #28 – Autentiseringssystem

### Vad jag lärde mig
1. Hur Supabase Auth kan ersätta localStorage-baserad autentisering med riktiga backend-sessioner.
2. Hur man bygger inloggnings- och registreringsflöden med `signInWithPassword()` och `signUp()`.
3. Hur man skyddar känsliga sidor i Next.js genom att kontrollera aktiv session innan åtkomst.
4. Hur navigationsfältet kan uppdateras dynamiskt beroende på användarens inloggningsstatus.
5. Hur lösenordsåterställning fungerar med återställningsmail från Supabase och en egen reset-sida.
6. Hur man validerar lösenord på frontend innan konto skapas.
7. Hur tydliga fel- och successmeddelanden förbättrar användarupplevelsen vid autentisering.

### Varför detta är viktigt
Detta autentiseringssystem gör Bil4You mer produktionsredo genom att möjliggöra säkra användarkonton och skyddade funktioner.

---

## Ticket #40 – Spara bilannonser till databas

### Vad jag lärde mig
1. Hur man designar relationsdatabaser för kopplad data (`cars` och `car_images`).
2. Hur man laddar upp bildfiler till Supabase Storage innan databasposter sparas.
3. Hur man sparar uppladdade bild-URL:er i en separat bildtabell.
4. Hur man kopplar en bilannons till flera bilder med foreign keys.
5. Hur man sparar data steg för steg i databasen och behåller relationer mellan tabeller.
6. Hur man hämtar relationsdata från Supabase med nästlade `.select()`-queries.
7. Hur Next.js kräver att externa bilddomäner från Supabase tillåts i `next.config.ts`.

### Varför detta är viktigt
Denna integration gjorde Bil4You från en statisk frontend-prototyp till en dynamisk fullstack-applikation där riktiga bilannonser kan sparas och visas.

---

## Ticket #34 – API / Dataintegration

### Vad jag lärde mig
1. Hur frontend kan hämta riktig data från Supabase istället för att använda statiska arrayer.
2. Hur man kopplar Next.js-sidor till databasen med Supabase queries.
3. Hur data från flera tabeller kan hämtas tillsammans, till exempel bilar och bilbilder.
4. Hur man hanterar laddning, tomma resultat och fel när data hämtas från backend.
5. Hur databasen blir en central källa för innehållet på webbplatsen.
6. Hur ändringar i Supabase kan synas direkt i applikationen utan att ändra kod.
7. Hur dataintegration gör projektet mer realistiskt och närmare en riktig webbapplikation.

### Varför detta är viktigt
API- och dataintegrationen gör att Bil4You inte längre bara visar hårdkodad information, utan använder riktig data från en backend.

---

## Ticket #43 – Dynamisk bildetaljsida

### Vad jag lärde mig
1. Hur man skapar en dynamisk sida i Next.js baserad på bilens `id`.
2. Hur varje bilannons kan få en egen detaljsida med unik information.
3. Hur man hämtar en specifik bil från Supabase med `.eq("id", id)` och `.single()`.
4. Hur man visar flera bilder från `car_images` på samma detaljsida.
5. Hur man hanterar situationer där en bil inte hittas i databasen.
6. Hur dynamiska routes gör webbplatsen mer flexibel och skalbar.
7. Hur användarupplevelsen förbättras när varje bil har en tydlig och informativ sida.

### Varför detta är viktigt
Den dynamiska bildetaljsidan gör att Bil4You fungerar mer som en riktig bilförsäljningssida där varje bil har sin egen presentation.

---

## Ticket #31 – Sök- och filtreringsförbättringar

### Vad jag lärde mig
1. Hur man bygger sökfunktioner som hjälper användaren att hitta rätt bil snabbare.
2. Hur filter kan användas för att sortera och begränsa bilresultat.
3. Hur frontend-state kan styra vilka bilar som visas på sidan.
4. Hur sök och filter förbättrar användarresan på en bilförsäljningssida.
5. Hur man kan kombinera flera filter utan att förstöra layouten.
6. Hur tomma sökresultat bör hanteras med tydliga meddelanden.
7. Hur små UX-förbättringar kan göra sidan mycket mer användbar.

### Varför detta är viktigt
Sökning och filtrering gör Köp bilar-sidan mer användarvänlig och hjälper besökare att snabbt hitta bilar som passar deras behov.

---

## Ticket #29 – Favoritsystem

### Vad jag lärde mig
1. Hur användare kan spara intressanta bilar som favoriter.
2. Hur ett favoritsystem förbättrar jämförelse och beslutsfattande för användaren.
3. Hur frontend kan uppdateras direkt när användaren klickar på en favoritknapp.
4. Hur inloggade användare kan få mer personliga funktioner.
5. Hur favoritstatus kan visas visuellt med till exempel en ikon.
6. Hur användarens val kan sparas och hämtas från databasen.
7. Hur små interaktiva funktioner gör webbplatsen mer levande.

### Varför detta är viktigt
Favoritsystemet gör Bil4You mer användarcentrerat eftersom besökare kan markera och komma tillbaka till bilar de är intresserade av.

---

## Ticket #30 – Hero Section Enhancement

### Vad jag lärde mig
1. Hur en hero-sektion kan användas för att skapa ett starkt första intryck.
2. Hur rubrik, bild, text och call-to-action tillsammans styr användarens första upplevelse.
3. Hur designförbättringar kan göra startsidan mer professionell.
4. Hur tydliga knappar kan leda användaren vidare till viktiga sidor som Köp bilar och Sälj bil.
5. Hur spacing, färger och typografi påverkar helhetskänslan.
6. Hur startsidan kan presentera Bil4You som ett mer trovärdigt företag.
7. Hur små visuella förbättringar kan göra stor skillnad i presentationen.

### Varför detta är viktigt
En förbättrad hero-sektion gör att startsidan känns mer färdig, modern och tydlig för nya besökare.

---

## Ticket #32 – Admin Panel

### Vad jag lärde mig
1. Hur man kan skapa en separat adminvy för att få bättre överblick över systemet.
2. Hur adminpanelen kan visa statistik från databasen, till exempel antal användare, bilar och meddelanden.
3. Hur man kan läsa kontaktmeddelanden som skickas från kontaktformuläret.
4. Hur adminfunktioner kan skyddas så att vanliga användare inte får tillgång.
5. Hur roller i profiltabellen kan användas för att skilja mellan admin och vanlig användare.
6. Hur Supabase-data kan användas för att skapa enkla dashboard-liknande funktioner.
7. Hur en adminpanel gör projektet mer realistiskt och mer likt ett riktigt företagssystem.

### Varför detta är viktigt
Adminpanelen visar att Bil4You inte bara är en kundsida, utan också har interna funktioner för att hantera och följa upp information.

---

## Mindre buggfixar och UX-förbättringar

### Favoriter kräver inloggning
Tidigare kunde gäster spara favoritbilar i localStorage, vilket inte passade ett användarbaserat system.  
Jag uppdaterade logiken så att gäster skickas till inloggning innan de kan spara favoriter.

### Bilintresse kräver inloggning
En gäst kunde öppna en bil och skicka en intresseanmälan utan att vara autentiserad.  
Jag ändrade flödet så att bilintresse kopplas till inloggade användare, medan vanliga frågor via kontaktsidan fortfarande är öppna.

### Dölj intresseknapp på egen annons
En säljare kunde se knappen “Jag är intresserad” på sin egen bilannons.  
Jag lade till en ägarkontroll med `cars.user_id` och Supabase Auth, så säljaren nu ser “Detta är din annons” istället.

### Startsidesökning kopplas till bilresultat
Sökningen på startsidan skickade tidigare bara användaren vidare på ett enklare sätt.  
Jag kopplade sökningen till `/kop-bilar`, så användaren kan söka på märke, modell, titel eller årsmodell.

### Dynamiska bilar i hero-sektionen
Hero-sektionen på startsidan var begränsad till ett mindre antal bilar.  
Jag uppdaterade den så att fler aktiva bilannonser från Supabase kan visas, vilket gör startsidan mer dynamisk.

---

## Ticket #33 – AI Chat Assistant Integration

### Vad jag lärde mig
1. Hur man bygger en enkel AI-chattfunktion i Next.js med egna API-routes.
2. Hur frontend och backend kan kommunicera med `fetch()` och JSON-data.
3. Hur Ollama kan användas lokalt för att köra AI-modeller utan externa API-kostnader.
4. Hur Supabase-data kan kombineras med AI-svar för att visa riktiga bilannonser direkt i chatten.
5. Hur AI-assistenten kan svara på både svenska och engelska beroende på användarens språk.
6. Hur dynamiska länkar till bilannonser kan genereras direkt från databasen.
7. Hur små UI-förbättringar som flytande AI-knapp och startsidesintegration förbättrar användarupplevelsen.

### Varför detta är viktigt
AI-assistenten gör Bil4You mer modern och interaktiv genom att hjälpa användare hitta bilar och få information direkt via en chattfunktion.