import type { Metadata } from "next";
import SubstituteTool from "./SubstituteTool";

export const metadata: Metadata = {
  title: "Take The Blame For Me Gacha",
  description: "Summon a deterministic daily substitute and share the blame card.",
  openGraph: {
    title: "Take The Blame For Me Gacha",
    description: "A deterministic daily substitute card.",
    images: [{ url: "/substitute/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Take The Blame For Me Gacha",
    description: "A deterministic daily substitute card.",
    images: ["/substitute/opengraph-image.png"],
  },
};

export default function SubstitutePage() {
  return <SubstituteTool />;
}
