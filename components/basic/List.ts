import styled from "@emotion/styled";
import { fontFamilies, fontSizes } from "../../styles/theme";

export const StyledList = styled("ul")({
  paddingLeft: 10,
  alignSelf: "flex-start",
  listStylePosition: "inside",
  fontSize: fontSizes.sm,
  fontFamily: fontFamilies.Simple,
});

export const StyledListItem = styled("li")({});
