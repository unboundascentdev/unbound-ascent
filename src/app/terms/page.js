import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata = {
  title: "Terms of Use | Unbound Ascent",
  description: "Terms governing use of the Unbound Ascent website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Unbound Ascent LLC</p>
          <h1 className={styles.title}>Terms of Use</h1>
          <p className={styles.updated}>Effective September 17, 2026</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Agreement to these terms</h2>
            <p>These Terms of Use govern your access to unboundascent.com and the assessments, content, scheduling tools, communications, and related services made available by Unbound Ascent LLC. By using the website, you agree to these terms and our <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the website.</p>
          </section>

          <section className={styles.section}>
            <h2>Educational and advisory information</h2>
            <p>Website content and assessment results are provided for general educational and business-planning purposes. They are not legal, accounting, tax, financial, medical, or mental-health advice. An assessment result is a directional diagnostic based on the answers supplied and is not a guarantee of business performance or a substitute for advice from an appropriately qualified professional.</p>
          </section>

          <section className={styles.section}>
            <h2>No guaranteed outcomes</h2>
            <p>Business results depend on many factors outside our control, including implementation, market conditions, personnel, finances, and individual decisions. We do not promise or guarantee revenue, profit, growth, time savings, business independence, or any other specific outcome from using the website, completing an assessment, attending an Owner Load Review, or working with Unbound Ascent LLC.</p>
          </section>

          <section className={styles.section}>
            <h2>Acceptable use</h2>
            <p>You agree to use the website only for lawful purposes. You may not interfere with its operation or security, attempt unauthorized access, introduce malicious code, collect information about others without authorization, misuse forms or scheduling tools, or copy, scrape, republish, or commercially exploit website content except as permitted in writing.</p>
          </section>

          <section className={styles.section}>
            <h2>Intellectual property</h2>
            <p>The website, Owner Load Assessment, Business Independence Score framework, Owner Load Profiles, written content, graphics, branding, and other materials are owned by or licensed to Unbound Ascent LLC and are protected by applicable intellectual-property laws. You may use your personal assessment result for your own internal business purposes. No other license is granted.</p>
          </section>

          <section className={styles.section}>
            <h2>Communications</h2>
            <p>When you submit a form, you authorize us to send the requested assessment result and related practical emails. You may unsubscribe from marketing communications at any time using the link provided in an email. Administrative or directly requested communications may still be sent when appropriate.</p>
          </section>

          <section className={styles.section}>
            <h2>Third-party services and links</h2>
            <p>The website may use or link to third-party services, including hosting, analytics, forms, email, and scheduling tools. We are not responsible for third-party websites, availability, security, content, or privacy practices. Your use of a third-party service may be governed by that provider&apos;s terms.</p>
          </section>

          <section className={styles.section}>
            <h2>Disclaimer of warranties</h2>
            <p>To the fullest extent permitted by law, the website and its content are provided &quot;as is&quot; and &quot;as available.&quot; Unbound Ascent LLC disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, title, and noninfringement. We do not warrant that the website will always be available, secure, accurate, or error-free.</p>
          </section>

          <section className={styles.section}>
            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Unbound Ascent LLC and its owners, employees, contractors, and agents will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, data, goodwill, or business opportunities arising from or related to the website or its content.</p>
            <p>To the fullest extent permitted by law, our aggregate liability arising from the website or these terms will not exceed the greater of the amount you paid us specifically for the website service giving rise to the claim during the preceding twelve months or one hundred U.S. dollars.</p>
          </section>

          <section className={styles.section}>
            <h2>Changes and availability</h2>
            <p>We may update, suspend, or discontinue any part of the website and may revise these terms from time to time. Updated terms become effective when posted with a revised effective date. Continued use after an update constitutes acceptance of the revised terms.</p>
          </section>

          <section className={styles.section}>
            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles. Any dispute will be subject to the courts with applicable jurisdiction in Texas, except where applicable law requires otherwise.</p>
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <p>Questions about these terms may be sent to Unbound Ascent LLC at <a href="mailto:chris@unboundascent.com">chris@unboundascent.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
