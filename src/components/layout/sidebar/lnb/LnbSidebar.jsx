import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GET_MENULIST } from "@api/commonApi";
import MenuTreeItem from "@pages/MODULE/SYS/ROLE/ROLE0030/components/tree/MenuTreeItem";

/**
 * LNB 사이드바 컴포넌트 입니다. GNB 메뉴를 선택하면,
 * API 서버로부터 아이콘과, 모듈 컴포넌트를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const LnbSidebar = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();


  useEffect(() => {
    GET_MENULIST(1, "").then((res) => {
      setMenuList(res.data);
    });
  }, []);

  return (
    <LnbSidebarWrapper>
      {menuList.map((menu) => {
        return (
          <MenuTreeItem
            key={menu.menuNo}
            subMenuItem={menu}
            menuList={[menuList]}
            setSelectedMenu={setSelectedMenu}
          />
        );
      })}
    </LnbSidebarWrapper>
  );
};


const LnbSidebarWrapper = styled.div`
  ${({ theme }) => {
    const { white, gray300 } = theme.color;
    return css`
      background-color: ${white};
      border: 1px solid ${gray300};
      width: ${theme.ui.lnbSidebar};
      height: 100%;
    `;
  }}
`;


export default LnbSidebar;
