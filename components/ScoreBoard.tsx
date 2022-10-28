import styled from "@emotion/styled";
import { RankingScheme } from "../lib/gameTypes";
import getRankingBounds from "../lib/getRankingBounds";
import useHydration from "../lib/useHydration";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";
import TextElement from "./basic/TextElement";

const ScoreCardContainer = styled("div")({
  marginTop: 10,
  marginBottom: 20,
  display: "grid",
  width: "100%",
  maxWidth: "700px",
  gridTemplateColumns: "repeat(auto-fit, minmax(60px,1fr))",
  justifyContent: "space-evenly",
});

const ScoreCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  alignContent: "center",
  margin: "0 5px",
  backgroundColor: colours["Soft White"],
  boxShadow: `0 3px 5px ${colours["Dark Sienna"]}`,
  fontSize: 30,
  color: colours["Dark Sienna"],
  height: 50,
  borderRadius: 5,
});

const ScoreLabel = styled(TextElement)({
  // this stops the font from blowing up on small fones with larger enabled fonts
  textSizeAdjust: "none",
  fontFamily: "Oxygen",
  "@media (max-width: 400px)": {
    fontSize: ".35em",
  },
});

const ScoreValue = styled(TextElement)({
  textSizeAdjust: "none",
  "@media (max-width: 400px)": {
    fontSize: ".52em",
  },
});

const CardElement = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <ScoreCard>
      <ScoreLabel size="xs" unPadded={true} textColour={"Kobe"}>
        {label}
      </ScoreLabel>
      <ScoreValue size="md" unPadded={true} fontFamily="Decorative">
        {value}
      </ScoreValue>
    </ScoreCard>
  );
};

const ScoreBoard = ({ rankingScheme }: { rankingScheme: RankingScheme }) => {
  const score = usePlaySessionStore((state) => state.score);
  const { currentRank, pointsToNextRank } = getRankingBounds(
    score,
    rankingScheme
  );

  const hasHydrated = useHydration();

  if (!hasHydrated) {
    return (
      <ScoreCardContainer>
        <CardElement label="Score" value=""></CardElement>
        <CardElement label="Rank" value=""></CardElement>
        <CardElement label="Pts to next Rank" value=""></CardElement>
      </ScoreCardContainer>
    );
  } else
    return (
      <ScoreCardContainer>
        <CardElement label="Score" value={score}></CardElement>
        <CardElement label="Rank" value={currentRank}></CardElement>
        {pointsToNextRank ? (
          <CardElement
            label="Pts to next Rank"
            value={pointsToNextRank}
          ></CardElement>
        ) : (
          <></>
        )}
      </ScoreCardContainer>
    );
};

export default ScoreBoard;
