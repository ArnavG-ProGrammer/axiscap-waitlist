import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axiscap-waitlist.vercel.app"),
  title: "AXISCAP — The Institutional Research Terminal",
  description:
    "Join the waitlist for the next-generation financial terminal. Built for quants, traders, and analysts.",
  openGraph: {
    title: "AXISCAP — The Institutional Research Terminal",
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
    description: "The Institutional Research Terminal. Join the waitlist.",
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
      className={`${ibmPlexMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#00d4a0" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
