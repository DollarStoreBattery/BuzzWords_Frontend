import styled from "@emotion/styled";
import { Position } from "../../lib/constants";
import { UI_WAITING_TIME } from "../../lib/usePlaySessionStore";
import { fadeInOutSlide } from "../../styles/animations";
import { colours, spacings } from "../../styles/theme";
import { ColourNames } from "../../styles/types";

type MessageProps = {
  isShowing: boolean;
  fillColour?: ColourNames;
  textColour?: ColourNames;
  position: Position;
};

const messageDimensions = {
  height: 40,
  width: 200,
};
const Message = styled("div")<MessageProps>((props) => ({
  zIndex: 40,
  textAlign: "center",
  padding: spacings.sm,
  margin: spacings.sm,
  // the 33 is hex for 20% transparency
  boxShadow: `0px 5px 20px -0px ${colours["Dark Sienna"]}33`,
  animation: `${fadeInOutSlide} ${UI_WAITING_TIME}ms ease-in`,
  position: "absolute",
  top: props.position.top - messageDimensions.height * 1.2,
  left: props.position.midpoint - messageDimensions.width * 0.5,
  justifyContent: "center",
  alignItems: "center",
  width: messageDimensions.width,
  height: messageDimensions.height,
  fontSize: "1.6rem",
  display: props.isShowing ? "" : "none",
}));

export default Message;
