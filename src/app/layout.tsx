import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Bil4You",
  description: "Bil4You demo site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <header style={{ height: 72, borderBottom: "1px solid var(--color-border)" }} />
        {children}
        <footer style={{ height: 72, borderTop: "1px solid var(--color-border)" }} />
      </body>
    </html>
  );
}
