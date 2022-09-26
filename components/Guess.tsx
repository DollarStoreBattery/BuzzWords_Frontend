/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const GuessText = styled(TextElement)({
  fontSize: `max(6vw,2.5rem)`,
  // todo: add media queries for font size
  //   todo: get the text to animate when cleared, erased, appended, etc. below is not working
  transition: ".1s linear",
  height: "5vh",
  maxWidth: "100%",
});

const Guess = () => {
  const currentGuess = usePlaySessionStore((state) => state.currentGuess);
  return <GuessText size="xl">{currentGuess.toUpperCase()}</GuessText>;
  //   return (
  //     <svg viewBox="0 0 300 20" css={{ marginBottom: "20px" }}>
  //       <text x="10" y="15">
  //         {currentGuess}
  //       </text>
  //     </svg>
  //   );
};

export default Guess;
