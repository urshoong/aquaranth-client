import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider } from "@components/Grid";


const LoginModal = ({ body }) => {
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
          {body.code}
          {body.detailErrorCode}
          {body.error}
          {body.message}
          {body.status}
        </Divider>
      </CenterGrid>
    </Modal>
  );
};

export default LoginModal;
