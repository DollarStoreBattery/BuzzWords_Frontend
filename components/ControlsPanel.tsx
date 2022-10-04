import styled from "@emotion/styled";
import { SolutionAndScore } from "../lib/gameTypes";
import BackSpaceButton from "./BackSpaceButton";
import ClearButton from "./ClearButton";
import EnterButton from "./EnterButton";
import NukeButtonDevOnly from "./NukeButtonDevOnly";
import ShuffleButton from "./ShuffleButton";

const ControlsPanelElement = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const ControlsPanel = ({
  solutionsWithScores,
  centralLetter,
  puzzleLetters,
}: {
  solutionsWithScores: SolutionAndScore;
  centralLetter: string;
  puzzleLetters: Array<string>;
}) => {
  return (
    <ControlsPanelElement>
      {/* <NukeButtonDevOnly /> */}
      {/* <ScoreButtonDevOnly /> */}
      {/* <BackSpaceButton /> */}
      <ClearButton />

      <ShuffleButton />
      <EnterButton
        centralLetter={centralLetter}
        solutionsWithScores={solutionsWithScores}
        puzzleLetters={puzzleLetters}
      />
    </ControlsPanelElement>
  );
};

export default ControlsPanel;
