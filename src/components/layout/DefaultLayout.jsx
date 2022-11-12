import React, {Children, cloneElement, isValidElement, useState} from "react";
import GnbSidebar from "@components/layout/sidebar/gnb/GnbSidebar";
import Header from "@components/layout/header/Header";
import styled, { css } from "styled-components";
import Module from "@components/layout/module/Module";
import LnbSidebar from "@components/layout/sidebar/lnb/LnbSidebar";

/**
 * 기본 레이아웃 입니다.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const DefaultLayout = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  return (
    <DefaultLayoutWrapper>
      <GnbSidebar />
      <ContentWrapper>
        <Header pageTitle={pageTitle} setPageTitle={setPageTitle} />
        <Wrapper>
          <LnbSidebar />
          <Module moduleTitle={moduleTitle} setModuleTitle={setModuleTitle}>
            {children}
          </Module>
        </Wrapper>
      </ContentWrapper>
    </DefaultLayoutWrapper>
  );
};

/**
 * 헤더와 모듈을 표시하는 래퍼입니다.
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const ContentWrapper = styled.div`
  ${({ theme }) => css`
      min-width: 1232px;
<<<<<<< HEAD
      background-color: ${(props) => props.theme.color.white};
      width: calc(100% - ${theme.ui.gnbSidebar});
=======
      width: calc(100% - 100px);
>>>>>>> 30b2f361c5f3bf49ef1ed924f7158df2dd197ef1
      height: 100%;
      position: absolute;
      overflow: auto;
      left: ${theme.ui.gnbSidebar};
    `}
`;

const DefaultLayoutWrapper = styled.div`
  ${() => {
    return css`
      width: 100vw;
      height: 100vh;
    `;
  }}
`;

const Wrapper = styled.div`
  ${({ theme }) => {
    return css`
<<<<<<< HEAD
      display: flex;
      height: calc(100% - ${theme.ui.header});
=======
      width: 100vw;
      height: 100vh;
      color: ${white};
>>>>>>> 30b2f361c5f3bf49ef1ed924f7158df2dd197ef1
    `;
  }}
`;

export default DefaultLayout;
