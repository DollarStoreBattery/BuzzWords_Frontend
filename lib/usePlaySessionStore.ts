import create from "zustand";
import { ScoreRankings } from "./gameTypes";

export enum BadGuessReasons {
  TOO_LONG = "Too long.",
  TOO_SHORT = "Too short.",
  MISSING_CENTRE = "Missing the centre letter.",
  ALREADY_FOUND = "Already found.",
  NOT_IN_WORD_LIST = "Not in word list.",
}

interface PlaySessionState {
  wordsFound: Array<string>;
  score: number;
  ranking: keyof typeof ScoreRankings;
  currentGuess: string;
  //   the exact sorted version of how the letters get rendered into the honeycomb grid
  letterSort: Array<string>;
  addToGuess: (newLetter: string) => void;
  clearGuess: () => void;
  submitGuess: () => void;
  //   backspaceGuess: () => void;
  //   shuffleLetters: () => void;
  badGuessReason?: BadGuessReasons;
}

const GUESS_LENGTH_LIMIT = 20;

const usePlaySessionStore = create<PlaySessionState>()((set, get) => ({
  wordsFound: [],
  score: 0,
  ranking: "BEGINNER",
  currentGuess: "",
  letterSort: [],

  addToGuess: (newLetter) => {
    if (get().currentGuess.length > GUESS_LENGTH_LIMIT) {
      console.error(BadGuessReasons.TOO_LONG);
      set(() => ({ currentGuess: "" }));
      set(() => ({ badGuessReason: BadGuessReasons.TOO_LONG }));
    }
    set((state) => ({ currentGuess: state.currentGuess + newLetter }));
  },
  clearGuess: () => {
    set(() => ({ currentGuess: "" }));
  },

  submitGuess: () => {
    set((state) => ({
      wordsFound: [...state.wordsFound, get().currentGuess],
    }));
  },
}));

interface BearState {
  bears: number;
  addLetter: (aby: string) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  addLetter: (aby) => set((state) => ({ bears: state.bears + aby.length })),
}));

export default usePlaySessionStore;

// const useBearStore = create<PlaySessionState>()((set) => ({
//   date: "",
//   puzzleLetters: [],
//   centralLetter: "",
//   rankingScheme: {
//     Beginner: 0,
//     "Good Start": 0,
//     "Moving Up": 0,
//     Good: 0,
//     Solid: 0,
//     Nice: 0,
//     Great: 0,
//     Amazing: 0,
//     Genius: 0,
//     "Queen Bee": 0,
//   },
//   pangrams: [],
//   solutionsWithScores: {},

//   //   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }));
