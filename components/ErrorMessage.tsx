import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const ErrorMessage = () => {
  const currentError = usePlaySessionStore((state) => state.badGuessReason);
  return <TextElement size="xl">{currentError}</TextElement>;
};

export default ErrorMessage;
