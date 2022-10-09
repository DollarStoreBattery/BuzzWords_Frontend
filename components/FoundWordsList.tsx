import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import { Pangrams } from "../lib/gameTypes";
import useHydration from "../lib/useHydration";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import useWindowSize from "../lib/useWindowSize";
import { colours, spacings } from "../styles/theme";
import TextElement from "./basic/TextElement";

const narrowScreenWidth = "min(700px, 90vw)";
const narrowScreeHeight = "65vh";
const wideScreenWidth = "100%";
const wideScreenHeight = "max(440px,55vh)";

type CollapseType = {
  opened: boolean;
};

const collapsibleHeaderStyles = css({
  zIndex: 3,
  fontSize: "1.6rem",
  boxShadow: `0 1px 1px ${colours["Dark Sienna"]}`,
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Oxygen",
  backgroundColor: colours["Gold Crayola"],
  height: "35px",
});

const ControllerAndListContainer = styled("div")({
  flex: "0 1 45%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "flex-start",
});

const CollapsibleController = styled("button")<
  CollapseType & { isAbsolute: boolean }
>(collapsibleHeaderStyles, (props) => ({
  width: props.isAbsolute ? narrowScreenWidth : wideScreenWidth,
  cursor: "pointer",
  ":hover": { filter: "brightness(90%)" },
  backgroundColor: props.opened ? colours.Gamboge : colours["Gold Crayola"],
}));

const CollapsibleHeader = styled("div")<{ isAbsolute: boolean }>(
  collapsibleHeaderStyles,
  (props) => ({
    width: props.isAbsolute ? narrowScreenWidth : wideScreenWidth,
  })
);

const WordsContainer = styled("div")<CollapseType & { isAbsolute: boolean }>(
  {
    overflowY: "auto",
    fontFamily: "Oxygen",
    backgroundColor: colours["Soft White"],
    opacity: 0.98,
    zIndex: 1,
    transition: "height 0.15s ease",
  },
  (props) => ({
    width: props.isAbsolute ? narrowScreenWidth : wideScreenWidth,
    padding: props.opened ? spacings.lg : 0,
    height: props.isAbsolute
      ? props.opened
        ? narrowScreeHeight
        : "0"
      : wideScreenHeight,
    position: props.isAbsolute ? "absolute" : "inherit",
    top: props.isAbsolute ? 230 : "",
    maxHeight: props.isAbsolute ? narrowScreeHeight : wideScreenHeight,
  })
);

const WordsUl = styled("ul")({
  marginTop: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(max(130px, 100%/3), 1fr))",
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

  const memoizedWordList = useMemo(() => {
    return wordsFound.sort().map((word) => {
      const titleCaseWord =
        word.slice(0, 1) + word.toLowerCase().slice(1, word.length);
      if (pangrams.includes(word)) {
        return <Pangram key={`wordslist_${word}`}>{titleCaseWord}</Pangram>;
      } else
        return <WordsLi key={`wordslist_${word}`}>{titleCaseWord}</WordsLi>;
    });
  }, [wordsFound]);

  const wordContainerContents =
    memoizedWordList.length > 0 ? (
      <WordsUl>{memoizedWordList}</WordsUl>
    ) : (
      <TextElement>{"You haven't found any words yet!"}</TextElement>
    );

  // words found so far
  const collapsibleContents = `${wordsFound.length} word${
    wordsFound.length == 1 ? "" : "s"
  } found so far`;

  const [isOpen, setIsOpen] = useState(false);
  const hasHydrated = useHydration();

  const size = useWindowSize();
  const breakpoint = 768;

  const isAbsolutelyPosition =
    size.width !== undefined && size.width <= breakpoint;

  if (!hasHydrated) {
    return <>Loading...</>;
  } else if (isAbsolutelyPosition)
    return (
      <>
        <CollapsibleController
          isAbsolute={isAbsolutelyPosition}
          opened={isOpen}
          onClick={(e) => setIsOpen(!isOpen)}
        >
          {collapsibleContents}
          <CollapseIcon opened={isOpen} fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.657 16.243l1.414-1.414-7.07-7.072-7.072 7.072 1.414 1.414L12 10.586l5.657 5.657z"
            />
          </CollapseIcon>
        </CollapsibleController>

        <WordsContainer
          opened={isOpen ? true : false}
          isAbsolute={isAbsolutelyPosition}
        >
          {wordContainerContents}
        </WordsContainer>
      </>
    );
  else
    return (
      <>
        <ControllerAndListContainer>
          <CollapsibleHeader isAbsolute={isAbsolutelyPosition}>
            {collapsibleContents}
          </CollapsibleHeader>
          <WordsContainer opened={true} isAbsolute={isAbsolutelyPosition}>
            {wordContainerContents}
          </WordsContainer>
        </ControllerAndListContainer>
      </>
    );
};

export default FoundWordsList;
