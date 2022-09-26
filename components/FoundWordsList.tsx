import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import TextElement from "./basic/TextElement";

const FoundWordsList = () => {
  const wordsFound = usePlaySessionStore((state) => state.wordsFound);
  const wordsAsList = wordsFound.map((word) => (
    <li key={`wordslist_${word}`}>{word}</li>
  ));
  return <ul>{wordsAsList}</ul>;
};

export default FoundWordsList;
