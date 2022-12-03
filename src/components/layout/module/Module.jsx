import React, { Children, cloneElement, isValidElement } from "react";
import styled, { css } from "styled-components";
import ModuleTitle from "@components/layout/module/ModuleTitle";

/**
 * 모듈 레이아웃 입니다.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const Module = ({ children }) => {
  return (
    <ModuleWrapper>
      <ModuleTitle />
      <ModuleLayout>
        {children}
      </ModuleLayout>
    </ModuleWrapper>
  );
};

const ModuleLayout = styled.div`
  ${({ theme }) => css`
      width: 100%;
      height: calc(100% - ${theme.ui.moduleTitle});
      left: ${theme.ui.lnbSidebar};
      overflow: scroll;
    `}
`;


const ModuleWrapper = styled.div`
  ${({ theme }) => css`
    width: calc(100% - ${theme.ui.lnbSidebar});
    background-color: ${(props) => props.theme.color.white};
    height: 100%
    `}
`;


export default Module;
