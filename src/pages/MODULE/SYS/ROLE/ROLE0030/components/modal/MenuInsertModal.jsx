import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import { PUT_UPDATE_MENU, PUT_UPDATE_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import FormInput from "@components/form/FormInput";
import {
  ColumnName, FileInput,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
  TitleWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import { useForm } from "react-hook-form";
import Button from "@components/Button";


const MenuInsertModal = ({ selectedMenu }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };


  const imageInput = useRef();

  const { handleSubmit, control, formState: { errors } } = useForm();

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

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", selectedMenu.menuCode);
    await PUT_UPDATE_MENUICON(formData).then((res) => {
      console.log(res);
    });
  };

  const menuInsertHandler = async (menuUpdateDto) => {
    PUT_UPDATE_MENU(menuUpdateDto).then(() => {
      console.log("test");
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="메뉴 등록"
    >
      <MenuFormWrapper onSubmit={handleSubmit(menuInsertHandler)}>
        <Layout>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                상위메뉴
              </Text>
            </ColumnName>
            <InputWrapper>
              <FormInput
                name="upperMenuNo"
                control={control}
                defaultValue=""
              />
            </InputWrapper>
          </FormItemWrapper>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                메뉴명
              </Text>
            </ColumnName>
            <InputWrapper>
              <FormInput
                name="menuName"
                control={control}
                defaultValue=""
              />
            </InputWrapper>
          </FormItemWrapper>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                사용여부
              </Text>
            </ColumnName>
            <InputWrapper>
              <FormInput
                name="mainFlag"
                control={control}
                defaultValue=""
              />
            </InputWrapper>
          </FormItemWrapper>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                정렬
              </Text>
            </ColumnName>
            <InputWrapper>
              <FormInput
                name="menuOrder"
                control={control}
                defaultValue=""
              />
            </InputWrapper>
          </FormItemWrapper>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                아이콘
              </Text>
            </ColumnName>
            <Image src={image} />
            <FileInput
              type="file"
              onChange={onSaveFile}
              ref={imageInput}
            />
            <Button type="button" onClick={handleOnGetFile}>아이콘 불러오기</Button>
          </FormItemWrapper>
          <MenuButton>메뉴 등록</MenuButton>
        </Layout>
      </MenuFormWrapper>
    </Modal>
  );
};

export default MenuInsertModal;
