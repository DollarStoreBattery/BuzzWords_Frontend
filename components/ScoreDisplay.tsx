import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const ScoreDisplay = () => {
  const score = usePlaySessionStore((state) => state.score);
  return <TextElement>{`Score: ${score}`}</TextElement>;
};

export default ScoreDisplay;
