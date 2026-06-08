import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Unbound Ascent — Break the Ownership Bottleneck",
  description:
    "If your business depends on you for everything, growth starts to feel heavy. Unbound Ascent helps founders break the ownership bottleneck and regain control.",
  keywords: [
    "business coaching",
    "founder coaching",
    "ownership bottleneck",
    "service-based business",
    "executive coaching",
    "business growth",
    "Chris Bustos",
  ],
  authors: [{ name: "Chris Bustos" }],
  openGraph: {
    title: "Unbound Ascent — Break the Ownership Bottleneck",
    description:
      "Helping founders reduce the invisible load created when the business still depends too heavily on them.",
    url: "https://www.unboundascent.com",
    siteName: "Unbound Ascent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
