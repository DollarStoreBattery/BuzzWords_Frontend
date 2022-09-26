/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const GuessText = styled(TextElement)({
  fontSize: "4rem",
  // todo: add media queries for font size
  //   todo: get the text to animate when cleared, erased, appended, etc. below is not working
  transition: ".1s linear",
  height: "auto",
  minHeight: "50px",
  maxWidth: "100%",
});

const Guess = () => {
  const currentGuess = usePlaySessionStore((state) => state.currentGuess);
  return <GuessText size="xl">{currentGuess.toUpperCase()}</GuessText>;
};

export default Guess;
