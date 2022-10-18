import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import convertTitleCase from "../lib/convertTitleCase";
import { Puzzle } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";
import Modal from "./basic/Modal";
import TextElement from "./basic/TextElement";
import { WordsLi, WordsUl } from "./FoundWordsList";

const Word = styled(WordsLi)<{ isPangram: boolean; wasFound: boolean }>(
  (props) => ({
    color: props.isPangram ? colours.Gamboge : "",
    opacity: props.wasFound ? 1 : 0.4,
    // ":marker": {
    //   content: `✝`,
    // },
    ":marker": { content: '"✝ "', color: "red" },
  })
);

const YesterdayModal = ({
  isOpened,
  setIsOpened,
  yesterdayGame,
}: {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  yesterdayGame: Puzzle;
}) => {
  const { solutionsWithScores, pangrams } = yesterdayGame;

  //   const yesterdaysSolutions = Object.keys(solutionsWithScores);

  //   const yesterdaysWordsFound = usePlaySessionStore(
  //     (state) => state.yesterdaysWordsFound
  //   );

  const yesterdaysSolutions = [
    "Aerially",
    "Aerie",
    "Aide",
    "Aided",
    "Ailed",
    "Aired",
    "Airier",
    "Airily",
    "Airy",
    "Allied",
    "Aria",
    "Arid",
    "Aridly",
    "Daily",
    "Dairy",
    "Dallied",
    "Dallier",
    "Deadlier",
    "Dearie",
    "READILY",
    "DREARILY",
  ];

  const yesterdaysWordsFound = [
    "Allied",
    "Aria",
    "Arid",
    "Aridly",
    "Daily",
    "Dairy",
    "READILY",
  ];

  const yesterdayWordsList = yesterdaysSolutions.map((word) => {
    const titleCaseWord = convertTitleCase(word);

    return (
      <Word
        key={word}
        isPangram={pangrams.includes(word)}
        wasFound={yesterdaysWordsFound.includes(word)}
      >
        {titleCaseWord}
      </Word>
    );
  });
  return (
    <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
      <TextElement>{`You found ${yesterdaysWordsFound.length} word${
        yesterdaysWordsFound.length == 1 ? "" : "s"
      } out of ${yesterdaysSolutions.length} yesterday`}</TextElement>
      <WordsUl
        css={{
          width: "100%",
        }}
      >
        {yesterdayWordsList}
      </WordsUl>
    </Modal>
  );
};

export default YesterdayModal;
