import usePlaySessionStore from "../lib/usePlaySessionStore";

const BackSpaceButton = () => {
  const backspaceGuess = usePlaySessionStore((state) => state.backspaceGuess);
  return <button onClick={backspaceGuess}>Backspace</button>;
};

export default BackSpaceButton;
