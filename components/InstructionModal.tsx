import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { gameName } from "../lib/constants";
import { colours, fontFamilies, fontSizes, spacings } from "../styles/theme";
import { StyledList, StyledListItem } from "./basic/List";
import TextElement from "./basic/TextElement";

export const ModalContainer = styled("dialog")({
  border: "1px solid #80808057",
  backgroundColor: colours["Soft White"],
  height: "95%",
  width: "min(650px,95vw)",
  fontSize: fontSizes.md,
  "::backdrop": {
    background: "rgba(0, 0, 0, 0.4)",
  },
  padding: 0,
});

export const ModalContent = styled("div")({
  padding: spacings.lg,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const ModalCloseButton = styled("button")({
  justifyContent: "space-between",
  alignItems: "center",
  display: "flex",
  cursor: "pointer",
  outline: "none",
  backgroundColor: colours["Gamboge"],
  fontFamily: fontFamilies.Simple,
  height: 40,
  width: "100%",
  position: "sticky",
  top: 0,
  border: "1px solid #80808057",
  ":hover": { filter: "brightness(90%)" },
});

const CloseIcon = styled("svg")({
  width: 35,
  height: 35,
  color: colours["Dark Sienna"],
});

const getHeadingElement = (heading: string) => {
  return (
    <TextElement
      unPadded={true}
      fontFamily="Decorative"
      css={{ alignSelf: "flex-start" }}
    >
      {heading}
    </TextElement>
  );
};

const InstructionModal = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const instructionsElement = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpened) {
      instructionsElement.current?.removeAttribute("open");

      instructionsElement.current?.showModal();
    } else {
      instructionsElement.current?.close();
    }
  }, [isOpened, instructionsElement]);

  return (
    <ModalContainer
      ref={instructionsElement}
      onCancel={(e) => {
        setIsOpened(false);
      }}
    >
      <ModalCloseButton
        onClick={(e) => {
          setIsOpened(false);
        }}
      >
        <>Close</>
        <CloseIcon
          viewBox="0 0 512 512"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
        </CloseIcon>
      </ModalCloseButton>
      <ModalContent>
        <TextElement fontFamily="Decorative" unPadded={true}>
          {`Welcome to the ${gameName}🐝`}
        </TextElement>
        <TextElement size={"sm"}>
          A new game drops every midnight (Eastern Standard Time).
        </TextElement>

        {getHeadingElement("Goal")}

        <TextElement size={"sm"} css={{ alignSelf: "flex-start" }}>
          Find as many words as possible with the provided letters.
        </TextElement>

        {getHeadingElement("Rules")}

        <StyledList>
          <StyledListItem>Words must contain the central letter</StyledListItem>
          <StyledListItem>Words must be at least 4 letters</StyledListItem>
          <StyledListItem>
            All letters can be used more than once
          </StyledListItem>
        </StyledList>

        {getHeadingElement("Scoring")}

        <StyledList>
          <StyledListItem>Four-letter words are worth 1 point</StyledListItem>
          <StyledListItem>
            Longer words are worth 1 point per letter
          </StyledListItem>
          <StyledListItem>
            Every puzzle has at least one pangram. These are words that use all
            7 letters, and are worth 7 bonus points!
          </StyledListItem>
        </StyledList>

        {getHeadingElement("F.A.Q.")}

        <StyledList>
          <StyledListItem>
            How do rankings work?
            <StyledList>
              <StyledListItem>
                Every rank is a percentage of the highest possible score. The
                genius rank is awarded at 70%.
              </StyledListItem>
            </StyledList>
          </StyledListItem>
          <StyledListItem>
            Does this game use the same word list as the New York Times?
            <StyledList>
              <StyledListItem>
                No, they keep their list is private (as far as I know).
              </StyledListItem>
            </StyledList>
          </StyledListItem>
          <StyledListItem>
            What word list does this game use?
            <StyledList>
              <StyledListItem>
                <a href="http://wordlist.aspell.net/12dicts/">
                  12Dicts from SCOWL
                </a>
              </StyledListItem>
            </StyledList>
          </StyledListItem>
          <StyledListItem>
            Does this game have a paywall?
            <StyledList>
              <StyledListItem>
                Nope! Though if you'd like, you can support me below.
              </StyledListItem>
            </StyledList>
          </StyledListItem>
        </StyledList>
        <a href="https://ko-fi.com/U6U4FI5BD" target="_blank">
          <img
            height="36"
            src="https://cdn.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </ModalContent>
    </ModalContainer>
  );
};

export default InstructionModal;
