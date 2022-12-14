import { css } from "@emotion/react";

export const globalStyles = css`
  html {
    font-size: 62.5%;
  }
  ,
  body {
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Patua One";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fbefda;
  }
  * {
    box-sizing: border-box;
  }
  *:focus {
    outline-style: solid;
    outline-offset: -1px;
  }
`;
