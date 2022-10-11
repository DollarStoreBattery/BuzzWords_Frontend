import styled from "@emotion/styled";

export const GameElementsDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const GameLayout = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  "@media (max-width: 768px)": {
    flexDirection: "column-reverse",
  },
});
