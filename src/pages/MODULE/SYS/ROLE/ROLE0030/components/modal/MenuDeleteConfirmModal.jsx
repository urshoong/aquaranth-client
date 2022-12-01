import React, {useRef, useState} from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled, {css} from "styled-components";
import {DELETE_MENU, PUT_UPDATE_MENUICON} from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import {FileInput, Image, Layout, MenuButton, Text} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import {CenterGrid, Divider} from "@components/Grid";

const MenuDeleteConfirmModal = ({queryMenu}) => {
  const {closeModal} = useModal();

  const handleCloseModal = () => {
    closeModal();
  };


  const handleOnDelete = async () => {
    await DELETE_MENU(queryMenu.menuCode).then((res) => {
      handleCloseModal()
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${queryMenu?.menuName} 메뉴 아이콘 삭제`}
    >
      <Layout>
        <CenterGrid columns="12">
          <Divider span="12">
            <Image src={queryMenu?.iconUrl}/>
          </Divider>
            <Divider span="12">
              {queryMenu?.menuName}
            </Divider>
          <Divider span="12">
            삭제 하시겠습니까?
          </Divider>

        </CenterGrid>
        <MenuButton onClick={handleOnDelete}>삭제하기</MenuButton>
      </Layout>
    </Modal>
  );
};


export default MenuDeleteConfirmModal;
