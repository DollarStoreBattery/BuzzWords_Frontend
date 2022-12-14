import create from "zustand";
import shuffle from "lodash.shuffle";
import { persist } from "zustand/middleware";

export const UI_WAITING_TIME = 900; // in milliseconds
const GUESS_LENGTH_LIMIT = 20; // number of characters before you get yelled at

export enum BadGuessReasons {
  TOO_LONG = "Too long",
  TOO_SHORT = "Too short",
  MISSING_CENTRE = "Missing centre letter",
  ALREADY_FOUND = "Already found",
  NOT_IN_WORD_LIST = "Not in word list",
}

interface PlaySessionState {
  wordsFound: Array<string>;
  score: number;
  currentGuess: string;
  //   the exact sorted version of how the letters get rendered into the honeycomb grid
  boundaryLetters: Array<string>;
  badGuessReason?: BadGuessReasons;
  activeError: boolean;
  activeSuccess: boolean;
  lastGuessedWord: string;
  gameID: string;
}

interface PersistentPlaySessionState {
  yesterdaysWordsFound: Array<string>;
}

interface PlaySessionActions {
  setBoundaryLetters: (letters: Array<string>) => void;
  setBadGuessReason: (reason: BadGuessReasons) => void;
  addToGuess: (newLetter: string) => void;
  clearGuess: () => void;
  submitGuess: (guessScore: number) => void;
  backspaceGuess: () => void;
  shuffleBoundaryLetters: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  nukeWordsDevOnly: () => void;
  setScoreDevOnly: (score: number) => void;
  resetGame: () => void;
  setGameID: (id: string) => void;
  setYesterday: () => void;
}

const initialPlayState: PlaySessionState = {
  activeError: false,
  activeSuccess: false,
  wordsFound: [],
  score: 0,
  currentGuess: "",
  boundaryLetters: [],
  lastGuessedWord: "",
  gameID: "",
};

const usePlaySessionStore = create<
  PlaySessionState & PlaySessionActions & PersistentPlaySessionState
>()(
  persist(
    (set, get) => ({
      ...initialPlayState,
      yesterdaysWordsFound: [],
      setYesterday: () => {
        set((state) => ({ yesterdaysWordsFound: state.wordsFound }));
      },
      setGameID: (id) => {
        set(() => ({ gameID: id }));
      },
      resetGame: () => {
        get().setYesterday();
        set(initialPlayState);
      },
      setScoreDevOnly: (score) => {
        set(() => ({ score: score }));
      },
      nukeWordsDevOnly: () => set({ wordsFound: [], score: 0 }),
      setBadGuessReason: (reason) => {
        set(() => ({ badGuessReason: reason }));
        set(() => ({ activeError: true }));
        setTimeout(get().clearGuess, UI_WAITING_TIME);
        setTimeout(get().clearError, UI_WAITING_TIME);
      },
      clearError: () => {
        set(() => ({ activeError: false }));
      },
      clearSuccess: () => {
        set(() => ({ activeSuccess: false }));
      },
      setBoundaryLetters: (letters) => {
        set(() => ({
          boundaryLetters: letters.map((letter) => letter.toUpperCase()),
        }));
      },
      addToGuess: (newLetter) => {
        if (get().currentGuess.length > GUESS_LENGTH_LIMIT) {
          get().setBadGuessReason(BadGuessReasons.TOO_LONG);
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
          currentGuess: state.currentGuess.slice(
            0,
            state.currentGuess.length - 1
          ),
        }));
      },
      shuffleBoundaryLetters: () => {
        const shuffledLetters = shuffle(get().boundaryLetters);
        set(() => ({ boundaryLetters: shuffledLetters }));
      },
      submitGuess: (guessScore) => {
        set((state) => ({
          activeSuccess: true,
          wordsFound: [...state.wordsFound, get().currentGuess],
          score: state.score + guessScore,
          lastGuessedWord: get().currentGuess,
        }));
        setTimeout(get().clearSuccess, UI_WAITING_TIME);
        setTimeout(get().clearGuess, UI_WAITING_TIME);
      },
    }),
    {
      name: "game-storage", // name of item in the storage (must be unique)
      partialize: (state) => ({
        wordsFound: state.wordsFound,
        score: state.score,
        gameID: state.gameID,
        yesterdaysWordsFound: state.yesterdaysWordsFound,
      }),
    }
  )
);

export default usePlaySessionStore;
