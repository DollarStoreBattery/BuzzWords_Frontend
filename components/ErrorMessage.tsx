import styled from "@emotion/styled";
import usePlaySessionStore, {
  UI_WAITING_TIME,
} from "../lib/usePlaySessionStore";
import { horizontalRock } from "../styles/animations";
import TextElement from "./basic/TextElement";

const ErrorElement = styled(TextElement)({
  animation: `${horizontalRock}  ${UI_WAITING_TIME}ms ease`,
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
