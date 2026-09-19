import { gachaDesign } from "./gacha-design";
import {
  getStatusVerdict,
  resolutionStates,
  substituteCharacters,
} from "./gacha-content";

export type ResolutionCard = {
  name: string;
  date: string;
  state: (typeof resolutionStates)[number];
  shareLine: string;
};

export type SubstituteCard = {
  name: string;
  date: string;
  character: (typeof substituteCharacters)[number];
  defense: number;
  shareLine: string;
};

export type StatusCard = {
  name: string;
  date: string;
  stats: { hp: number; mp: number; motivation: number; limit: number };
  verdict: string;
  shareLine: string;
};

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = gachaDesign.width;
  canvas.height = gachaDesign.height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas API is unavailable.");
  }
  return { canvas, context };
}

function drawCard(context: CanvasRenderingContext2D, label: string) {
  const { width, height, padding } = gachaDesign;
  context.fillStyle = gachaDesign.background;
  context.fillRect(0, 0, width, height);
  context.fillStyle = gachaDesign.card;
  context.beginPath();
  context.roundRect(padding, padding, width - padding * 2, height - padding * 2, 24);
  context.fill();
  context.fillStyle = gachaDesign.accent;
  context.font = `700 ${gachaDesign.eyebrowSize}px ${gachaDesign.fontFamily}`;
  context.fillText(label, padding + 54, padding + 68);
}

function drawFooter(
  context: CanvasRenderingContext2D,
  name: string,
  date: string,
  shareLine: string,
) {
  const { width, padding } = gachaDesign;
  const footerY = padding + gachaDesign.height - padding - 36;
  context.strokeStyle = gachaDesign.line;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(padding + 54, footerY - 26);
  context.lineTo(width - padding - 54, footerY - 26);
  context.stroke();
  context.fillStyle = gachaDesign.muted;
  context.font = `${gachaDesign.smallSize}px ${gachaDesign.fontFamily}`;
  context.fillText(`${name} · ${date}`, padding + 54, footerY);
  context.fillStyle = gachaDesign.ink;
  context.fillText(shareLine, padding + 54, footerY + 30);
}

function drawResolutionCard(card: ResolutionCard) {
  const { canvas, context } = createCanvas();
  drawCard(context, "TODAY'S RESOLUTION GACHA");
  const { padding } = gachaDesign;
  context.fillStyle = gachaDesign.ink;
  context.font = `700 ${gachaDesign.titleSize}px ${gachaDesign.fontFamily}`;
  context.fillText(card.state.label, padding + 54, padding + 150);
  context.fillStyle = gachaDesign.muted;
  context.font = `${gachaDesign.bodySize}px ${gachaDesign.fontFamily}`;
  context.fillText(card.state.description, padding + 54, padding + 205);
  drawFooter(context, card.name, card.date, card.shareLine);
  return canvas;
}

function drawSubstituteIcon(
  context: CanvasRenderingContext2D,
  character: (typeof substituteCharacters)[number],
) {
  const x = 850;
  const y = 165;
  context.fillStyle = "#272727";
  context.beginPath();
  context.roundRect(x - 70, y - 70, 210, 210, 28);
  context.fill();
  context.fillStyle = gachaDesign.accent;
  context.font = `100px ${gachaDesign.fontFamily}`;
  context.textAlign = "center";
  context.fillText(character.symbol, x + 35, y + 34);
  context.textAlign = "start";
}

function drawSubstituteCard(card: SubstituteCard) {
  const { canvas, context } = createCanvas();
  drawCard(context, "TAKE THE BLAME FOR ME GACHA");
  const { padding } = gachaDesign;
  drawSubstituteIcon(context, card.character);
  context.fillStyle = gachaDesign.ink;
  context.font = `700 ${gachaDesign.titleSize - 8}px ${gachaDesign.fontFamily}`;
  context.fillText(card.character.label, padding + 54, padding + 130);
  context.fillStyle = gachaDesign.muted;
  context.font = `${gachaDesign.bodySize}px ${gachaDesign.fontFamily}`;
  context.fillText(card.character.description, padding + 54, padding + 190);
  context.fillStyle = gachaDesign.accent;
  context.font = `700 ${gachaDesign.smallSize}px ${gachaDesign.fontFamily}`;
  context.fillText(`BLAME DEFLECTION RATE · ${card.defense}%`, padding + 54, padding + 250);
  drawFooter(context, card.name, card.date, card.shareLine);
  return canvas;
}

function statusColor(value: number, isInverted = false) {
  if (isInverted) {
    return value > 60 ? "#ff6b6b" : value >= 30 ? "#f3d35c" : "#8fe36a";
  }

  return value > 60 ? "#8fe36a" : value >= 30 ? "#f3d35c" : "#ff6b6b";
}

function drawStatusCard(card: StatusCard) {
  const { canvas, context } = createCanvas();
  drawCard(context, "MODERN HUMAN STATUS SCREEN");
  const { padding } = gachaDesign;
  context.fillStyle = gachaDesign.ink;
  context.font = `700 ${gachaDesign.titleSize - 8}px ${gachaDesign.fontFamily}`;
  context.fillText(card.name, padding + 54, padding + 112);
  const rows = [
    ["HP", card.stats.hp, false],
    ["MP", card.stats.mp, false],
    ["MOT", card.stats.motivation, false],
    ["LIM", card.stats.limit, true],
  ] as const;
  rows.forEach(([label, value, inverted], index) => {
    const y = padding + 165 + index * 67;
    context.fillStyle = gachaDesign.muted;
    context.font = `700 ${gachaDesign.smallSize}px ${gachaDesign.fontFamily}`;
    context.fillText(label, padding + 54, y);
    context.fillStyle = "#2b2b2b";
    context.fillRect(padding + 125, y - 16, 680, 15);
    context.fillStyle = statusColor(value, inverted);
    context.fillRect(padding + 125, y - 16, 680 * (value / 100), 15);
    context.fillStyle = gachaDesign.ink;
    context.fillText(String(value), padding + 835, y);
  });
  context.fillStyle = gachaDesign.muted;
  context.font = `${gachaDesign.bodySize}px ${gachaDesign.fontFamily}`;
  context.fillText(card.verdict, padding + 54, padding + 470);
  drawFooter(context, card.name, card.date, card.shareLine);
  return canvas;
}

export function renderResolutionCanvas(card: ResolutionCard) {
  return drawResolutionCard(card);
}

export function renderSubstituteCanvas(card: SubstituteCard) {
  return drawSubstituteCard(card);
}

export function renderStatusCanvas(card: StatusCard) {
  return drawStatusCard(card);
}
