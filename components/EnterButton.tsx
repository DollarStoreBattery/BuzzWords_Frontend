import { useEffect } from "react";
import { SolutionAndScore } from "../lib/gameTypes";
import { handleGuessSubmit } from "../lib/handleGuessSubmit";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import GameButton from "./basic/GameButton";

type EnterButtonProps = {
  solutionsWithScores: SolutionAndScore;
  centralLetter: string;
  puzzleLetters: Array<string>;
};

const EnterButton = ({
  solutionsWithScores,
  centralLetter,
  puzzleLetters,
}: EnterButtonProps) => {
  const addtoGuess = usePlaySessionStore((state) => state.addToGuess);
  const backspaceGuess = usePlaySessionStore((state) => state.backspaceGuess);
  const badGuessActive = usePlaySessionStore((state) => state.activeError);
  const successActive = usePlaySessionStore((state) => state.activeSuccess);

  useEffect(() => {
    const keyboardInputHandler = (event: KeyboardEvent): void => {
      const key = event.key;
      // dissallow inputs while an error/success is showing
      if (
        !badGuessActive &&
        !successActive &&
        puzzleLetters.includes(key.toUpperCase())
      ) {
        addtoGuess(key.toUpperCase());
      } else if (key == "Enter") {
        handleGuessSubmit(centralLetter, solutionsWithScores);
      } else if (key == "Backspace") {
        backspaceGuess();
      }
    };

    window.addEventListener("keydown", keyboardInputHandler);
    return () => {
      window.removeEventListener("keydown", keyboardInputHandler);
    };
  }, [badGuessActive, successActive]);

  return (
    <GameButton
      onClick={(e) => handleGuessSubmit(centralLetter, solutionsWithScores)}
    >
      Enter
    </GameButton>
  );
};

export default EnterButton;
