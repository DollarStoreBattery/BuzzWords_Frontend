import styled from "@emotion/styled";
import usePlaySessionStore, {
  UI_WAITING_TIME,
} from "../lib/usePlaySessionStore";
import { horizontalRock } from "../styles/animations";
import TextElement from "./basic/TextElement";

const PraiseElement = styled(TextElement)({
  animation: `${horizontalRock} ${UI_WAITING_TIME}ms ease`,
});

const PraiseMessage = () => {
  const showPraise = usePlaySessionStore((state) => state.activeSuccess);

  const praiseMsg = showPraise ? (
    <PraiseElement size="sm">{"Good Job!"}</PraiseElement>
  ) : (
    <></>
  );
  return praiseMsg;
};

export default PraiseMessage;
