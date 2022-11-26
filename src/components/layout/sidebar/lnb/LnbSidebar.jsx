import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import request from "@utils/axiosUtil";
import SidebarTreeLayout from "@components/layout/sidebar/lnb/sidebartree/SidebarTreeLayout";
import { GET_MENU_LIST, GET_ROUTES } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";

/**
 * LNB 사이드바 컴포넌트 입니다. GNB 메뉴를 선택하면,
 * API 서버로부터 아이콘과, 모듈 컴포넌트를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const LnbSidebar = () => {
  const [menuList, setMenuList] = useState([]);


  useEffect(() => {
    GET_MENU_LIST("ORGA", "lnb").then((res) => {
      setMenuList(res.data);
    });
  }, []);

  return (
    <LnbSidebarWrapper>
      <SidebarTreeLayout
        apiList={menuList}
        rootValue={null}
        upperColumn="upperMenuNo"
        matchColumn="menuNo"
        columnName="menuName"
        initCollapsed
      />
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
