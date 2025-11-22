import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Bodoni_Moda, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SeasonProvider } from "@/components/SeasonContext";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { ThreeBackground } from "@/components/ThreeBackground";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const stripExtensionAttrs = `
  (function cleanInjectedAttributes() {
    const strip = () => {
      document
        .querySelectorAll('[bis_skin_checked]')
        .forEach((el) => el.removeAttribute('bis_skin_checked'));
    };
    strip();
    const observer = new MutationObserver((mutations) => {
      let shouldStrip = false;
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
          shouldStrip = true;
          break;
        }
        if (mutation.addedNodes?.length) {
          shouldStrip = true;
          break;
        }
      }
      if (shouldStrip) strip();
    });
    observer.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked'],
      childList: true,
    });
  })();
`;

export const metadata = {
  title: "Alexander - Creative Developer",
  description:
    "Next.js 15 + React 19 portfolio showcasing immersive WebGL work, AI copilots, and market-ready delivery workflows.",
  metadataBase: new URL("https://alexander.dev"),
  openGraph: {
    title: "Alexander - Creative Developer",
    description:
      "Immersive experiences with WebGL, AI copilots, and server actions built on an edge-first stack.",
    url: "https://alexander.dev",
    siteName: "Alexander Portfolio",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <head>
        <Script
          id="strip-extension-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${display.variable} ${grotesk.variable} ${geistMono.variable} antialiased`}
      >
        <SeasonProvider>
          <AnimatedGradient />
          <ThreeBackground />
          <SmoothScroll>
            <div className="film-grain" />
            {children}
          </SmoothScroll>
          <Analytics />
          <SpeedInsights />
        </SeasonProvider>
      </body>
    </html>
  );
}
