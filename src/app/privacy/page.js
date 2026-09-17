import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy | Unbound Ascent",
  description: "How Unbound Ascent LLC collects, uses, and protects information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Unbound Ascent LLC</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Effective September 17, 2026</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Overview</h2>
            <p>Unbound Ascent LLC, a Texas limited liability company, respects your privacy. This Privacy Policy describes how we collect, use, disclose, and protect information when you visit unboundascent.com, complete an assessment, join our email list, communicate with us, or schedule a conversation.</p>
          </section>

          <section className={styles.section}>
            <h2>Information we collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li>Contact information, such as your first name and email address.</li>
              <li>Assessment information, including your Business Independence Score, Owner Load Profile, category results, source, and completion date.</li>
              <li>Scheduling information and answers you provide when booking an Owner Load Review.</li>
              <li>Business, professional, and communication information you choose to share with us.</li>
            </ul>
            <h3>Information collected automatically</h3>
            <p>We may collect limited technical and usage information, including pages viewed, referring pages, general location, browser, device type, operating system, campaign parameters, and interactions such as starting or completing the assessment. Our website uses Vercel Web Analytics, which is designed to provide aggregated analytics without using third-party tracking cookies or permanently identifying individual visitors.</p>
          </section>

          <section className={styles.section}>
            <h2>How we use information</h2>
            <ul>
              <li>Calculate, display, and email your assessment result and action plan.</li>
              <li>Respond to inquiries and provide requested scheduling or services.</li>
              <li>Send practical follow-up emails and business communications you requested, subject to your right to unsubscribe.</li>
              <li>Operate, secure, troubleshoot, and improve the website, assessments, communications, and services.</li>
              <li>Understand marketing sources and measure assessment and booking performance.</li>
              <li>Comply with law, enforce our agreements, and protect our rights and users.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>How we disclose information</h2>
            <p>We do not sell personal information. We may disclose information to service providers that help us operate the business, including website hosting and analytics providers, customer relationship and email providers, scheduling providers, and professional advisers. Our current core providers include Vercel and GoHighLevel.</p>
            <p>We may also disclose information when required by law, to protect rights or safety, or in connection with a merger, financing, acquisition, reorganization, or sale of business assets.</p>
          </section>

          <section className={styles.section}>
            <h2>Cookies and embedded services</h2>
            <p>Vercel Web Analytics is designed to operate without third-party cookies. Embedded forms and scheduling tools provided by GoHighLevel may use cookies, local storage, or similar technologies required to operate those tools, prevent abuse, remember session information, and process submissions.</p>
          </section>

          <section className={styles.section}>
            <h2>Your choices and privacy requests</h2>
            <p>You may unsubscribe from marketing emails by using the unsubscribe link in an email. You may also ask to access, correct, or delete information associated with you by contacting us. Depending on applicable law, you may have additional rights, including the right to confirm processing, obtain a copy, correct inaccuracies, delete information, opt out of certain processing, or appeal a decision regarding your request.</p>
            <p>To submit a request or appeal, email <a href="mailto:chris@unboundascent.com">chris@unboundascent.com</a>. We may need to verify your identity before completing a request.</p>
          </section>

          <section className={styles.section}>
            <h2>Retention and security</h2>
            <p>We retain information for as long as reasonably necessary to provide requested services, maintain business records, comply with legal obligations, resolve disputes, and enforce agreements. We use reasonable administrative, technical, and organizational safeguards, but no method of transmission or storage is completely secure.</p>
          </section>

          <section className={styles.section}>
            <h2>Children&apos;s privacy</h2>
            <p>The website and services are intended for business owners and adults. They are not directed to children under 18, and we do not knowingly collect personal information from children.</p>
          </section>

          <section className={styles.section}>
            <h2>Updates and contact</h2>
            <p>We may update this policy as our practices or legal obligations change. The effective date above identifies the current version. Questions or privacy requests may be sent to <a href="mailto:chris@unboundascent.com">chris@unboundascent.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
