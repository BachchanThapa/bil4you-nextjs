🇬🇧 English version available here: [README in English](README.LIA1.en.md)

# Bil4You – Praktikprojekt

Bil4You är en responsiv bilförsäljningswebbplats byggd med **Next.js** som en del av ett praktikprojekt.  
Projektets mål var att designa och implementera en modern, användarvänlig och responsiv webbplats baserad på en Figma-design och en tydlig projektplan.

---

## 📌 Projektöversikt

Webbplatsen innehåller följande sidor:

- **Startsida**
- **Köp bilar** (lista + filter/sortering UI)
- **Sälj bil** (formulär med validering + bekräftelsevy)
- **Kontakt oss** (kontaktformulär + kontaktuppgifter + öppettider)
- **Bilens detaljsida** med interaktivt bildgalleri

Projektet följer den struktur och plan som angavs i praktikplanen och har utvecklats stegvis från design till färdig implementation.

---

## 🛠 Teknikstack

- Next.js (App Router)
- TypeScript
- SCSS Modules
- Next/Image (bildoptimering)
- Responsiv design (mobile-first)
- Semantisk HTML

---

## 🎯 Funktioner

- Fullt responsiv layout (Desktop / Tablet / Mobil 320px+)
- Interaktivt bildgalleri med klickbara thumbnails
- Scrollbar thumbnail-rad på mobil
- Formulärvalidering (frontend)
- Tydliga felmeddelanden
- Tillgängliga knappar och korrekt semantik
- Grundläggande SEO
- Produktionsredo build

---

## ♿ Tillgänglighet (Accessibility)

- Semantisk HTML-struktur
- Korrekt användning av `alt`-attribut
- `aria-label` där det behövs
- Tangentbordsnavigering
- Tydliga fokusmarkeringar
- God färgkontrast

Projektet har testats med Lighthouse för att säkerställa hög tillgänglighetsnivå.

---

## 🔎 SEO-grunder

- Metadata via Next.js `metadata`
- Statisk sidgenerering
- Semantisk rubrikstruktur (H1–H3)
- Optimerade bilder via `next/image`

---

## 🚀 Lighthouse-resultat

Projektet har testats med Lighthouse (Desktop och Mobil).

Resultaten visar mycket hög prestanda och kvalitet inom:

- Performance
- Accessibility
- Best Practices
- SEO

Skärmbilder finns sparade i:

`docs/lighthouse/`

---

## 🧭 Arbetsprocess

Projektet har genomförts i följande steg:

1. **Figma – Wireframes och UI-design**
   - Struktur, navigation och användarflöde
   - Färger, typografi och komponentdesign
   - Klickbar prototyp

2. **Next.js – Projektuppsättning**
   - Grundlayout (Header + Footer)
   - Routing för alla sidor
   - SCSS-struktur och UI-kit

3. **Implementation**
   - Återanvändbara komponenter (Card, Button, FormField m.m.)
   - Responsiv layout
   - Formulär med frontend-validering

4. **Polish & kvalitetssäkring**
   - Spacing och typografi
   - Hover states
   - Tillgänglighet
   - Lighthouse-testning
   - Dokumentation

---

## 🗓 Tidslinje (Jan → nu)

- **Vecka 1:** Research, inspirationssökning och wireframes i Figma  
- **Vecka 2:** UI-design och färdig prototyp  
- **Vecka 3:** Next.js-uppsättning och layoutstruktur  
- **Vecka 4:** Implementation av alla sidor  
- **Vecka 5:** UI-polish, tillgänglighet, dokumentation och Lighthouse-optimering  

---

## 📷 Bildkrediter

Alla bilbilder används endast i utbildningssyfte.

Detaljerad information om upphovsrätt och källor finns i:

`IMAGE_CREDITS.md`

Krediter är huvudsakligen hämtade från Wikimedia Commons.

---

## 🤖 Verktyg & stöd

ChatGPT har använts som stödverktyg för:

- Problemlösning och felsökning
- Strukturering av kod
- Dokumentation och formulering

All implementation och designbeslut har genomförts och anpassats manuellt inom projektets ramar.

---

## 🚀 Kom igång

Installera beroenden:

```bash
npm install
