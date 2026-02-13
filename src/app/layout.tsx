import "./globals.scss";

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
        {children}
      </body>
    </html>
  );
}
