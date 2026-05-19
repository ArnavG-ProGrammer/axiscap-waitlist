import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axiscap-waitlist.vercel.app"),
  title: "AXISCAP — Institutional Research Terminal",
  description:
    "Join the waitlist for the next-generation financial terminal. Built for quants, traders, and analysts.",
  openGraph: {
    title: "AXISCAP — Institutional Research Terminal",
    description:
      "Join the waitlist for the next-generation financial terminal.",
    url: "https://axiscap-waitlist.vercel.app",
    siteName: "AXISCAP",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXISCAP",
    description: "Institutional Research Terminal. Join the waitlist.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
