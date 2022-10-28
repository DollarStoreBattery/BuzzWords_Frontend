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
      css={{ height: 40, width: 40, borderRadius: "50%", padding: "0.3em" }}
      onClick={shuffleBoundaryLetters}
    >
      <ShuffleIcon viewBox="0 0 24 24" fill="currentColor">
        <path
          // name: bx-refresh
          d="M10 11H7.101l.001-.009a4.956 4.956 0 01.752-1.787 5.054 5.054 0 012.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 012.018 0 4.978 4.978 0 012.525 1.361l1.416-1.412a7.036 7.036 0 00-2.224-1.501 6.921 6.921 0 00-1.315-.408 7.079 7.079 0 00-2.819 0 6.94 6.94 0 00-1.316.409 7.04 7.04 0 00-3.08 2.534 6.978 6.978 0 00-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 01-2.103 3.138 4.943 4.943 0 01-1.787.752 5.073 5.073 0 01-2.017 0 4.956 4.956 0 01-1.787-.752 5.072 5.072 0 01-.74-.61L7.05 16.95a7.032 7.032 0 002.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 002.818 0 7.031 7.031 0 004.395-2.945 6.974 6.974 0 001.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"
        />
      </ShuffleIcon>
    </GameButton>
  );
};

export default ShuffleButton;
