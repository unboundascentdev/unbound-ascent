import Link from "next/link";

export default function NewsletterSection() {
  return (
    <section style={{
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      padding: "80px 20px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "1.75rem",
          fontWeight: "800",
          marginBottom: "16px",
          lineHeight: "1.3",
          color: "#ffffff",
        }}>
          Not ready to book a call yet? That's fine.
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#cccccc",
          marginBottom: "40px",
          lineHeight: "1.6",
        }}>
          Get the biweekly newsletter. Founders who read it consistently tell me it is the thing that finally named what they were feeling.
        </p>
        <Link
          href="/free"
          style={{
            backgroundColor: "#c9a84c",
            color: "#000000",
            padding: "14px 32px",
            borderRadius: "999px",
            fontWeight: "700",
            fontSize: "1rem",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Join the Newsletter
        </Link>
      </div>
    </section>
  );
}
