import styled from "@emotion/styled";
import { forwardRef } from "react";
import { gameName } from "../lib/constants";
import { colours, fontSizes, spacings } from "../styles/theme";
import { StyledList, StyledListItem } from "./basic/List";
import TextElement from "./basic/TextElement";

export const ModalContainer = styled("dialog")({
  border: "1px solid #80808057",
  backgroundColor: colours["Soft White"],
  height: "95%",
  width: "min(650px,85vw)",
  padding: spacings.lg,
  fontSize: fontSizes.md,
  "::backdrop": {
    background: "rgba(0, 0, 0, 0.3)",
  },
});

export const ModalContent = styled("div")({
  fontFamily: "oxygen",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const InstructionModal = forwardRef<HTMLDialogElement>((_props, ref) => {
  return (
    <ModalContainer ref={ref}>
      <ModalContent>
        <TextElement fontFamily="Decorative">
          {`🐝 Welcome to the ${gameName}🐝`}
        </TextElement>
        <TextElement size={"sm"}>
          A new game drops every midnight (Eastern Standard Time).
        </TextElement>

        <TextElement unPadded={true} fontFamily="Decorative">
          Goal
        </TextElement>
        <TextElement size={"sm"}>
          Find as many words as possible with the provided letters.
        </TextElement>

        <TextElement unPadded={true} fontFamily="Decorative">
          Rules
        </TextElement>
        <StyledList>
          <StyledListItem>Words must contain the central letter</StyledListItem>
          <StyledListItem>Words must be at least 4 letters</StyledListItem>
          <StyledListItem>
            All letters can be used more than once
          </StyledListItem>
        </StyledList>

        <TextElement unPadded={true} fontFamily="Decorative">
          Scoring
        </TextElement>
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

        <TextElement unPadded={true} fontFamily="Decorative">
          F.A.Q.
        </TextElement>
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
                No, it's free. Though if you'd like, you can buy me a coffee.
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
});

export default InstructionModal;
