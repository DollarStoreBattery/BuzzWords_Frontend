import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { gameName } from "../../lib/constants";
import { colours, fontSizes } from "../../styles/theme";
import IconButton from "./IconButton";

export const Navigation = styled("div")({
  display: "flex",
  height: 40,
  width: "100%",
  backgroundColor: colours["Soft White"],
  top: 0,
  borderBottom: `1px solid darkgray`,
  justifyContent: "center",
  alignItems: "center",
  fontSize: fontSizes.md,
});

export const NavigationInner = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "min(100%,500px)",
});

export const NavIcon = styled("svg")({
  width: 30,
  height: 30,
  ":hover": { filter: "opacity(0.8)" },
});

const NavBar = ({
  toggleInstructions,
}: {
  toggleInstructions: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Navigation>
      <NavigationInner>
        <IconButton>
          <NavIcon
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5a2 2 0 00-2-2m0 16H5V8h14v11m-7-9v2h4v3h-4v2l-4-3.5 4-3.5z" />
          </NavIcon>
        </IconButton>
        <span> {gameName}</span>
        <IconButton onClick={(e) => toggleInstructions(true)}>
          <NavIcon
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
          </NavIcon>
        </IconButton>
      </NavigationInner>
    </Navigation>
  );
};

export default NavBar;
