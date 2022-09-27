import create from "zustand";
import { ScoreRankings } from "./gameTypes";
import shuffle from "lodash.shuffle";

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
  boundaryLetters: Array<string>;
  setBoundaryLetters: (letters: Array<string>) => void;
  setBadGuessReason: (reason: BadGuessReasons) => void;
  addToGuess: (newLetter: string) => void;
  clearGuess: () => void;
  submitGuess: (guessScore: number) => void;
  backspaceGuess: () => void;
  shuffleBoundaryLetters: () => void;
  badGuessReason?: BadGuessReasons;
}

const GUESS_LENGTH_LIMIT = 20;

const usePlaySessionStore = create<PlaySessionState>()((set, get) => ({
  wordsFound: [],
  score: 0,
  ranking: "BEGINNER",
  currentGuess: "",
  boundaryLetters: [],
  setBadGuessReason: (reason) => {
    set(() => ({ badGuessReason: reason }));
    console.log(reason);
  },
  setBoundaryLetters: (letters) => {
    set(() => ({
      boundaryLetters: letters.map((letter) => letter.toUpperCase()),
    }));
  },
  addToGuess: (newLetter) => {
    if (get().currentGuess.length > GUESS_LENGTH_LIMIT) {
      set(() => ({ currentGuess: "" }));
      set(() => ({ badGuessReason: BadGuessReasons.TOO_LONG }));
    }
    set((state) => ({ currentGuess: state.currentGuess + newLetter }));
  },
  clearGuess: () => {
    set(() => ({ currentGuess: "" }));
  },
  backspaceGuess: () => {
    if (get().currentGuess.length == 0) {
      return;
    }
    set((state) => ({
      currentGuess: state.currentGuess.slice(0, state.currentGuess.length - 1),
    }));
  },
  shuffleBoundaryLetters: () => {
    const shuffledLetters = shuffle(get().boundaryLetters);
    set(() => ({ boundaryLetters: shuffledLetters }));
  },
  submitGuess: (guessScore) => {
    set((state) => ({
      wordsFound: [...state.wordsFound, get().currentGuess],
      score: state.score + guessScore,
    }));
  },
}));

export default usePlaySessionStore;

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
//   }
