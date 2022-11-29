import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid } from "@components/Grid";
import styled from "styled-components";
import { PUT_UPDATE_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0031/api/menu";
import axios from "axios";


const ROLE0030Modal = ({ selectedMenu }) => {
  console.log(selectedMenu);
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const imageInput = useRef();

  const handleOnClickImageUpload = () => {
    imageInput.current?.click();
  };

  const onSaveFile = (e) => {
    const fileReader = new FileReader();
    const onloadFile = e.target.files[0];
    setFile(onloadFile);
    fileReader.readAsDataURL(onloadFile);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", selectedMenu.menuCode);
    await PUT_UPDATE_MENUICON(formData).then((res) => {
      console.log(res);
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${selectedMenu.menuName} 메뉴 아이콘 등록`}
    >
      <CenterGrid>
        <img src={selectedMenu.iconUrl} />
        {image && <Image src={image} />}
        <button type="button" onClick={onUpload}>아이콘 등록하기</button>
        <FileInput
          type="file"
          onChange={onSaveFile}
          ref={imageInput}
        />
        <button type="button" onClick={handleOnClickImageUpload}>파일 가져오기</button>
      </CenterGrid>
    </Modal>
  );
};

const Image = styled.img`
  max-width: 200px;
`;

const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export default ROLE0030Modal;
