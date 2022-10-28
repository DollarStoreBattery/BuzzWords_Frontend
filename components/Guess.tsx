import styled from "@emotion/styled";
import usePlaySessionStore, {
  UI_WAITING_TIME,
} from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";
import { colours, spacings } from "../styles/theme";
import {
  blink,
  horizontalRock,
  shake,
  pulseSmaller,
} from "../styles/animations";
import useFitText from "use-fit-text";
import IconButton from "./basic/IconButton";
import { Pangrams, SolutionAndScore } from "../lib/gameTypes";
import FeedbackMessage from "./FeedbackMessage";
import { useCallback, useState } from "react";
import { Position } from "../lib/constants";
import useWindowSize from "../lib/useWindowSize";

type GuessTextWrapperProps = {
  isShaking: boolean;
  isPulsing: boolean;
};
const GuessTextWrapper = styled("div")<GuessTextWrapperProps>((props) => ({
  width: "100%",
  animation: props.isShaking
    ? `${shake} ${UI_WAITING_TIME}ms ease`
    : props.isPulsing
    ? `${pulseSmaller} ${UI_WAITING_TIME}ms ease`
    : "",
  display: "flex",
  justifyContent: "center",
}));

const guessPadding = 10;
const GuessText = styled(TextElement)<{ fontSize: string }>(
  {
    alignItems: "center",
    fontSize: "4rem",
    // 1A corresponds to 10% transparency
    backgroundColor: `${colours["Kobe"]}1A`,
    minHeight: "70px",
    padding: guessPadding,
    margin: guessPadding,
    maxWidth: "70%",
    width: "auto",
    animation: `${horizontalRock} 75ms ease`,
  },
  (props) => ({
    fontSize: props.fontSize,
  })
);

const StyledCentralLetter = styled("span")({
  color: colours["Kobe"],
});

const blinkingCursorThickness = 3;

const BlinkingCaretCursor = styled("span")({
  borderRight: `${blinkingCursorThickness}px solid ${colours["Rust"]}`,
  height: "50px",
  marginLeft: "2px",
  animation: `${blink} 1s cubic-bezier(0.22, 0.61, 0.36, 1) infinite`,
});

const BackSpaceIcon = styled("svg")({
  color: colours.Rust,
  height: 35,
  width: 35,
});

const Guess = ({
  centralLetter,
  pangrams,
  scoringScheme,
}: {
  centralLetter: string;
  pangrams: Pangrams;
  scoringScheme: SolutionAndScore;
}) => {
  const backspaceGuess = usePlaySessionStore((state) => state.backspaceGuess);
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

  // so if the guess text gets too long, this will shrink it to fit into its parent div
  const { fontSize: guessFontSize, ref: guessTextRef } = useFitText({
    maxFontSize: 140,
    resolution: 15,
  });

  const [containerPosition, setContainerPosition] = useState<Position>({
    top: 0,
    midpoint: 0,
  });

  const size = useWindowSize();

  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setContainerPosition({
          top: node.getBoundingClientRect().top,
          midpoint:
            node.getBoundingClientRect().left +
            0.5 * node.getBoundingClientRect().width,
        });
      }
    },
    [size]
  );

  return (
    <>
      <FeedbackMessage
        position={containerPosition}
        pangrams={pangrams}
        scoringScheme={scoringScheme}
      />
      <GuessTextWrapper
        ref={containerRef}
        isShaking={activeError}
        isPulsing={activeSuccess}
      >
        {/* key is vital for rerendering so that the animation can play everytime the guess is changed */}
        <GuessText
          unPadded={true}
          fontFamily="Decorative"
          ref={guessTextRef}
          fontSize={guessFontSize}
          key={currentGuess}
        >
          {formattedGuess}
          <BlinkingCaretCursor />
        </GuessText>
        {currentGuess.length > 0 && (
          <IconButton onClick={backspaceGuess}>
            <BackSpaceIcon
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15a2 2 0 002-2V5a2 2 0 00-2-2m-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12" />
            </BackSpaceIcon>
          </IconButton>
        )}
      </GuessTextWrapper>
    </>
  );
};

export default Guess;
