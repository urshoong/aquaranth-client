import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid } from "@components/Grid";
import styled, {css} from "styled-components";
import { PUT_UPDATE_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import { FileInput, Image, Layout, MenuButton } from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";

const MenuIconUpdateModal = ({ selectedMenu }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const imageInput = useRef();

  const handleOnGetFile = () => {
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

  const handleOnUpload = async () => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", selectedMenu?.menuCode);
    await PUT_UPDATE_MENUICON(formData).then((res) => {
      console.log(res);
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${selectedMenu?.menuName} 메뉴 아이콘 수정`}
    >
      <Layout>
        <IconUploadLayout className="">
          <IconWrapper className="">
            <div className="">현재 아이콘</div>
            <Image src={selectedMenu?.iconUrl} alt="이전 메뉴 아이콘" />
          </IconWrapper>
          <IconWrapper className="">
            <div className="">수정할 아이콘</div>
            <Image src={image} alt="수정할 메뉴 아이콘" />
          </IconWrapper>
        </IconUploadLayout>
        <FileInput
          type="file"
          onChange={onSaveFile}
          ref={imageInput}
        />
        <IconUploadLayout className="">
          <MenuButton type="button" onClick={handleOnGetFile}>파일 가져오기</MenuButton>
        </IconUploadLayout>
        <button type="button" onClick={handleOnUpload}>아이콘 등록하기</button>
        <MenuButton>수정하기</MenuButton>
      </Layout>
    </Modal>
  );
};

const IconUploadLayout = styled.div`
  ${({}) => css`
    display: flex;
  `}
`

const IconWrapper = styled.div`
  width: 100%;
`


export default MenuIconUpdateModal;
