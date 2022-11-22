import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid } from "@components/Grid";
import styled from "styled-components";
import request from "@utils/axiosUtil";

const ROLE0030Modal = ({ selectedMenu }) => {
  console.log(selectedMenu);
  const [image, setImage] = useState(null);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const imageInput = useRef();

  const handleOnClickImageUpload = () => {
    imageInput.current?.click();
  };

  const fileList = [];
  console.log(fileList);

  const onSaveFile = (e) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files);
    uploadFiles.find((uploadFile) => {
      fileList.push(uploadFile);
    });
  };

  const onUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    await request.post("/file", formData).then((re) => {
      console.log(re);
    });
  };


  const insertImg = (e) => {
    const readr = new FileReader();
    if (e.target.files[0]) {
      readr.readAsDataURL(e.target.files[0]);
    }

    readr.onloadend = () => {
      const previewImgUrl = readr.result;
      setImage(previewImgUrl);
    };
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${selectedMenu.menuName} 메뉴 아이콘 등록`}
    >
      <CenterGrid>
        {selectedMenu.menuCode}
        {image && <Image src={image} />}
        {/* <input type="file" onChange={onSaveFile} /> */}
        <button type="button" onClick={onUpload}>진짜파일업로드</button>
        <FileInput
          type="file"
          onChange={onSaveFile}
          ref={imageInput}
        />
        <button type="button" onClick={handleOnClickImageUpload}>파일 업로드</button>
      </CenterGrid>
    </Modal>
  );
};

const Image = styled.img`
  max-width: 500px;
`;

const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export default ROLE0030Modal;
