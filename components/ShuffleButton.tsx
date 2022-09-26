import usePlaySessionStore from "../lib/usePlaySessionStore";

const ShuffleButton = () => {
  const shuffleBoundaryLetters = usePlaySessionStore(
    (state) => state.shuffleBoundaryLetters
  );
  return <button onClick={shuffleBoundaryLetters}>Shuffle</button>;
};

export default ShuffleButton;
