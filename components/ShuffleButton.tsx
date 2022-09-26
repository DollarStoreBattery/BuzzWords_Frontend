import usePlaySessionStore from "../lib/usePlaySessionStore";

const ShuffleButton = () => {
  const shuffleBoundaryLetters = usePlaySessionStore(
    (state) => state.shuffleBoundaryLetters
  );
  return <button onClick={shuffleBoundaryLetters}>Shuffle Button</button>;
};

export default ShuffleButton;
