import styled from "@emotion/styled";
import { emojis } from "../lib/dummy";
import { RankingScheme, ScoreRankings } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";

const progressHeight = 4;

const ProgressContainer = styled("div")({
  marginBlock: "20px",
  backgroundColor: "darkgrey",
  width: "90%",
  height: progressHeight,
  borderRadius: "5px",
  display: "grid",
  gridTemplateColumns: "repeat(8, auto)",
  // gridTemplateColumns: "repeat(12.5%,8)",
  justifyContent: "space-between",
});

const ProgressFiller = styled("div")<{ percentage: number }>(
  {
    height: progressHeight,
    backgroundColor: "#4f8da3",
    borderRadius: "5px 0 0 5px",
    width: "80%",
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
  height: 20,
  pointerEvents: "none",
  filter: "grayscale(80%)",
  // opacity: 0.5,
  fontSize: "clamp(10px,4.5vw,25px)",
  // the progress filler consumes the whole row, making the bubbles spill over into a new row
  // need to move them back upwards so they can overlap
  // transform: `translateY(${verticalEmojiAdjustment})`,
});

// emojis dont fill the space so the boundary emojis leave an ugly gap
// first bubble shifts left, last bubble shifts right
const FirstBubble = styled(Bubble)({
  // transform: `translate(-${horizontalEmojiAdjustment},${verticalEmojiAdjustment})`,
});

const LastBubble = styled(Bubble)({
  // transform: `translate(${horizontalEmojiAdjustment},${verticalEmojiAdjustment})`,
});

const getRankingBounds = (
  currentScore: number,
  rankingScheme: RankingScheme
): {
  percent: number;
  currentRank: `${ScoreRankings}`;
  nextRank: `${ScoreRankings}`;
} => {
  const NUM_SEGMENTS = 8;

  const scoreThresholds = Object.values(rankingScheme);

  const nextRankIndex = scoreThresholds.findIndex(
    (score) => score >= currentScore
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
    percent: scaledFullPercent,
    currentRank: "Beginner",
    nextRank: "Amazing",
  };
};

const ProgressBar = ({ rankingScheme }: { rankingScheme: RankingScheme }) => {
  const score = usePlaySessionStore((state) => state.score);

  const { percent } = getRankingBounds(score, rankingScheme);
  console.log(percent);
  const emojiElements = emojis.map((emoji, index) => {
    if (index === 0) {
      return <FirstBubble key={emoji}>{"|"}</FirstBubble>;
    } else if (index === emojis.length - 1) {
      return <LastBubble key={emoji}>{"|"}</LastBubble>;
    } else return <Bubble key={emoji}>{"|"}</Bubble>;
  });
  return (
    <ProgressContainer>
      <ProgressFiller percentage={percent} />
      {emojiElements}
    </ProgressContainer>
  );
};

export default ProgressBar;
