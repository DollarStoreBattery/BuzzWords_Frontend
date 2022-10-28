import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import convertTitleCase from "../lib/convertTitleCase";
import { Puzzle } from "../lib/gameTypes";
import useHydration from "../lib/useHydration";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";
import CustomModal from "./basic/CustomModal";
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
  const hasHydrated = useHydration();

  const { solutionsWithScores, pangrams, date, puzzleLetters, centralLetter } =
    yesterdayGame;

  const yesterdaysSolutions = Object.keys(solutionsWithScores);

  const yesterdaysWordsFound = usePlaySessionStore(
    (state) => state.yesterdaysWordsFound
  );

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

  const modalContents = (
    <>
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
          fontSize: "1em",
        }}
      >
        {yesterdayWordsList}
      </WordsUl>
    </>
  );
  return (
    <CustomModal isOpened={isOpened} setIsOpened={setIsOpened}>
      {hasHydrated ? modalContents : <>Loading...</>}
    </CustomModal>
  );
};

export default YesterdayModal;
