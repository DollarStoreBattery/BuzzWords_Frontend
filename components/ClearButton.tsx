import usePlaySessionStore from "../lib/usePlaySessionStore";

const ClearButton = () => {
  const clearGuess = usePlaySessionStore((state) => state.clearGuess);
  return <button onClick={clearGuess}>Clear</button>;
};

export default ClearButton;
