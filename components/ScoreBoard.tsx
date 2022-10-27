import styled from "@emotion/styled";
import { RankingScheme } from "../lib/gameTypes";
import getRankingBounds from "../lib/getRankingBounds";
import useHydration from "../lib/useHydration";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";
import TextElement from "./basic/TextElement";

const ScoreCardContainer = styled("div")({
  marginBlock: "10px 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(60px,1fr))",
  width: "100%",
  maxWidth: "700px",
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
  fontFamily: "Oxygen",
  "@media (max-width: 380px)": {
    // fontSize: "1.05rem",
    fontSize: "10.5px",
  },
});

const ScoreValue = styled(TextElement)({
  "@media (max-width: 380px)": {
    // fontSize: "1.5rem",
    fontSize: "15px",
  },
});

const CardElement = (label: string, value: string | number) => {
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
        {CardElement("Score", "")}
        {CardElement("Rank", "")}
        {CardElement("Pts to next Rank", "")}
      </ScoreCardContainer>
    );
  } else
    return (
      <ScoreCardContainer>
        {CardElement("Score", score)}
        {CardElement("Rank", currentRank)}
        {pointsToNextRank ? (
          CardElement("Pts to next Rank", pointsToNextRank)
        ) : (
          <></>
        )}
      </ScoreCardContainer>
    );
};

export default ScoreBoard;
