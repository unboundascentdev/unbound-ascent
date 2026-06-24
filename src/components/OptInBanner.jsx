import Link from "next/link";

export default function OptInBanner() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 101,
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      textAlign: "center",
      padding: "12px 20px",
      fontSize: "14px",
    }}>
      <span>Your brain never fully leaves the business. </span>
      <Link
        href="/free"
        style={{
          color: "#c9a84c",
          fontWeight: "bold",
          textDecoration: "underline",
          marginLeft: "8px",
        }}
      >
        Get the free checklist
      </Link>
    </div>
  );
}
