import { fontSizes, spacings } from "../../styles/theme";

import styled from "@emotion/styled";

const PageContainer = styled.div({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  padding: spacings.md,
  height: "100%",
  maxWidth: "100vw",
  fontSize: fontSizes.md,
  justifyContent: "flex-start",
});
export default PageContainer;
