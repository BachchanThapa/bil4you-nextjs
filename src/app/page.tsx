import Container from "@/components/Container";

export default function HomePage() {
  return (
    <main>
      <Container>
        {/* HERO (Step A) */}
        <section
          style={{
            textAlign: "center",
            padding: "96px 0",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-text)" }}>
            Hitta din nästa bil
          </h1>

          <p style={{ marginTop: "12px", color: "var(--color-text-muted)" }}>
            Sök bland begagnade bilar i Sverige
          </p>

          <button
            style={{
              marginTop: "20px",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              height: "44px",
              padding: "0 28px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sök bil
          </button>

          {/* Search input box under the button */}
          <div style={{ marginTop: "18px", display: "flex", justifyContent: "center" }}>
            <input
              type="text"
              placeholder=""
              style={{
                width: "520px",
                maxWidth: "100%",
                height: "44px",
                borderRadius: "10px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                padding: "0 14px",
                outline: "none",
              }}
            />
          </div>
        </section>
      </Container>
    </main>
  );
}
