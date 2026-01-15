import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Orbitron, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SeasonProvider } from "@/components/SeasonContext";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { ThreeBackground } from "@/components/ThreeBackground";
import { MenuProvider } from "@/components/MenuContext";
import { LoaderWrapper } from "@/components/LoaderWrapper";
import { AudioPlayer } from "@/components/AudioPlayer";


const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  title: "Rahul Khanke",
  description:
    "Next.js 15 + React 19 portfolio showcasing data science projects, ML models, and AI engineering work.",
  metadataBase: new URL("https://rahulkhanke.dev"),
  openGraph: {
    title: "Rahul Khanke",
    description:
      "Building robust data pipelines, training state-of-the-art ML models, and deploying scalable AI solutions.",
    url: "https://rahulkhanke.dev",
    siteName: "Rahul Khanke Portfolio",
  },
};

import { CustomCursor } from "@/components/CustomCursor";
import { AIChatWidget } from "@/components/AIChatWidget";

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
          <MenuProvider>
            <CustomCursor />
            <LoaderWrapper>
              <Navbar />
              <AnimatedGradient />
              <ThreeBackground />
              <SmoothScroll>
                <div className="film-grain" />
                {children}
              </SmoothScroll>
              <Analytics />
              <SpeedInsights />
              <AudioPlayer />
              <AIChatWidget />
            </LoaderWrapper>
          </MenuProvider>
        </SeasonProvider>
      </body>
    </html>
  );
}
