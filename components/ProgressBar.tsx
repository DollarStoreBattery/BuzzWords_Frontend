import styled from "@emotion/styled";
import { rankAndEmojis } from "../lib/dummy";
import { RankingScheme } from "../lib/gameTypes";
import getRankingBounds from "../lib/getRankingBounds";
import useHydration from "../lib/useHydration";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { rocking } from "../styles/animations";

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

const locked = `brightness(0.4)`;
const surpassed = `grayscale(0.2) brightness(0.9)`;

const EmojiContainer = styled("div")<{
  isActive: boolean;
  hasBeenSurpassed?: boolean;
}>((props) => ({
  userSelect: "none",
  WebkitUserSelect: "none",
  transitionProperty: "filter, transform",
  transitionDuration: "500ms",
  transitionTimingFunction: "ease-in-out",
  animation: props.isActive ? `${rocking} 5000ms linear infinite` : "none",
  transform: `${props.isActive ? "" : "scale(0.8) translateY(10%)"}`,
  filter: props.isActive
    ? "none"
    : props.hasBeenSurpassed
    ? `${surpassed}`
    : `${locked}`,
}));

// omit Queen Bee off the object as that's not supposed to show up on UI
const { "Queen Bee": string, ...displayableEmojisToScores } = rankAndEmojis;
const emojis = Object.values(displayableEmojisToScores);
const rankings = Object.keys(displayableEmojisToScores);

const ProgressBar = ({ rankingScheme }: { rankingScheme: RankingScheme }) => {
  const score = usePlaySessionStore((state) => state.score);
  const { percent, currentRank } = getRankingBounds(score, rankingScheme);
  const activeEmoji = rankAndEmojis[currentRank];

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
  const hasHydrated = useHydration();

  if (!hasHydrated) {
    // return <>Loading...</>;
    return (
      <ProgressContainer>
        <ProgressFiller percentage={0} />
        {emojis.map((emoji) => {
          return (
            <Checkpoint key={emoji}>
              <EmojiContainer isActive={false} hasBeenSurpassed={false}>
                {emoji}
              </EmojiContainer>
              <Demarkation />
            </Checkpoint>
          );
        })}
      </ProgressContainer>
    );
  } else
    return (
      <ProgressContainer>
        <ProgressFiller percentage={percent} />
        {emojiElements}
      </ProgressContainer>
    );
};

export default ProgressBar;
