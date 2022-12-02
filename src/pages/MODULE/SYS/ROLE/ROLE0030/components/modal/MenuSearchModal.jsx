import React, {useEffect, useRef, useState} from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import { PUT_UPDATE_MENU, PUT_UPDATE_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
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
import useSearch from "@hooks/useSearch";
import {useSelector} from "react-redux";
import {searchSelector} from "@reducer/searchSlice";


const MenuSearchModal = () => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const {setResult} = useSearch();
  const search = useSelector(searchSelector)

  useEffect(() => {
    setResult("1234");
    console.log(search);
  },[])

  return (
    <Modal
      onClose={handleCloseModal}
      title="메뉴 검색"
    >

      <MenuFormWrapper>

      </MenuFormWrapper>
    </Modal>
  );
};


const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

export default MenuSearchModal;
