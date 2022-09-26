import usePlaySessionStore, {
  BadGuessReasons,
} from "../lib/usePlaySessionStore";

const MIN_GUESS_LENGTH = 4;
const MAX_GUESS_LENGTH = 20;

// needs access to the store to update the error
const handleGuessSubmit = (
  centralLetter: string,
  solutionList: Array<string>
) => {
  const guess = usePlaySessionStore.getState().currentGuess;
  const wordsFound = usePlaySessionStore.getState().wordsFound;

  let badGuess = undefined;
  if (guess.length < MIN_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_SHORT;
  } else if (guess.length > MAX_GUESS_LENGTH) {
    badGuess = BadGuessReasons.TOO_LONG;
  } else if (!guess.includes(centralLetter)) {
    badGuess = BadGuessReasons.MISSING_CENTRE;
  } else if (wordsFound.includes(guess)) {
    badGuess = BadGuessReasons.ALREADY_FOUND;
  } else if (!solutionList.includes(guess)) {
    badGuess = BadGuessReasons.NOT_IN_WORD_LIST;
  }

  if (badGuess) {
    // todo: remove this and come up with an actual error message
    console.error(badGuess);
    usePlaySessionStore.setState({ badGuessReason: badGuess });
  } else {
    usePlaySessionStore.getState().submitGuess();
  }
  usePlaySessionStore.getState().clearGuess();
};

type EnterButtonProps = {
  solutionsList: Array<string>;
  centralLetter: string;
};

// it is dependent on current guess state because it's only enabled once the current guess is at least 4 letters
const EnterButton = ({ solutionsList, centralLetter }: EnterButtonProps) => {
  return (
    <button onClick={(e) => handleGuessSubmit(centralLetter, solutionsList)}>
      Enter
    </button>
  );
};

export default EnterButton;
