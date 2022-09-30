import styled from "@emotion/styled";
import { UI_WAITING_TIME } from "../../lib/usePlaySessionStore";
import { fadeInOutSlide } from "../../styles/animations";
import { colours, spacings } from "../../styles/theme";
import { ColourNames } from "../../styles/types";
import TextElement from "./TextElement";

type MessageProps = {
  isShowing: boolean;
  fillColour?: ColourNames;
  textColour?: ColourNames;
};

const Message = styled("div")<MessageProps>((props) => ({
  textAlign: "center",
  padding: spacings.sm,
  margin: spacings.sm,
  // the 33 is hex for 20% transparency
  boxShadow: `0px 5px 20px -0px ${colours["Dark Sienna"]}33`,
  animation: `${fadeInOutSlide} ${UI_WAITING_TIME}ms ease-in`,
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "2",
  width: "200px",
  height: "40px",
  fontSize: "1.6rem",
  visibility: props.isShowing ? "visible" : "hidden",
}));

export default Message;
