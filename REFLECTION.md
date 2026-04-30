🇬🇧 English version available here: [REFLECTION in English](REFLECTION.en.md)

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
