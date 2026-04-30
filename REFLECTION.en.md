🇸🇪 Svensk version finns här: [REFLECTION på svenska](REFLECTION.md)

# Bil4You LIA 2 Reflections

---

## Ticket #28 – Authentication System Reflection

### What I learned
1. How Supabase Auth can replace localStorage-based authentication with real backend sessions.
2. How to create login and registration flows using `signInWithPassword()` and `signUp()`.
3. How to protect sensitive routes in Next.js by checking active session before page access.
4. How to dynamically update navbar UI depending on authentication state.
5. How password reset flows work through Supabase recovery emails and custom reset pages.
6. How to validate passwords on the frontend before account creation.
7. How to provide clear UX feedback through success/error messages during auth actions.

### Why This Matters
This authentication system makes Bil4You more production-ready by allowing secure user accounts and protected user actions.

---

## Ticket #40 – Save Car Listings to Database

### What I Learned
1. How to design relational database tables for connected data (`cars` and `car_images`).
2. How to upload image files to Supabase Storage before saving database records.
3. How to store uploaded image URLs separately in a related image table.
4. How to connect one car listing with multiple images using foreign keys.
5. How to insert database rows step-by-step while preserving relationships between tables.
6. How to fetch joined relational data from Supabase using nested `.select()` queries.
7. How Next.js image optimization requires external Supabase image domains to be whitelisted in `next.config.ts`.

### Why This Is Important
This database integration transformed Bil4You from a static frontend prototype into a dynamic fullstack application where real user-created car listings can be stored and displayed.
