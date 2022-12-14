import usePlaySessionStore from "../lib/usePlaySessionStore";
import GameButton from "./basic/GameButton";

const BackSpaceButton = () => {
  const backspaceGuess = usePlaySessionStore((state) => state.backspaceGuess);
  return (
    <GameButton name="Backspace" onClick={backspaceGuess}>
      Backspace
    </GameButton>
  );
};

export default BackSpaceButton;
