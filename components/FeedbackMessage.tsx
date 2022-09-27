import usePlaySessionStore from "../lib/usePlaySessionStore";

import Message from "./basic/Message";

const FeedbackMessage = () => {
  const showPraise = usePlaySessionStore((state) => state.activeSuccess);
  const showError = usePlaySessionStore((state) => state.activeError);

  const errorMessage = usePlaySessionStore((state) => state.badGuessReason);

  if (showPraise) {
    return (
      <Message key={`error_${showPraise}`} isShowing={showPraise}>
        {"Good Job!"}
      </Message>
    );
  } else {
    return (
      <Message key={`error_${showError}`} isShowing={showError} size="sm">
        {errorMessage}
      </Message>
    );
  }
};

export default FeedbackMessage;
