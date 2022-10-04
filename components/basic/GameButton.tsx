import styled from "@emotion/styled";
import { colours, fontSizes } from "../../styles/theme";

const GameButton = styled("button")({
  fontFamily: "Oxygen",
  backgroundColor: colours["Soft White"],
  color: colours["Dark Sienna"],
  width: "40vw",
  maxWidth: 200,
  height: 40,
  borderRadius: "10px",
  outline: "none",
  border: "1px solid #80808057",
  cursor: "pointer",
  ":hover": { filter: "brightness(90%)" },
  fontSize: fontSizes.sm,
  margin: "0 2%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default GameButton;
