import styled from "@emotion/styled";
import { Pangrams } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours, spacings } from "../styles/theme";
import TextElement from "./basic/TextElement";

const WordsContainer = styled("div")({
  fontFamily: "Oxygen",
  padding: spacings.lg,
  overflowY: "scroll",
  backgroundColor: colours["Soft White"],
  opacity: 0.8,
  borderRadius: "10px",
  width: "min(1000px, 90vw)",
  maxHeight: "90vh",
});

const WordsUl = styled("ul")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  listStylePosition: "outside",
});

const WordsLi = styled("li")({
  listStyleType: "disc",
});

const Pangram = styled(WordsLi)({
  color: colours["Rust"],
});

const FoundWordsList = ({ pangrams }: { pangrams: Pangrams }) => {
  const wordsFound = usePlaySessionStore((state) => state.wordsFound);
  const wordsAsList = wordsFound.sort().map((word) => {
    if (pangrams.includes(word)) {
      return <Pangram key={`wordslist_${word}`}>{word}</Pangram>;
    } else return <WordsLi key={`wordslist_${word}`}>{word}</WordsLi>;
  });
  return (
    <WordsContainer>
      <TextElement>{`${wordsFound.length} words found so far`}</TextElement>
      <WordsUl>{wordsAsList}</WordsUl>
    </WordsContainer>
  );
};

export default FoundWordsList;
