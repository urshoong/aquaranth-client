import React from "react";
import styled, { css } from "styled-components";


const LnbSidebar = () => {
  return (
    <LnbSidebarWrapper>
      LnbSidebar
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
