import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import styled, { css } from "styled-components";
import GnbMenuItem from "@components/layout/sidebar/gnb/GnbMenuItem";
import { GET_ROUTES } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";

/**
 * GNB 사이드바 컴포넌트 입니다.
 * 컴포넌트를 로드하면, API 서버로부터
 * 아이콘과, URL이 담긴 메뉴를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const GnbSidebar = () => {
  const [gnbMenuList, setGnbMenuList] = useState([]);
  useEffect(() => {
    GET_ROUTES().then((res) => {
      setGnbMenuList(res.data);
    });
  }, []);

  return (
    <GnBSidebarWrapper>
      {gnbMenuList.map((menu) => <GnbMenuItem key={menu.menuNo} menu={menu} />)}
    </GnBSidebarWrapper>
  );
};

/**
 * GnB 사이드바 레이아웃 입니다.
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const GnBSidebarWrapper = styled.div`
  ${({ theme }) => css`
      background-color: ${theme.color.sidebar};
      position: fixed;
      width: ${theme.ui.gnbSidebar};
      height: 100vh;
      z-index: 9999;`}
`;


export default GnbSidebar;
