import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { colours } from "../styles/theme";
import GameButton from "./basic/GameButton";

const ShuffleIcon = styled("svg")({
  color: colours.Rust,
  height: 35,
  width: 35,
});

const ShuffleButton = () => {
  const shuffleBoundaryLetters = usePlaySessionStore(
    (state) => state.shuffleBoundaryLetters
  );
  return (
    <GameButton
      name="Shuffle Letters"
      aria-label="Shuffle"
      css={{ height: 40, width: 40, borderRadius: "50%" }}
      onClick={shuffleBoundaryLetters}
    >
      <ShuffleIcon>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1 0-1.97-.25-2.8-.7l-1.46 1.46A7.93 7.93 0 0012 20c4.42 0 8-3.58 8-8h3M6 12c0-3.31 2.69-6 6-6 1 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0012 4c-4.42 0-8 3.58-8 8H1l4 4 4-4m5 0c0 1.11-.89 2-2 2s-2-.89-2-2 .9-2 2-2 2 .9 2 2z"
          />
        </svg>
      </ShuffleIcon>
    </GameButton>
  );
};

export default ShuffleButton;
