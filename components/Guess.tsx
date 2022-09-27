/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";
import { colours, spacings } from "../styles/theme";

const pulse = keyframes`
0% {transform: translateX(3%);}
100% {transform:translateX(0%) }
`;

const GuessText = styled(TextElement)({
  // 1A corresponds to 10% transparency
  backgroundColor: `${colours["Kobe"]}1A`,
  // todo: add media queries for font size and minheight
  fontSize: "4rem",
  minHeight: "70px",
  margin: spacings.lg,
  maxWidth: "100%",
  animation: `${pulse} 100ms ease`,
});

const Guess = () => {
  const currentGuess = usePlaySessionStore((state) => state.currentGuess);
  return (
    // key is vital for rerendering so that the animation can play
    <GuessText size="xl" key={currentGuess}>
      {currentGuess.toUpperCase()}
    </GuessText>
  );
};

export default Guess;
