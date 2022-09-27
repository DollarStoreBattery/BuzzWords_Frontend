import { useEffect } from "react";
import { SolutionAndScore } from "../lib/gameTypes";
import usePlaySessionStore, {
  BadGuessReasons,
} from "../lib/usePlaySessionStore";

const MIN_GUESS_LENGTH = 4;
const MAX_GUESS_LENGTH = 20;

// needs access to the store to update the error
export const handleGuessSubmit = (
  centralLetter: string,
  solutionsWithScores: SolutionAndScore
) => {
  const guess = usePlaySessionStore.getState().currentGuess;
  const wordsFound = usePlaySessionStore.getState().wordsFound;

  let badGuess = undefined;
  if (guess.length < MIN_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_SHORT;
  } else if (guess.length > MAX_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_LONG;
  } else if (!guess.includes(centralLetter)) {
    badGuess = BadGuessReasons.MISSING_CENTRE;
  } else if (wordsFound.includes(guess)) {
    badGuess = BadGuessReasons.ALREADY_FOUND;
  } else if (!Object.keys(solutionsWithScores).includes(guess)) {
    badGuess = BadGuessReasons.NOT_IN_WORD_LIST;
  }
  if (badGuess) {
    usePlaySessionStore.getState().setBadGuessReason(badGuess);
  } else {
    usePlaySessionStore.getState().submitGuess(solutionsWithScores[guess]);
  }
};

type EnterButtonProps = {
  solutionsWithScores: SolutionAndScore;
  centralLetter: string;
  puzzleLetters: Array<string>;
};

// it is dependent on current guess state because it's only enabled once the current guess is at least 4 letters
const EnterButton = ({
  solutionsWithScores,
  centralLetter,
  puzzleLetters,
}: EnterButtonProps) => {
  const addtoGuess = usePlaySessionStore((state) => state.addToGuess);
  const backspaceGuess = usePlaySessionStore((state) => state.backspaceGuess);
  const badGuessActive = usePlaySessionStore((state) => state.activeError);
  const successActive = usePlaySessionStore((state) => state.activeSuccess);

  const keyboardInputHandler = (event: KeyboardEvent): void => {
    const key = event.key;
    // while an error or success is showing dissallow inputs
    if (
      !badGuessActive &&
      !successActive &&
      puzzleLetters.includes(key.toUpperCase())
    ) {
      console.log("success active?: ", successActive);
      addtoGuess(key.toUpperCase());
    } else if (key == "Enter") {
      handleGuessSubmit(centralLetter, solutionsWithScores);
    } else if (key == "Backspace") {
      backspaceGuess();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyboardInputHandler);
    return () => {
      window.removeEventListener("keydown", keyboardInputHandler);
    };
  }, [badGuessActive, successActive]);

  return (
    <button
      onClick={(e) => handleGuessSubmit(centralLetter, solutionsWithScores)}
    >
      Enter
    </button>
  );
};

export default EnterButton;
