import usePlaySessionStore from "./usePlaySessionStore";

const setBoundaryLetters = (
  puzzleLetters: Array<string>,
  centralLetter: string
) => {
  const setLetterSort = usePlaySessionStore.getState().setBoundaryLetters;
  setLetterSort(puzzleLetters.filter((letter) => letter != centralLetter));
};

export default setBoundaryLetters;
