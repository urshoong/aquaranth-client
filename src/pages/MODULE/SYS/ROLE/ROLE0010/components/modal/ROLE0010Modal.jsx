import React from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider, Span } from "@components/Grid";

const ROLE0010Modal = (props) => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="ROLE0010"
    >
      <CenterGrid>
        <Divider span="12">
          {props.menucode}
        </Divider>
        <Divider span="12">
          {props.menuname}
        </Divider>
      </CenterGrid>
    </Modal>
  );
};

export default ROLE0010Modal;