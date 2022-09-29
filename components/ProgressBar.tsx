import styled from "@emotion/styled";

const progressHeight = 5;
const circleSize = 15;

const ProgressContainer = styled("div")({
  backgroundColor: "black",
  width: "80%",
  height: progressHeight,
  borderRadius: "5px",
  //   display: "flex",
  //   justifyContent: "space-between",
  display: "grid",
  gridTemplateColumns: "repeat(9, auto)",
  justifyContent: "space-between",
});

const ProgressFiller = styled("div")({
  height: progressHeight,
  backgroundColor: "green",
  borderRadius: "5px 0 0 5px",
  width: "70%",
  transition: `width 500ms ease-in-out`,
  gridColumnStart: "span 9",
});

const Bubble = styled("div")({
  zIndex: 3,
  height: circleSize,
  width: circleSize,
  backgroundColor: "magenta",
  clipPath: "circle(40%)",
  //   transform: "translateY(-16px)",
  position: "relative",
  //   top: "-75%",
  top: `-${(progressHeight + circleSize) / 2}px `,
  alignSelf: "center",
});

const ProgressBar = () => {
  return (
    <ProgressContainer>
      <ProgressFiller />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
      <Bubble />
    </ProgressContainer>
  );
};

export default ProgressBar;
