import Link from "next/link";

export default function PageUnderDevelop() {
  return (
    <main style={{ padding: "48px 16px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Page under development</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>
        This car detail page is not ready yet. Please check back later.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          ← Back to Home
        </Link>
        <Link href="/kop-bilar" style={{ textDecoration: "underline" }}>
          Browse cars
        </Link>
      </div>
    </main>
  );
}
