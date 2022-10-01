import styled from "@emotion/styled";
import { emojis } from "../lib/dummy";
import { RankingScheme, ScoreRankings } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";

const progressHeight = 4;

const ProgressContainer = styled("div")({
  marginBlock: "35px 20px",
  backgroundColor: "darkgrey",
  width: "90%",
  height: progressHeight,
  borderRadius: "5px",
  display: "grid",
  gridTemplateColumns: "repeat(9, auto)",
  justifyContent: "space-between",
});

const ProgressFiller = styled("div")<{ percentage: number }>(
  {
    height: progressHeight,
    backgroundColor: "#4f8da3",
    borderRadius: "5px 0 0 5px",
    transition: `width 500ms ease-in-out`,
    gridColumnStart: "span 9",
  },
  (props) => ({
    width: `${props.percentage}%`,
  })
);

const verticalEmojiAdjustment = "-70%";
const horizontalEmojiAdjustment = "15px";

const Bubble = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  top: "-50%",
  position: "relative",
  width: 2,
  transform: "translateY(-50%)",

  pointerEvents: "none",
  filter: "grayscale(70%)",
  // opacity: 0.5,
  fontSize: "clamp(10px,4.5vw,25px)",
  // the progress filler consumes the whole row, making the bubbles spill over into a new row
  // need to move them back upwards so they can overlap
  // transform: `translateY(${verticalEmojiAdjustment})`,
});

const Demarkation = styled("div")({
  backgroundColor: "black",
  opacity: 0.3,
  height: 12,
  width: 2,
});

const getRankingBounds = (
  currentScore: number,
  rankingScheme: RankingScheme
): {
  pointsToNextRank: number | null;
  percent: number;
  currentRank: `${ScoreRankings}`;
  nextRank: `${ScoreRankings}` | null;
} => {
  const NUM_SEGMENTS = 8;

  let scoreThresholds = Object.values(rankingScheme);
  let rankTitles = Object.keys(rankingScheme) as Array<`${ScoreRankings}`>;

  // queen bee doesn't get considered as a visible rank
  scoreThresholds.pop();
  rankTitles.pop();

  // if we're at the highest possible rank
  if (currentScore > scoreThresholds[scoreThresholds.length - 1]) {
    return {
      pointsToNextRank: null,
      percent: 100,
      currentRank: rankTitles[rankTitles.length - 1],
      nextRank: null,
    };
  }

  const nextRankIndex = scoreThresholds.findIndex(
    (score) => score > currentScore
  );

  const relativeUpperBound = scoreThresholds[nextRankIndex];

  let relativeLowerBound: number;
  let activeRankIndex: number;

  if (nextRankIndex === 0) {
    relativeLowerBound = 0;
    activeRankIndex = 0;
  } else {
    relativeLowerBound = scoreThresholds[nextRankIndex - 1];
    activeRankIndex = nextRankIndex - 1;
  }

  let segmentPercent: number;

  if (relativeUpperBound === 0) {
    segmentPercent = 0;
  } else {
    segmentPercent =
      (currentScore - relativeLowerBound) /
      (relativeUpperBound - relativeLowerBound);
  }

  const scaledSegmentPercent = segmentPercent * (100 / NUM_SEGMENTS);
  const scaledFullPercent =
    activeRankIndex * (100 / NUM_SEGMENTS) + scaledSegmentPercent;

  return {
    pointsToNextRank: scoreThresholds[nextRankIndex] - currentScore,
    percent: scaledFullPercent,
    currentRank: rankTitles[activeRankIndex],
    nextRank: rankTitles[nextRankIndex],
  };
};

const ProgressBar = ({ rankingScheme }: { rankingScheme: RankingScheme }) => {
  const score = usePlaySessionStore((state) => state.score);

  const { percent, currentRank, pointsToNextRank, nextRank } = getRankingBounds(
    score,
    rankingScheme
  );
  const emojiElements = emojis.map((emoji, index) => {
    return (
      <Bubble key={emoji}>
        <div>{emoji}</div>
        <Demarkation />
      </Bubble>
    );
  });
  return (
    <div>
      <div>{`you are rank ${currentRank} and need ${pointsToNextRank} to rank up to ${nextRank}`}</div>
      <ProgressContainer>
        <ProgressFiller percentage={percent} />
        {emojiElements}
      </ProgressContainer>
    </div>
  );
};

export default ProgressBar;
