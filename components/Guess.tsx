/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const pulse = keyframes`
0% {transform: translateX(3%);}
100% {transform:translateX(0%) }
`;

const GuessText = styled(TextElement)({
  fontSize: "4rem",
  // todo: add media queries for font size
  transition: ".1s linear",
  height: "auto",
  minHeight: "50px",
  maxWidth: "100%",
  animation: `${pulse} 100ms ease`,
});

const Guess = () => {
  const currentGuess = usePlaySessionStore((state) => state.currentGuess);
  return (
    <GuessText size="xl" key={currentGuess}>
      {currentGuess.toUpperCase()}
    </GuessText>
  );
};

export default Guess;
