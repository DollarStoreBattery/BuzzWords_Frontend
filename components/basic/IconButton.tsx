import styled from "@emotion/styled";

const IconButton = styled("button")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "none",
  outline: "none",
  border: "none",
  cursor: "pointer",
  ":hover": { filter: "brightness(90%)" },
});

export default IconButton;
