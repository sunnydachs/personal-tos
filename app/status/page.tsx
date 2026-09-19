import type { Metadata } from "next";
import StatusTool from "./StatusTool";

export const metadata: Metadata = {
  title: "Modern Human Status Screen",
  description: "Render a deterministic modern human status screen and share it as a PNG.",
  openGraph: {
    title: "Modern Human Status Screen",
    description: "A deterministic modern human status screen.",
    images: [{ url: "/status/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Human Status Screen",
    description: "A deterministic modern human status screen.",
    images: ["/status/opengraph-image.png"],
  },
};

export default function StatusPage() {
  return <StatusTool />;
}
