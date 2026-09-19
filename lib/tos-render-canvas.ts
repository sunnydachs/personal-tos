import { design } from "./tos-design";
import {
  assembleResultCard,
  assembleResultCardLove,
  type TraitId,
} from "./tos-content";

type CanvasRenderOptions = {
  name: string;
  traitIds: TraitId[];
  tone?: "corporate" | "love";
};

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const lines = wrapText(context, text, maxWidth);
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });
  return lines.length * lineHeight;
}

export async function renderTosCanvas(options: CanvasRenderOptions) {
  const canvas = document.createElement("canvas");
  canvas.width = design.width;
  canvas.height = design.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas API is unavailable.");
  }

  const tone = options.tone ?? "corporate";
  const card = tone === "love"
    ? assembleResultCardLove(options.name, options.traitIds)
    : assembleResultCard(options.name, options.traitIds);
  const accent = tone === "love" ? "#f5a9c0" : design.accent;
  context.fillStyle = design.background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const cardX = design.padding;
  const cardY = design.padding;
  const cardWidth = canvas.width - design.padding * 2;
  const cardHeight = canvas.height - design.padding * 2;
  context.fillStyle = design.card;
  context.beginPath();
  context.roundRect(cardX, cardY, cardWidth, cardHeight, 24);
  context.fill();

  let y = cardY + 72;
  context.fillStyle = accent;
  context.font = `600 ${design.eyebrowSize}px ${design.fontFamily}`;
  context.fillText(
    tone === "love"
      ? "INSTRUCTION MANUAL OF BEING ME"
      : "TERMS & CONDITIONS OF BEING ME",
    cardX + 54,
    y,
  );

  y += 50;
  context.fillStyle = design.ink;
  context.font = `700 ${design.titleSize}px ${design.fontFamily}`;
  y += drawWrappedText(
    context,
    card.name,
    cardX + 54,
    y,
    cardWidth - 108,
    design.titleSize * design.lineHeight,
  );

  y += 34;
  context.fillStyle = design.muted;
  context.font = `${design.eyebrowSize}px ${design.fontFamily}`;
  y += drawWrappedText(
    context,
    "Effective: the day you met me",
    cardX + 54,
    y,
    cardWidth - 108,
    design.eyebrowSize * design.lineHeight,
  );

  y += 34;
  context.strokeStyle = design.line;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(cardX + 54, y);
  context.lineTo(cardX + cardWidth - 54, y);
  context.stroke();

  y += 44;
  context.fillStyle = design.ink;
  context.font = `600 ${design.clauseSize}px ${design.fontFamily}`;
  context.fillText(
    tone === "love"
      ? "Article 3 · What I need from you"
      : "Article 3 · Handling Precautions",
    cardX + 54,
    y,
  );
  y += design.clauseSize * design.lineHeight + 16;

  context.font = `${design.clauseSize - 1}px ${design.fontFamily}`;
  card.clauses.forEach((clause, index) => {
  context.fillStyle = accent;
    context.fillText(`${index + 1}.`, cardX + 54, y);
    y += drawWrappedText(
      context,
      clause,
      cardX + 100,
      y,
      cardWidth - 154,
      design.clauseSize * design.lineHeight,
    );
    y += 22;
  });

  y += 10;
  context.fillStyle = design.ink;
  context.font = `600 ${design.clauseSize}px ${design.fontFamily}`;
  context.fillText(
    tone === "love" ? "Article 6 · Fine print" : "Article 6 · Changes to These Terms",
    cardX + 54,
    y,
  );
  y += design.clauseSize * design.lineHeight + 16;
  context.font = `${design.clauseSize - 1}px ${design.fontFamily}`;
  y += drawWrappedText(
    context,
    card.changesClause,
    cardX + 54,
    y,
    cardWidth - 108,
    design.clauseSize * design.lineHeight,
  );

  const footerY = cardY + cardHeight - 48;
  context.fillStyle = design.muted;
  context.font = `${design.footerSize}px ${design.fontFamily}`;
  context.fillText(
    tone === "love"
      ? `You promised. - ${card.name}`
      : `You agreed to this. - ${card.name}`,
    cardX + 54,
    footerY,
  );

  return canvas;
}
