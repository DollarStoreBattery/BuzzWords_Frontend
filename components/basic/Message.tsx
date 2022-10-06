import styled from "@emotion/styled";
import { UI_WAITING_TIME } from "../../lib/usePlaySessionStore";
import { fadeInOutSlide } from "../../styles/animations";
import { colours, spacings } from "../../styles/theme";
import { ColourNames } from "../../styles/types";

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
  position: "absolute",
  top: "200px",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  height: "40px",
  fontSize: "1.6rem",
  display: props.isShowing ? "" : "none",
}));

export default Message;
