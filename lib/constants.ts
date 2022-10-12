import { ScoreRankings } from "./gameTypes";

export const gameName = "Spelling Bee Game";

export type Position = { top: number; midpoint: number };

export const rankAndEmojis: { [key in ScoreRankings]: string } = {
  Beginner: "😴",
  "Good Start": "😐",
  "Moving Up": "🙂",
  Good: "😃",
  Solid: "😚",
  Nice: "😎",
  Great: "🤩",
  Amazing: "🔥",
  Genius: "🧠",
  "Queen Bee": "🐝",
};
