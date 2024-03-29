import React, { useContext, useEffect, useState } from "react";
import { Span } from "@components/Grid";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import Unselected from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Unselected";
import Selected from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Selected";
import useModal from "@hooks/useModal";
import { GET_CONFIG_TREE_MENULIST, PUT_CONFIG_MENU } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import MenuTreeComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/tree/MenuTreeComp";
import Swal from "sweetalert2";
import {
  Button,
  InnerInformationIcon, InnerInformationInnerSpan,
  InnerInformationInnerWrapper, InnerInformationWrap,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const MenuConfigurationComp = () => {
  const { selectedMenu, setMenuList, setSelectedMenu, setQueryMenu, queryMenu } = useContext(SelectMenuContext);

  const { openModal } = useModal();
  const data = { queryMenu };

  const handleOnIconUpdateModal = () => {
    openModal({ type: "MenuIconUpdate", props: data });
  };

  const handleOnMenuInsertModal = () => {
    openModal({ type: "MenuInsert", props: "" });
  };

  const handleOnMenuDeleteConfirmModal = () => {
    openModal({ type: "MenuDeleteConfirm", props: data });
  };

  useEffect(() => {
    GET_CONFIG_TREE_MENULIST(false, "gnb").then((res) => {
      setMenuList(res.data);
    });
  }, []);

  const handleOnUpdateMenu = async (menuUpdateDto) => {
    PUT_CONFIG_MENU(menuUpdateDto)
      .then(() => {
        Swal.fire({
          title: "메뉴 수정",
          html: "메뉴가 수정되었습니다.",
          icon: "success",
        });
      });
  };

  return (
    <Layout>
      <MenuTreeLayout>
        <MenuTreeWrapper>
          <MenuTreeComp />
        </MenuTreeWrapper>
        <MenuTreeRegisterBtn type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</MenuTreeRegisterBtn>
      </MenuTreeLayout>
      <MenuEditLayout>
        {/* <Button type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</Button> */}
        {!selectedMenu ? (
          <Unselected
            handleOnMenuInsertModal={handleOnMenuInsertModal}
          />
        ) : (
          <Selected
            handleOnMenuInsertModal={handleOnMenuInsertModal}
            handleOnIconUpdateModal={handleOnIconUpdateModal}
            handleOnMenuDeleteConfirmModal={handleOnMenuDeleteConfirmModal}
            handleOnUpdateMenu={handleOnUpdateMenu}
          />
        )}
      </MenuEditLayout>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MenuTreeLayout = styled.div`
  ${() => css`
    width: 400px;
    height: 100%;
  `
}
    ;
`;


const MenuEditLayout = styled.div`
  ${() => css`
    width: calc(100% - 400px);
  `
}
;
`;

const MenuTreeWrapper = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      //border: 1px solid ${lighten(0.1, theme.color.grayA100)};
      border: 2px solid ${theme.color.gray350};
      border-radius: 0.1rem;
      padding: 1rem;
      height: calc(100% - 60px);
      overflow: auto;
    }
    `;
  }}
`;

const MenuTreeRegisterBtn = styled(Button)`
  width: 100%;
  height: 60px;
`;


export default MenuConfigurationComp;
