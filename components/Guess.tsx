/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";
import { colours, spacings } from "../styles/theme";
import { blink, pulse, shake } from "../styles/animations";

type GuessTextWrapperProps = {
  isShaking: boolean;
};
const GuessTextWrapper = styled("div")<GuessTextWrapperProps>((props) => ({
  animation: props.isShaking ? `${shake} 600ms ease` : "",
  display: "flex",
}));

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

const StyledCentralLetter = styled("span")({
  color: colours["Kobe"],
});

const BlinkingCaretCursor = styled("span")({
  borderRight: `3px solid ${colours["Rust"]}`,
  height: "50px",
  marginLeft: "2px",
  animation: `${blink} 1s cubic-bezier(0.22, 0.61, 0.36, 1) infinite`,
});

const Guess = ({ centralLetter }: { centralLetter: string }) => {
  const currentGuess = usePlaySessionStore((state) => state.currentGuess);
  const showError = usePlaySessionStore((state) => state.activeError);
  const formattedGuess = currentGuess
    .toUpperCase()
    .split("")
    .map((character, index) => {
      const keyVal = `guess_${character}_${index}`;
      if (character === centralLetter) {
        return (
          <StyledCentralLetter key={keyVal}>{character}</StyledCentralLetter>
        );
      } else return character;
    });
  return (
    <GuessTextWrapper isShaking={showError}>
      {/* key is vital for rerendering so that the animation can play everytime the guess is changed */}
      <GuessText size="xl" key={currentGuess}>
        {/* {currentGuess.toUpperCase()} */}
        {formattedGuess}
        <BlinkingCaretCursor></BlinkingCaretCursor>
      </GuessText>
    </GuessTextWrapper>
  );
};

export default Guess;
