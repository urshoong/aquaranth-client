import React, { useContext, useEffect, useState } from "react";
import { Span } from "@components/Grid";
import TreeLayout from "@components/tree/TreeLayout";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { lighten } from "polished";
import Unselected from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Unselected";
import Selected from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Selected";
import useModal from "@hooks/useModal";
import { GET_MENU_LIST, PUT_UPDATE_MENU } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";

const MenuConfigurationComp = () => {
  const [menuList, setMenuList] = useState([]);
  const { selectedMenu, setSelectedMenu } = useContext(SelectMenuContext);

  const { openModal } = useModal();
  const data = { selectedMenu };

  const handleOnIconUpdateModal = () => {
    openModal({ type: "MenuIconUpdate", props: data });
  };

  const handleOnMenuInsertModal = () => {
    openModal({ type: "MenuInsert", props: "" });
  };

  const handleOnMenuDeleteConfirmModal = () => {
    openModal({ type: "MenuDeleteConfirm", props: "" });
  };

  useEffect(() => {
    GET_MENU_LIST().then((res) => {
      setMenuList(res.data);
    });
  }, []);

  const menuUpdateHandler = async (menuUpdateDto) => {
    PUT_UPDATE_MENU(menuUpdateDto).then(() => {
      console.log("test");
    });
  };

  const { handleSubmit, control, formState: { errors } } = useForm();

  return (
    <Layout>
      <MenuTreeLayout>
        <MenuTreeWrapper span="4">
          <div className="">
            메뉴 리스트
          </div>
          <TreeLayout
            apiList={menuList}
            rootValue={null}
            selectedItem={selectedMenu}
            setSelectedItem={setSelectedMenu}
            upperColumn="upperMenuNo"
            matchColumn="menuNo"
            columnName="menuName"
            initCollapsed
          />
        </MenuTreeWrapper>
      </MenuTreeLayout>
      <MenuEditLayout>
        {!selectedMenu ? <Unselected /> : (
          <Selected
            handleOnMenuInsertModal={handleOnMenuInsertModal}
            handleOnIconUpdateModal={handleOnIconUpdateModal}
            handleOnMenuDeleteConfirmModal={handleOnMenuDeleteConfirmModal}
            menuUpdateHandler={menuUpdateHandler}
            handleSubmit={handleSubmit}
            control={control}
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
      min-width: 250px;
    height: 100%;
  `
}
    ;
`;


const MenuEditLayout = styled.div`
  ${() => css`
      width: 100%;
      `
}
;
`;

const MenuTreeWrapper = styled.div`
  ${({ theme }) => {
    return css`
      ${Span}
      border: 1px solid ${lighten(0.1, theme.color.grayA100)};
      border-radius: 0.1rem;
      padding: 1rem;
      height: 100%;
    }
    `;
  }}
`;


export default MenuConfigurationComp;
