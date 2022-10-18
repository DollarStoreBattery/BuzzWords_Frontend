import { Dispatch, SetStateAction } from "react";
import { gameName } from "../lib/constants";
import { StyledList, StyledListItem } from "./basic/List";
import Modal from "./basic/Modal";
import TextElement from "./basic/TextElement";

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
  return (
    <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
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
        <StyledListItem>Words must be at least 4 letters long</StyledListItem>
        <StyledListItem>All letters can be used more than once</StyledListItem>
      </StyledList>

      {getHeadingElement("Scoring")}

      <StyledList>
        <StyledListItem>Four-letter words are worth 1 point</StyledListItem>
        <StyledListItem>
          Longer words are worth 1 point per letter
        </StyledListItem>
        <StyledListItem>
          Puzzles will always have at least one pangram. These are words that
          use all 7 letters, and are worth 7 bonus points!
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
              <a href="http://wordlist.aspell.net/12dicts/" target={"_blank"}>
                12Dicts from SCOWL
              </a>
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          Are there vulgar or offensive words in the word list?
          <StyledList>
            <StyledListItem>
              Unfortunately, yes. Filtering them out is something I plan to do
              soon.
            </StyledListItem>
          </StyledList>
        </StyledListItem>
        <StyledListItem>
          Does this game have a paywall?
          <StyledList>
            <StyledListItem>
              Nope!
              {/* Nope! Though if you'd like, you can support me below. */}
            </StyledListItem>
          </StyledList>
        </StyledListItem>
      </StyledList>
      {/* todo: figure out when the site is ready for this */}
      {/* <a href="https://ko-fi.com/U6U4FI5BD" target="_blank">
<img
  height="36"
  src="https://cdn.ko-fi.com/cdn/kofi2.png?v=3"
  alt="Buy Me a Coffee at ko-fi.com"
/>
</a> */}
    </Modal>
  );
};

export default InstructionModal;
