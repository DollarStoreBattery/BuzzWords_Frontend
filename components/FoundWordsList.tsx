import styled from "@emotion/styled";
import { Pangrams } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";

const Pangram = styled("li")({
  color: colours["Gamboge"],
});

const FoundWordsList = ({ pangrams }: { pangrams: Pangrams }) => {
  const wordsFound = usePlaySessionStore((state) => state.wordsFound);
  const wordsAsList = wordsFound.map((word) => {
    if (pangrams.includes(word)) {
      return <Pangram key={`wordslist_${word}`}>{word}</Pangram>;
    } else return <li key={`wordslist_${word}`}>{word}</li>;
  });
  return <ul>{wordsAsList}</ul>;
};

export default FoundWordsList;
