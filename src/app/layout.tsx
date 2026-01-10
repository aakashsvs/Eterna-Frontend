import type { Metadata } from "next";
import { IBM_Plex_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const geistMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Axiom Trade - Token Discovery",
  description: "Real-time token discovery table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
