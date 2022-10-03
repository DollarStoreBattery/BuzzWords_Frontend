import { colours, fontSizes } from "../../styles/theme";

import styled from "@emotion/styled";

const PageContainer = styled.div({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 2rem",
  minHeight: "100vh",
  maxWidth: "100vw",
  fontSize: fontSizes.md,
  backgroundColor: colours["Antique White"],
  // background: `linear-gradient(${colours.Gamboge},${colours["Antique White"]})`,
});
export default PageContainer;
