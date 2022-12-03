import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import { PUT_CONFIG_MENU, PUT_CONFIG_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import FormInput from "@components/form/FormInput";
import {
  ColumnName,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
  TitleWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import {Input} from "@components/Input";


const MenuInsertModal = ({ selectedMenu }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState();
  const { openModal, closeModal } = useModal();

  const handleOnMenuSearchModal = () => {
    openModal({ type: "MenuSearch", props: "" });
  };

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

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", selectedMenu.menuCode);
    await PUT_CONFIG_MENUICON(formData).then((res) => {
      console.log(res);
    });
  };

  const menuInsertHandler = async (menuUpdateDto) => {
    PUT_CONFIG_MENU(menuUpdateDto).then(() => {
      console.log("test");
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const origin = { ...menu };
    origin[name] = value;
    setMenu(origin);
    console.log(menu)
  };

  const handleOnCheckbox = (e) => {
    const { name, checked } = e.target;
    const origin = { ...menu };
    origin[name] = checked;
    setMenu(origin);
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="메뉴 등록"
    >

      <MenuFormWrapper>
        <Layout>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                상위메뉴
              </Text>
            </ColumnName>
            <InputWrapper>
              <Input
                name="upperMenuNo"
                value={menu?.upperMenuNo}
                hidden
              />
              {menu?.upperMenuName}
              <button type="button" onClick={handleOnMenuSearchModal}>검색하기</button>
            </InputWrapper>
          </FormItemWrapper>
          <FormItemWrapper>
            <ColumnName>
              <Text>
                메뉴명
              </Text>
            </ColumnName>
            <InputWrapper>
              <Input
                name="menuName"
                value={menu?.menuName}
                onKeyPress={(e) => {
                  e.preventDefault();
                  handleOnChange(e)
                }}
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
              <Input
                type="checkbox"
                name="mainFlag"
                value={menu?.mainFlag}
                checked={menu?.mainFlag}
                onChange={handleOnCheckbox}
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
              <Input
                name="menuOrder"
                value={menu?.menuOrder}
                onKeyPress={(e) => {
                  e.preventDefault();
                  handleOnChange(e)
                }}
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


const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export default MenuInsertModal;
