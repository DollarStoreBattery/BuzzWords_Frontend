import { css } from "@emotion/react";

export const globalStyles = css`
  @font-face {
    font-family: "Patua One";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/patuaone/v16/ZXuke1cDvLCKLDcimxB44_lu.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  html {
    font-size: 62.5%;
  }
  ,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Patua One";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
  }
  *:focus {
    outline-style: solid;
    outline-offset: -1px;
  }
`;
