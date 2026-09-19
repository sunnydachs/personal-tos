import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-tos.sunnydachs.workers.dev"),
  title: "Terms & Conditions of Being Me (Personal ToS Generator)",
  description: "Generate a shareable, suspiciously official set of terms for being you.",
  openGraph: {
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
    type: "website",
    images: [
      {
        url: "/card/default.png",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions of Being Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
    images: ["/card/default.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
