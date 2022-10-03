import styled from "@emotion/styled";
import { useState } from "react";
import { Pangrams } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours, spacings } from "../styles/theme";

const CollapsibleController = styled("button")<{ opened: boolean }>(
  {
    fontSize: "1.6rem",
    boxShadow: `0 1px 1px ${colours["Dark Sienna"]}`,
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Oxygen",
    backgroundColor: colours["Gold Crayola"],
    width: "min(1000px, 90vw)",
    height: "50px",
    ":hover": { filter: "brightness(90%)" },
    zIndex: 6,
  },
  (props) => ({
    backgroundColor: props.opened ? colours.Gamboge : colours["Gold Crayola"],
  })
);

const WordsContainer = styled("div")<{ opened: boolean }>(
  {
    overflowY: "scroll",
    position: "absolute",
    top: 140,
    fontFamily: "Oxygen",
    padding: spacings.lg,
    backgroundColor: colours["Soft White"],
    opacity: 0.98,
    width: "min(1000px, 90vw)",
    maxHeight: "75vh",
    zIndex: 5,
    transition: "max-height 0.5s ease",
  },
  (props) => ({
    display: props.opened ? "block" : "none",
  })
);

const WordsUl = styled("ul")({
  marginTop: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(max(180px, 100%/4), 1fr))",
  listStylePosition: "outside",
});

const WordsLi = styled("li")({
  listStyleType: "disc",
});

const Pangram = styled(WordsLi)({
  color: colours["Gamboge"],
});

const FoundWordsList = ({ pangrams }: { pangrams: Pangrams }) => {
  const wordsFound = usePlaySessionStore((state) => state.wordsFound);
  // use memo on the sorted version of words found?
  const wordsAsList = wordsFound.map((word) => {
    if (pangrams.includes(word)) {
      return <Pangram key={`wordslist_${word}`}>{word}</Pangram>;
    } else return <WordsLi key={`wordslist_${word}`}>{word}</WordsLi>;
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <CollapsibleController
        opened={isOpen}
        onClick={(e) => setIsOpen(!isOpen)}
      >
        {`${wordsFound.length} word${
          wordsFound.length == 1 ? "" : "s"
        } found so far`}
      </CollapsibleController>
      <WordsContainer opened={isOpen}>
        <WordsUl>{wordsAsList}</WordsUl>
      </WordsContainer>
    </>
  );
};

export default FoundWordsList;
