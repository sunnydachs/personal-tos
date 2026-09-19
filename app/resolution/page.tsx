import type { Metadata } from "next";
import ResolutionTool from "./ResolutionTool";

export const metadata: Metadata = {
  title: "Today's Resolution Gacha",
  description: "Roll a deterministic daily resolution card and share it as a PNG.",
  openGraph: {
    title: "Today's Resolution Gacha",
    description: "A deterministic daily resolution card.",
    images: [{ url: "/resolution/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Resolution Gacha",
    description: "A deterministic daily resolution card.",
    images: ["/resolution/opengraph-image.png"],
  },
};

export default function ResolutionPage() {
  return <ResolutionTool />;
}
