import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FreePage() {
  return (
    <>
      <Navbar />
      <div style={{
        maxWidth: "600px",
        margin: "140px auto 80px",
        padding: "0 20px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>
          The Real Reason You Can't Leave Work at Work.
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
          You've tried the shutdown rituals. You've set the boundaries. It still follows you home. This guide explains why.
        </p>

        <div style={{ height: "463px" }}>
          <iframe
            src="https://link.unboundascent.com/widget/form/m3mYOhLvdPcLRRkca3N9"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
            id="inline-m3mYOhLvdPcLRRkca3N9"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Registration"
            data-height="463"
            data-layout-iframe-id="inline-m3mYOhLvdPcLRRkca3N9"
            data-form-id="m3mYOhLvdPcLRRkca3N9"
            title="Registration"
          />
        </div>
      </div>
      <Footer />
      <Script src="https://link.unboundascent.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
