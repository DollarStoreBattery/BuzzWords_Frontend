import styled from "@emotion/styled";
import { UI_WAITING_TIME } from "../../lib/usePlaySessionStore";
import { fadeInOutSlide } from "../../styles/animations";
import { colours } from "../../styles/theme";
import { ColourNames } from "../../styles/types";
import TextElement from "./TextElement";

type MessageProps = {
  isShowing: boolean;
  fillColour?: ColourNames;
  textColour?: ColourNames;
};

const Message = styled(TextElement)<MessageProps>((props) => ({
  color: props.textColour ? props.textColour : colours["Antique White"],
  animation: `${fadeInOutSlide} ${UI_WAITING_TIME}ms ease-in`,
  position: "static",
  backgroundColor: props.fillColour ? props.fillColour : colours["Rust"],
  borderRadius: "20px",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "2",
  width: "200px",
  height: "40px",
  fontSize: "1.6rem",
  visibility: props.isShowing ? "visible" : "hidden",
}));

export default Message;
