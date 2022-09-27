import styled from "@emotion/styled";
import usePlaySessionStore from "../lib/usePlaySessionStore";
import { pulse } from "../styles/animations";
import TextElement from "./basic/TextElement";

const PraiseElement = styled(TextElement)({
  animation: `${pulse} 1100ms ease`,
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
