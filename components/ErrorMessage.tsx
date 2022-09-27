import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const pulse = keyframes`
0% {transform: translateX(3%);}
100% {transform:translateX(0%) }
`;

const ErrorElement = styled(TextElement)({
  animation: `${pulse} 1100ms ease`,
});

const ErrorMessage = () => {
  const currentError = usePlaySessionStore((state) => state.badGuessReason);
  const badGuessActive = usePlaySessionStore((state) => state.activeError);

  const errorMsg = badGuessActive ? (
    <ErrorElement size="sm">{currentError}</ErrorElement>
  ) : (
    <></>
  );
  return errorMsg;
};

export default ErrorMessage;
