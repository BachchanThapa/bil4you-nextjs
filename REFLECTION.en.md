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

---

## Ticket #34 – API / Data Integration

### What I Learned
1. How the frontend can fetch real data from Supabase instead of using static arrays.
2. How to connect Next.js pages to the database using Supabase queries.
3. How data from multiple tables can be fetched together, for example cars and car images.
4. How to handle loading states, empty results, and errors when fetching backend data.
5. How the database becomes the central source of content for the website.
6. How changes in Supabase can appear directly in the application without changing code.
7. How data integration makes the project more realistic and closer to a real web application.

### Why This Is Important
The API and data integration means Bil4You no longer only displays hardcoded information, but uses real data from a backend.

---

## Ticket #43 – Dynamic Car Detail Page

### What I Learned
1. How to create a dynamic page in Next.js based on the car `id`.
2. How each car listing can have its own detail page with unique information.
3. How to fetch one specific car from Supabase using `.eq("id", id)` and `.single()`.
4. How to display multiple images from `car_images` on the same detail page.
5. How to handle cases where a car is not found in the database.
6. How dynamic routes make the website more flexible and scalable.
7. How the user experience improves when each car has a clear and informative page.

### Why This Is Important
The dynamic car detail page makes Bil4You work more like a real car sales website where every car has its own presentation.

---

## Ticket #31 – Search & Filtering Improvements

### What I Learned
1. How to build search features that help users find the right car faster.
2. How filters can be used to sort and narrow down car results.
3. How frontend state can control which cars are displayed on the page.
4. How search and filtering improve the user journey on a car sales website.
5. How multiple filters can be combined without breaking the layout.
6. How empty search results should be handled with clear messages.
7. How small UX improvements can make the page much more useful.

### Why This Is Important
Search and filtering make the Köp bilar page more user-friendly and help visitors quickly find cars that match their needs.

---

## Ticket #29 – Favorites System

### What I Learned
1. How users can save interesting cars as favorites.
2. How a favorites system improves comparison and decision-making for the user.
3. How the frontend can update immediately when the user clicks a favorite button.
4. How logged-in users can get more personal features.
5. How favorite status can be shown visually using an icon.
6. How the user’s choices can be saved and fetched from the database.
7. How small interactive features make the website feel more alive.

### Why This Is Important
The favorites system makes Bil4You more user-centered because visitors can mark and return to cars they are interested in.

---

## Ticket #30 – Hero Section Enhancement

### What I Learned
1. How a hero section can be used to create a strong first impression.
2. How heading, image, text, and call-to-action work together to guide the user’s first experience.
3. How design improvements can make the homepage look more professional.
4. How clear buttons can guide users to important pages such as Köp bilar and Sälj bil.
5. How spacing, colors, and typography affect the overall feeling of the page.
6. How the homepage can present Bil4You as a more trustworthy company.
7. How small visual improvements can make a big difference in the presentation.

### Why This Is Important
An improved hero section makes the homepage feel more finished, modern, and clear for new visitors.

---

## Ticket #32 – Admin Panel

### What I Learned
1. How to create a separate admin view to get a better overview of the system.
2. How the admin panel can display statistics from the database, such as number of users, cars, and messages.
3. How to read contact messages submitted through the contact form.
4. How admin features can be protected so normal users cannot access them.
5. How roles in the profiles table can be used to separate admin users from normal users.
6. How Supabase data can be used to create simple dashboard-like functionality.
7. How an admin panel makes the project more realistic and closer to a real business system.

### Why This Is Important
The admin panel shows that Bil4You is not only a customer-facing website, but also has internal functionality for managing and following up information.

---