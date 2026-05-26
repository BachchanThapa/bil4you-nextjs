🇸🇪 Swedish version available here: [README in Swedish](README.LIA2.md)

# Bil4You – LIA 2 Internship Project

Bil4You is a modern and responsive car marketplace platform built with **Next.js**, **TypeScript**, **SCSS Modules**, and **Supabase**.

During LIA 2, the project was developed from a static design-based website into a more dynamic web application with authentication, database integration, car listings, image handling, contact flows, user pages, and admin functionality.

The goal of LIA 2 was to create a more realistic web application where users can register, log in, create car listings, view cars from a database, and where administrators can manage and monitor important parts of the system.

---

## 📌 Project Overview

During LIA 2, Bil4You was further developed with a stronger focus on dynamic data, user flows, and backend integration through Supabase.

The website includes:

- **Home page** with improved car presentation
- **Buy Cars** page with cars loaded from Supabase
- **Car Detail Page** with dynamic data and image gallery
- **Sell Car** page where logged-in users can create car listings
- **Contact** page with contact form and car interest flow
- **My Page** for logged-in users
- **My Listings** for the seller’s own car ads
- **My Favorites** with user-specific favorite logic
- **Admin Panel** with statistics, users, and messages

The project was developed step-by-step using feature branches, GitHub Projects, reflections, and continuous testing.

---

## 🛠 Tech Stack

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
- Git and GitHub
- Vercel deployment

---

## 🎯 Features

- User registration and login with Supabase Auth
- Role-based handling for users and admins
- Protected routes for private pages
- Dynamic car listings from Supabase
- Car images stored in Supabase Storage
- Users can create their own car listings
- Dynamic car detail page with image gallery
- Contact form connected to car interest flow
- Favorite system connected to the logged-in user
- Admin dashboard with overview and statistics
- Admin view for users
- Admin view for messages
- Archive and delete functionality for admin messages
- Responsive layout for desktop, tablet, and mobile

---

## 🔐 Authentication and Roles

Authentication is handled with **Supabase Auth**.

The project supports two main user types:

- **User** – can log in, create car listings, view their own listings, and save favorites
- **Admin** – can access the admin panel and view statistics, users, and messages

User roles are stored in the `profiles` table in Supabase.  
A database function and trigger are used to automatically create a profile when a new user registers.

This makes the project more realistic because user handling is no longer based only on local frontend logic, but on real backend data.

---

## 🗄 Database and Supabase

Supabase is used as the backend solution for the project.

Important database tables:

- `profiles` – stores user profiles and roles
- `cars` – stores car listings
- `car_images` – stores image URLs and display order
- `messages` – stores contact messages and car interest requests

Supabase Storage is used for storing car images.  
Each car can have multiple images, and the images are displayed in the correct order using `sort_order`.

This allows the project to work more like a real car marketplace where data is saved, fetched, and displayed dynamically.

---

## 👤 User Flow

A regular user can:

1. Register an account
2. Log in
3. Create a car listing
4. Upload car images
5. See the car on the Buy Cars page
6. Open the car detail page
7. View their own listings on My Listings
8. Save cars as favorites
9. Send interest through the contact form

This creates a complete user flow from registration to a published car listing.

---

## 🛡 Admin Features

The admin panel provides a better overview and management of the system.

The admin can view:

- Total number of cars
- Total number of users
- Number of private seller listings
- Latest users
- Messages from the contact form

The admin can also manage messages by:

- Reading messages
- Archiving messages
- Deleting messages

The admin panel is protected so that only users with the `admin` role can access it.

---

## ♿ Accessibility and Quality

The project continues to focus on accessibility and usability.

Examples of accessibility work:

- Semantic HTML
- Clear buttons and links
- `alt` text for images
- Responsive layout
- Clear form fields
- Readable error messages
- Clear navigation structure

Lighthouse has been used as a support tool to check quality, accessibility, SEO, and best practices.

---

## 🔎 SEO and Performance

The project uses Next.js features for better structure and performance.

Examples:

- Metadata through Next.js
- Optimized images with `next/image`
- Semantic heading structure
- Responsive images
- Production-ready build
- Deployment through Vercel

The goal has been to maintain a good user experience even as the project became more dynamic.

---

## 🧭 Development Process

The work during LIA 2 was completed step-by-step with clear version control.

The process included:

1. **Planning and Backlog**
   - GitHub Projects
   - Tickets and feature branches
   - Feature prioritization

2. **Supabase Integration**
   - Auth
   - Database
   - Storage
   - Roles and profiles

3. **Dynamic Pages**
   - Buy Cars from database
   - Car detail page
   - Sell Car form
   - My Listings
   - Contact flow

4. **Admin Panel**
   - Statistics
   - User overview
   - Message handling

5. **Polish and Quality**
   - UI improvements
   - Bug fixes
   - Lighthouse testing
   - Documentation
   - Reflections

---

## 🗓 LIA 2 Timeline

- **Week 1:** Planning, project structure, and Supabase preparation
- **Week 2:** Authentication, registration, and login
- **Week 3:** Database structure for cars, profiles, and images
- **Week 4:** Dynamic Buy Cars page and car detail page
- **Week 5:** Sell Car flow, car images, and user pages
- **Week 6:** Favorites, contact flow, and protected routes
- **Week 7:** Admin panel, statistics, and messages
- **Week 8:** Bug fixes, UI polish, documentation, and presentation

---

## 📷 Image Handling

During LIA 2, the project moved from mainly static images in the project folder to more dynamic image handling through Supabase Storage.

Car images are uploaded, stored, and connected to the correct car listing through the database.

This means new cars can be added without hardcoding images inside the project’s `public` folder.

All images are used for educational purposes only.

---

## 🤖 Tools & Support

ChatGPT was used as a support tool for:

- Problem-solving
- Debugging
- Code structure
- Documentation
- Reflections
- Explaining technical concepts

All code was tested, adapted, and integrated manually into the project.  
Decisions regarding structure, features, and implementation were made based on the project requirements and the goals of the LIA plan.

---

## 🤖 Local AI with Ollama

Bil4You also includes an AI assistant powered by **Ollama** running locally.

The AI assistant can:

- Answer in both Swedish and English
- Help users find cars
- Display real car listings from the database
- Generate dynamic links to car listings

The frontend and all other core functionality work online through Next.js, Supabase, and Vercel.

However, the AI functionality itself requires **Ollama to run locally** on the computer, since the model is not hosted online.

This decision was made to:
- Learn how local AI systems work
- Avoid external API costs
- Experiment with AI integration in a real web application

If Ollama is not running, the application displays a clear fallback message instead of crashing.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
