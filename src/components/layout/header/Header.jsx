import React from "react";
import MainHeader from "@components/layout/header/MainHeader";
import SubHeader from "@components/layout/header/SubHeader";
import styled, { css } from "styled-components";

/**
 * 헤더 레이아웃 입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const Header = ({ setPageTitle, pageTitle }) => {
  return (
    <HeaderWrapper>
      <MainHeader />
      <SubHeader pageTitle={pageTitle} setPageTitle={setPageTitle} />
    </HeaderWrapper>
  );
};


const HeaderWrapper = styled.div`
  ${({ theme }) => css`
      height: ${theme.ui.header};
      overflow: hidden;
      width: 100%;
      `}
`;

export default Header;
