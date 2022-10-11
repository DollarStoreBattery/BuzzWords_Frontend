import { SolutionAndScore } from "./gameTypes";
import usePlaySessionStore, { BadGuessReasons } from "./usePlaySessionStore";

const MIN_GUESS_LENGTH = 4;
const MAX_GUESS_LENGTH = 20;
// needs access to the store to update the error
export const handleGuessSubmit = (
  centralLetter: string,
  solutionsWithScores: SolutionAndScore
) => {
  const guess = usePlaySessionStore.getState().currentGuess;
  const wordsFound = usePlaySessionStore.getState().wordsFound;

  let badGuess: BadGuessReasons | undefined = undefined;
  if (guess.length < MIN_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_SHORT;
  } else if (guess.length > MAX_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_LONG;
  } else if (!guess.includes(centralLetter)) {
    badGuess = BadGuessReasons.MISSING_CENTRE;
  } else if (wordsFound.includes(guess)) {
    badGuess = BadGuessReasons.ALREADY_FOUND;
  } else if (!Object.keys(solutionsWithScores).includes(guess)) {
    badGuess = BadGuessReasons.NOT_IN_WORD_LIST;
  }
  if (badGuess) {
    usePlaySessionStore.getState().setBadGuessReason(badGuess);
  } else {
    usePlaySessionStore.getState().submitGuess(solutionsWithScores[guess]);
  }
};
