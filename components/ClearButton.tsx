import usePlaySessionStore from "../lib/usePlaySessionStore";
import GameButton from "./basic/GameButton";

const ClearButton = () => {
  const clearGuess = usePlaySessionStore((state) => state.clearGuess);
  return (
    <GameButton
      name="Clear Guess"
      aria-label="Clear Guess"
      onClick={clearGuess}
    >
      Clear
    </GameButton>
  );
};

export default ClearButton;
