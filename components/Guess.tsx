/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import usePlaySessionStore, {
  UI_WAITING_TIME,
} from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";
import { colours, spacings } from "../styles/theme";
import { blink, horizontalRock, shake, pulse } from "../styles/animations";

type GuessTextWrapperProps = {
  isShaking: boolean;
  isPulsing: boolean;
};
const GuessTextWrapper = styled("div")<GuessTextWrapperProps>((props) => ({
  animation: props.isShaking
    ? `${shake} ${UI_WAITING_TIME}ms ease`
    : props.isPulsing
    ? `${pulse} ${UI_WAITING_TIME}ms ease`
    : "",
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
  animation: `${horizontalRock} 100ms ease`,
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
  const activeError = usePlaySessionStore((state) => state.activeError);
  const activeSuccess = usePlaySessionStore((state) => state.activeSuccess);
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
    <GuessTextWrapper isShaking={activeError} isPulsing={activeSuccess}>
      {/* key is vital for rerendering so that the animation can play everytime the guess is changed */}
      <GuessText size="xl" key={currentGuess}>
        {formattedGuess}
        <BlinkingCaretCursor></BlinkingCaretCursor>
      </GuessText>
    </GuessTextWrapper>
  );
};

export default Guess;
