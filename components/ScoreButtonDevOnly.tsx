import usePlaySessionStore from "../lib/usePlaySessionStore";

const ScoreButtonDevOnly = () => {
  const setScore = usePlaySessionStore((state) => state.setScoreDevOnly);

  return (
    <input
      type="number"
      name="message"
      onChange={(e) => setScore(parseInt(e.target.value))}
    />
  );
};

export default ScoreButtonDevOnly;
