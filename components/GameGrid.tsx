import styled from "@emotion/styled";

import { colours } from "../styles/theme";
import { ColourNames } from "../styles/types";
import TextElement from "./TextElement";

// credit for how to do this goes to https://css-tricks.com/css-grid-and-custom-shapes-part-1/

const HoneyCombContainer = styled.div({
  display: "grid",
  marginBlock: "min(20%,95px)",
});

type HoneyCombType = {
  xOffset: number;
  yOffset: number;
  cellColour?: ColourNames;
};

const HoneyCombElement = styled("div")<HoneyCombType>(
  {
    cursor: "pointer",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    gridArea: "1/1",
    width: "min(20vw,100px)",
    height: "min(18vw,90px)",
    userSelect: "none",
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%,75% 100%,25% 100%,0 50%)",
    transition: ".1s linear",
    ":hover": { filter: "brightness(89%)" },
  },
  (props) => ({
    backgroundColor: props.cellColour
      ? colours[props.cellColour]
      : colours["Gold Crayola"],
    transform: `translate(${props.xOffset}%,${props.yOffset}%)`,
    ":active": {
      transform: `translate(${props.xOffset}%,${props.yOffset}%) scale(0.8)`,
    },
  })
);

const HoneyCombCenter = styled(HoneyCombElement)({
  backgroundColor: colours["Kobe"],
  ":hover": { filter: "brightness(120%)" },
});

// trial and error translations for perfect honeycomb shape
const translations = [
  [0, -110],
  [85, -55],
  [85, 55],
  [0, 110],
  [-85, 55],
  [-85, -55],
];

const GameGrid = () => {
  const boundaryLetters = ["a", "c", "d", "e", "f", "g"];
  const centerLetter = "b";

  const cells = boundaryLetters.map((letter, index) => {
    return (
      <HoneyCombElement
        key={`cell_${index}`}
        xOffset={translations[index][0]}
        yOffset={translations[index][1]}
      >
        <TextElement size="lg">{letter.toUpperCase()}</TextElement>
      </HoneyCombElement>
    );
  });
  return (
    <HoneyCombContainer>
      {cells}

      <HoneyCombCenter xOffset={0} yOffset={0}>
        <TextElement textColour="Antique White" size="lg">
          {centerLetter.toUpperCase()}
        </TextElement>
      </HoneyCombCenter>
    </HoneyCombContainer>
  );
};

export default GameGrid;
