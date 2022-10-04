import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Pangrams } from "../lib/gameTypes";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours, spacings } from "../styles/theme";
import TextElement from "./basic/TextElement";

const commonStyles = css({
  width: "min(700px, 90vw)",
});

type CollapseType = {
  opened: boolean;
};

const CollapsibleController = styled("button")<CollapseType>(
  commonStyles,
  {
    fontSize: "1.6rem",
    boxShadow: `0 1px 1px ${colours["Dark Sienna"]}`,
    border: "none",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Oxygen",
    backgroundColor: colours["Gold Crayola"],
    height: "35px",
    ":hover": { filter: "brightness(90%)" },
    zIndex: 6,
  },
  (props) => ({
    backgroundColor: props.opened ? colours.Gamboge : colours["Gold Crayola"],
  })
);

const WordsContainer = styled("div")<CollapseType>(
  commonStyles,
  {
    overflowY: "auto",
    position: "absolute",
    top: 120,
    fontFamily: "Oxygen",
    backgroundColor: colours["Soft White"],
    opacity: 0.98,
    maxHeight: "75vh",
    zIndex: 5,
    transition: "height 0.15s ease",
  },
  (props) => ({
    padding: props.opened ? spacings.lg : 0,
    height: props.opened ? "75vh" : "0",
  })
);

const WordsUl = styled("ul")({
  marginTop: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(max(180px, 100%/3), 1fr))",
  listStylePosition: "outside",
});

const WordsLi = styled("li")({
  listStyleType: "disc",
});

const Pangram = styled(WordsLi)({
  color: colours["Gamboge"],
});

const CollapseIcon = styled("svg")<CollapseType>(
  {
    color: colours.Kobe,
    marginLeft: 20,
    height: 35,
    width: 35,
    transition: "transform 0.2s ease",
  },
  (props) => ({
    transform: props.opened ? "rotate(0turn)" : "rotate(-0.5turn)",
  })
);
const FoundWordsList = ({ pangrams }: { pangrams: Pangrams }) => {
  const wordsFound = usePlaySessionStore((state) => state.wordsFound);
  // use memo on the sorted version of words found?
  const wordsAsList = wordsFound.map((word) => {
    const titleCaseWord =
      word.slice(0, 1) + word.toLowerCase().slice(1, word.length);
    if (pangrams.includes(word)) {
      return <Pangram key={`wordslist_${word}`}>{titleCaseWord}</Pangram>;
    } else return <WordsLi key={`wordslist_${word}`}>{titleCaseWord}</WordsLi>;
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
        <CollapseIcon opened={isOpen} fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.657 16.243l1.414-1.414-7.07-7.072-7.072 7.072 1.414 1.414L12 10.586l5.657 5.657z"
          />
        </CollapseIcon>
      </CollapsibleController>

      <WordsContainer opened={isOpen ? true : false}>
        {wordsAsList.length > 0 ? (
          <WordsUl>{wordsAsList}</WordsUl>
        ) : (
          <TextElement>{"You haven't found any words yet!"}</TextElement>
        )}
      </WordsContainer>
    </>
  );
};

export default FoundWordsList;
