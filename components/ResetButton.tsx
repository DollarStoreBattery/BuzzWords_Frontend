import usePlaySessionStore from "../lib/usePlaySessionStore";

const ResetButton = () => {
  const clearGuess = usePlaySessionStore((state) => state.clearGuess);
  return <button onClick={clearGuess}>Reset Button</button>;
};

export default ResetButton;
