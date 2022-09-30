import styled from "@emotion/styled";
import { emojis } from "../lib/dummy";

const progressHeight = 4;

const ProgressContainer = styled("div")({
  marginBlock: "20px",
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
  filter: "grayscale(80%)",
  // opacity: 0.5,
  fontSize: "clamp(10px,4.5vw,25px)",
  // the progress filler consumes the whole row, making the bubbles spill over into a new row
  // need to move them back upwards so they can overlap
  transform: `translateY(${verticalEmojiAdjustment})`,
});

// emojis dont fill the space so the boundary emojis leave an ugly gap
// first bubble shifts left, last bubble shifts right
const FirstBubble = styled(Bubble)({
  transform: `translate(-${horizontalEmojiAdjustment},${verticalEmojiAdjustment})`,
});

const LastBubble = styled(Bubble)({
  transform: `translate(${horizontalEmojiAdjustment},${verticalEmojiAdjustment})`,
});

// Beginner: 0,
// "Good Start": 0.02,
// "Moving Up": 0.05,
// Good: 0.08,
// Solid: 0.15,
// Nice: 0.25,
// Great: 0.4,
// Amazing: 0.5,
// Genius: 0.7,
// "Queen Bee": 1,

const rankNames = [
  "Beginner",
  "Good Start",
  "Moving Up",
  "Good",
  "Solid",
  "Nice",
  "Great",
  "Amazing",
  "Genius",
];

const ProgressBar = ({}: {}) => {
  const emojiElements = emojis.map((emoji, index) => {
    if (index === 0) {
      return <FirstBubble key={emoji}>{emoji}</FirstBubble>;
    } else if (index === emojis.length - 1) {
      return <LastBubble key={emoji}>{emoji}</LastBubble>;
    } else return <Bubble key={emoji}>{emoji}</Bubble>;
  });
  return (
    <ProgressContainer>
      <ProgressFiller percentage={2.22} />
      {emojiElements}
    </ProgressContainer>
  );
};

export default ProgressBar;
