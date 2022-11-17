import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import request from "@utils/axiosUtil";
import LinkTreeLayout from "@components/linktree/LinkTreeLayout";

/**
 * LNB 사이드바 컴포넌트 입니다. GNB 메뉴를 선택하면,
 * API 서버로부터 아이콘과, 모듈 컴포넌트를 반환합니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const LnbSidebar = () => {
  const [menuList, setMenuList] = useState([]);

  const getData = async () => {
    // await request.get("/menu/findundermenu/SYS").then((res) => {
    await request.get("/menu").then((res) => {
      setMenuList(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LnbSidebarWrapper>
      <LinkTreeLayout
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
  ${({ theme }) => css`
    background-color: ${theme.color.white};
    width: ${theme.ui.lnbSidebar};
    height: 100%;
    `}
`;


export default LnbSidebar;
