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
    zIndex: -1,
    color: props.isPangram ? colours.Gamboge : "",
    opacity: props.wasFound ? 1 : 0.45,
    "::marker": {
      content: props.wasFound ? '"✔ "' : "initial",
    },
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
  const { solutionsWithScores, pangrams, date, puzzleLetters, centralLetter } =
    yesterdayGame;

  const yesterdaysSolutions = Object.keys(solutionsWithScores);

  const yesterdaysWordsFound = usePlaySessionStore(
    (state) => state.yesterdaysWordsFound
  );

  //   const yesterdaysSolutions = [
  //     "Aerially",
  //     "Aerie",
  //     "Aide",
  //     "Aided",
  //     "Ailed",
  //     "Aired",
  //     "Airier",
  //     "Airily",
  //     "Airy",
  //     "Allied",
  //     "Aria",
  //     "Arid",
  //     "Aridly",
  //     "Daily",
  //     "Dairy",
  //     "Dallied",
  //     "Dallier",
  //     "Deadlier",
  //     "Dearie",
  //     "READILY",
  //     "DREARILY",
  //   ];

  //   const yesterdaysWordsFound = [
  //     "Allied",
  //     "Aria",
  //     "Arid",
  //     "Aridly",
  //     "Daily",
  //     "Dairy",
  //     "READILY",
  //   ];

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
  const yesterDate = new Date(date);
  const formattedPuzzleLetters = puzzleLetters.map((letter) => {
    const letterUpper = letter.toUpperCase();

    if (letter == centralLetter) {
      return (
        <span
          key={`yesterday_${letter}`}
          css={{
            color: colours.Gamboge,
          }}
        >
          {letterUpper}
        </span>
      );
    } else return letterUpper;
  });
  return (
    <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
      <TextElement>
        Solutions for {yesterDate.toDateString().replace(/^\S+\s/, "")}
      </TextElement>
      <TextElement fontFamily="Decorative" size="lg" unPadded={true}>
        {formattedPuzzleLetters}
      </TextElement>
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
