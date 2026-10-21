import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier.example.com"),
  title: {
    default: "ATELIER. - Anillos, Relojes y Correas a medida",
    template: "%s | ATELIER.",
  },
  description: "Anillos, relojes a medida y correas de cuero artesanales. Piezas unicas forjadas a mano en nuestro estudio.",
  openGraph: {
    title: "ATELIER. - Anillos, Relojes y Correas a medida",
    description: "Piezas unicas forjadas a mano.",
    type: "website",
    locale: "es_ES",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body style={{ fontFamily: "var(--font-inter-tight), ui-sans-serif, system-ui" }}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
