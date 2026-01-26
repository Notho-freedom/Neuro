import React from "react"
import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const _rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notilus Browser - Le Navigateur des Developpeurs",
  description:
    "Navigateur futuriste concu par et pour les developpeurs. Design gaming/sci-fi avec des fonctionnalites professionnelles avancees.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#09080D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${_orbitron.variable} ${_rajdhani.variable} font-sans antialiased`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
