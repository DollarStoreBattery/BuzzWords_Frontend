import styled from "@emotion/styled";
import { colours, fontSizes } from "../../styles/theme";

const GameButton = styled("button")({
  outline: "none",
  fontFamily: "Oxygen",
  backgroundColor: colours["Soft White"],
  color: colours["Dark Sienna"],
  width: "40vw",
  maxWidth: 200,
  height: 40,
  borderRadius: "10px",
  border: "1px solid #80808057",
  cursor: "pointer",
  "@media (hover:hover)": { ":hover": { filter: "brightness(90%)" } },
  fontSize: fontSizes.sm,
  margin: "0 2%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.08s ease-in-out",
  ":active": {
    transform: `scale(0.9)`,
  },
});

export default GameButton;
