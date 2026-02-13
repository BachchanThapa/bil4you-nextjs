import "./globals.scss";
import Link from "next/link";
import Container from "@/components/Container";

export const metadata = {
  title: "Bil4You",
  description: "Buy and sell used cars in Sweden",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <header className="siteHeader">
          <Container>
            <div className="siteHeaderInner">
              <Link className="logo" href="/">
                Bil4You
              </Link>

              <nav className="nav">
                <Link href="/">Hem</Link>
                <Link href="/kop-bilar">Köp bilar</Link>
                <Link href="/salj-bil">Sälj bil</Link>
                <Link href="/kontakt">Kontakt</Link>
              </nav>
            </div>
          </Container>
        </header>

        <main className="siteMain">
          <Container>{children}</Container>
        </main>

        <footer className="siteFooter">
          <Container>
            <div className="siteFooterInner">Kontakt | Adress | Öppettider</div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
