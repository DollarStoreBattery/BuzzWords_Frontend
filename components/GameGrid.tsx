import styled from "@emotion/styled";
import { useEffect } from "react";

import usePlaySessionStore from "../lib/usePlaySessionStore";
import { fadeIn } from "../styles/animations";

import { colours } from "../styles/theme";
import { ColourNames } from "../styles/types";
import TextElement from "./basic/TextElement";

// credit for how to do this goes to https://css-tricks.com/css-grid-and-custom-shapes-part-1/

const HoneyCombContainer = styled.div({
  display: "grid",
  marginBlock: "min(20vw,100px) min(28vw,120px)",
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
      transform: `translate(${props.xOffset}%,${props.yOffset}%) scale(1.1)`,
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

type GameGridProps = { centralLetter: string; boundaryLetters: Array<string> };

const GameGrid = ({ centralLetter, boundaryLetters }: GameGridProps) => {
  const addtoGuess = usePlaySessionStore((state) => state.addToGuess);
  const statefulBoundaryLetters = usePlaySessionStore(
    (state) => state.boundaryLetters
  );
  const setStatefulBoundaryLetters = usePlaySessionStore(
    (state) => state.setBoundaryLetters
  );
  const error = usePlaySessionStore((state) => state.activeError);
  const success = usePlaySessionStore((state) => state.activeSuccess);

  useEffect(() => {
    setStatefulBoundaryLetters(boundaryLetters);
  }, [boundaryLetters, setStatefulBoundaryLetters]);

  const BoundaryCells = statefulBoundaryLetters.map((letter, index) => {
    return (
      <HoneyCombElement
        key={`cell_${index}`}
        xOffset={translations[index][0]}
        yOffset={translations[index][1]}
        onClick={(e) => {
          e.preventDefault();
          if (!error && !success) {
            addtoGuess(letter);
          }
        }}
      >
        <TextElement
          key={`${letter}_${statefulBoundaryLetters.toString()}`}
          size="lg"
          css={{
            animation: `${fadeIn} 600ms ease`,
          }}
        >
          {letter}
        </TextElement>
      </HoneyCombElement>
    );
  });

  return (
    <HoneyCombContainer>
      {BoundaryCells}
      <HoneyCombCenter
        onClick={(e) => {
          e.preventDefault();
          addtoGuess(centralLetter);
        }}
        xOffset={0}
        yOffset={0}
      >
        <TextElement textColour="Antique White" size="lg">
          {centralLetter}
        </TextElement>
      </HoneyCombCenter>
    </HoneyCombContainer>
  );
};

export default GameGrid;
