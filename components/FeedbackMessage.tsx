import styled from "@emotion/styled";
import { Pangrams, SolutionAndScore } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";

import Message from "./basic/Message";
import TextElement from "./basic/TextElement";

const ErrorMessageContainer = styled(Message)({
  backgroundColor: colours["Rust"],
  color: colours["Antique White"],
  borderRadius: "20px",
});

const PraiseMessageContainer = styled(Message)({
  width: "auto",
  // padding: "0 3rem",
  backgroundColor: "White",
  color: colours["Dark Sienna"],
  display: "flex",
  justifyContent: "space-around",
});

const PraiseMessage = styled(TextElement)({
  padding: "0 5px",
  margin: 0,
});

const getPraiseMessage = (score: number, isPangram: boolean) => {
  let praise = "";
  let scoreString = `+${score}`;
  if (isPangram) {
    praise = `Pangram!`;
  } else if (score >= 7) {
    praise = `Awesome!`;
  } else if (score > 1) {
    praise = `Nice!`;
  } else praise = `Good!`;
  return [
    <PraiseMessage
      size="sm"
      key={praise}
      textColour={isPangram ? "Gamboge" : undefined}
    >
      {praise}
    </PraiseMessage>,
    <PraiseMessage textColour={"Gamboge"} size="sm" key={scoreString}>
      {scoreString}
    </PraiseMessage>,
  ];
};

const FeedbackMessage = ({
  pangrams,
  scoringScheme,
}: {
  pangrams: Pangrams;
  scoringScheme: SolutionAndScore;
}) => {
  const showPraise = usePlaySessionStore((state) => state.activeSuccess);

  const showError = usePlaySessionStore((state) => state.activeError);
  const mostRecentWord = usePlaySessionStore((state) => state.lastGuessedWord);

  const errorMessage = usePlaySessionStore((state) => state.badGuessReason);

  if (showPraise) {
    const score = scoringScheme[mostRecentWord];
    const praiseContents = getPraiseMessage(
      score,
      pangrams.includes(mostRecentWord)
    );

    return (
      <PraiseMessageContainer
        key={`error_${showPraise}`}
        isShowing={showPraise}
      >
        {praiseContents}
      </PraiseMessageContainer>
    );
  } else {
    return (
      <ErrorMessageContainer key={`error_${showError}`} isShowing={showError}>
        {errorMessage}
      </ErrorMessageContainer>
    );
  }
};

export default FeedbackMessage;
