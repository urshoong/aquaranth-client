import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider } from "@components/Grid";


const LoginModal = ({ selectedMenu }) => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="로그인이 필요합니다."
    >
      <CenterGrid>
        <Divider span="12">
          다시 로그인해 주세요.
        </Divider>
      </CenterGrid>
    </Modal>
  );
};

export default LoginModal;
