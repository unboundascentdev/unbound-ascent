import Link from "next/link";

export default function ThankYouPage() {
  const btnStyle = {
    backgroundColor: "#6b46c1",
    color: "#ffffff",
    padding: "14px 28px",
    borderRadius: "999px",
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "1rem",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "140px auto 80px", padding: "0 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>
        You are in. Check your inbox.
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
        The checklist is on its way. While you wait, take 2 minutes to see exactly where your business still depends on you.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <a href="/assessment" style={btnStyle}>Take the Free Assessment</a>
        <Link href="/" style={{ color: "#555", fontSize: "0.9rem", textDecoration: "underline" }}>
          Take me back to the site
        </Link>
      </div>
    </div>
  );
}
