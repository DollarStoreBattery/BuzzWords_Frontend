import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { pulse } from "../styles/animations";
import TextElement from "./basic/TextElement";

const ErrorElement = styled(TextElement)({
  animation: `${pulse} 1100ms ease`,
});

const ErrorMessage = () => {
  const currentError = usePlaySessionStore((state) => state.badGuessReason);
  const showError = usePlaySessionStore((state) => state.activeError);

  const errorMsg = showError ? (
    <ErrorElement size="sm">{currentError}</ErrorElement>
  ) : (
    <></>
  );
  return errorMsg;
};

export default ErrorMessage;
