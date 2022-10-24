import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { colours, fontSizes, spacings, fontFamilies } from "../../styles/theme";

export const ModalContainer = styled("dialog")({
  border: "1px solid #80808057",
  backgroundColor: colours["Soft White"],
  height: "95%",
  width: "min(650px,95vw)",
  fontSize: fontSizes.md,
  "::backdrop": {
    background: "rgba(0, 0, 0, 0.4)",
  },
  padding: 0,
});

export const ModalContent = styled("div")({
  padding: spacings.lg,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const ModalCloseButton = styled("button")({
  justifyContent: "space-between",
  alignItems: "center",
  display: "flex",
  cursor: "pointer",
  outline: "none",
  backgroundColor: colours["Gamboge"],
  fontFamily: fontFamilies.Simple,
  height: 40,
  width: "100%",
  position: "sticky",
  top: 0,
  border: "1px solid #80808057",
  "@media (hover:hover)": { ":hover": { filter: "brightness(90%)" } },
});

const CloseIcon = styled("svg")({
  width: 35,
  height: 35,
  color: colours["Dark Sienna"],
});

type ModalProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpened, setIsOpened, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpened) {
      modalRef.current?.removeAttribute("open");

      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpened, modalRef]);

  return (
    <ModalContainer
      ref={modalRef}
      onCancel={(e) => {
        setIsOpened(false);
      }}
    >
      <ModalCloseButton
        onClick={(e) => {
          setIsOpened(false);
        }}
      >
        <>Close</>
        <CloseIcon
          viewBox="0 0 512 512"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
        </CloseIcon>
      </ModalCloseButton>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;
