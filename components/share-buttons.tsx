"use client";

import { XIcon, LineIcon, ShareIcon } from "@/components/share-icons";

type ShareButtonsProps = {
  url: string;
  text: string;
  labels: { shareX: string; shareLine: string; shareNative: string };
  className?: string;
};

export function ShareButtons({ url, text, labels, className = "" }: ShareButtonsProps) {
  const absoluteUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
  const shareText = `${text}\n${absoluteUrl}`;

  function openX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function openLine() {
    window.open(
      `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function nativeShare() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: text, text: shareText, url: absoluteUrl });
        return;
      } catch {
        // user cancelled — no-op
      }
    }
    openX();
  }

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className={`share-buttons ${className}`.trim()}>
      <button className="share-button share-x" type="button" onClick={openX} aria-label={labels.shareX}>
        <XIcon />
        <span>X</span>
      </button>
      <button className="share-button share-line" type="button" onClick={openLine} aria-label={labels.shareLine}>
        <LineIcon />
        <span>LINE</span>
      </button>
      {canNativeShare && (
        <button className="share-button share-native" type="button" onClick={nativeShare} aria-label={labels.shareNative}>
          <ShareIcon />
          <span aria-hidden="true">{labels.shareNative}</span>
        </button>
      )}
    </div>
  );
}
