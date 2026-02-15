import type { Metadata } from "next";
import "./globals.scss";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

/*
  Metadata is defined at layout level so all pages inherit
  a consistent title and description.
  This is good for SEO and structure in Next.js.
*/
export const metadata: Metadata = {
  title: {
    default: "Bil4You",
    template: "%s | Bil4You",
    // Allows individual pages to set their own title later
    // Example: "Köp bilar | Bil4You"
  },
  description: "Bil4You – modern bilförsäljning online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      {/*
        lang="sv" because the site content is in Swedish.
        Important for accessibility and SEO.
      */}
      <body>
        {/* Global header visible on all pages */}
        <Header />

        {/* Main page content will be injected here */}
        <main className="siteMain">{children}</main>

        {/* Global footer visible on all pages */}
        <Footer />
      </body>
    </html>
  );
}
