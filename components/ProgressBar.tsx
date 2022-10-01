import styled from "@emotion/styled";
import { emojisToScores } from "../lib/dummy";
import { RankingScheme, ScoreRankings } from "../lib/gameTypes";
import getRankingBounds from "../lib/getRankingBounds";
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

const Checkpoint = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  top: "-50%",
  position: "relative",
  width: 2,
  transform: "translateY(-50%)",
  pointerEvents: "none",
  fontSize: "clamp(10px,4.5vw,25px)",
});

const Demarkation = styled("div")({
  backgroundColor: "black",
  opacity: 0.3,
  height: 12,
  width: 2,
});

const darken = `brightness(0.4)`;
const dull = `grayscale(0.4)`;

const EmojiContainer = styled("div")<{
  isActive: boolean;
  hasBeenSurpassed?: boolean;
}>((props) => ({
  transitionProperty: "filter, transform",
  transitionDuration: ` 500ms `,
  transitionTimingFunction: "ease-in-out",
  transform: `${props.isActive ? "" : "scale(0.8) translateY(10%)"}`,
  filter: props.isActive
    ? "none"
    : props.hasBeenSurpassed
    ? `${dull}`
    : `${darken}`,
}));

// omit Queen Bee off the object as that's not supposed to show up on UI
const { "Queen Bee": string, ...displayableEmojisToScores } = emojisToScores;
const emojis = Object.values(displayableEmojisToScores);
const rankings = Object.keys(displayableEmojisToScores);

const ProgressBar = ({ rankingScheme }: { rankingScheme: RankingScheme }) => {
  const score = usePlaySessionStore((state) => state.score);
  const { percent, currentRank, pointsToNextRank, nextRank } = getRankingBounds(
    score,
    rankingScheme
  );
  const activeEmoji = emojisToScores[currentRank];

  const emojiElements = emojis.map((emoji, index) => {
    return (
      <Checkpoint key={emoji}>
        <EmojiContainer
          isActive={emoji === activeEmoji}
          hasBeenSurpassed={index < rankings.indexOf(currentRank)}
        >
          {emoji}
        </EmojiContainer>
        <Demarkation />
      </Checkpoint>
    );
  });

  return (
    <ProgressContainer>
      <ProgressFiller percentage={percent} />
      {emojiElements}
    </ProgressContainer>
  );
};

export default ProgressBar;
