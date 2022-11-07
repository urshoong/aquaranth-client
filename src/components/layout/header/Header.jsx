import React from "react";
import styled, { css } from "styled-components";
import { rem } from "polished";
import MainHeader from "@components/layout/header/MainHeader";
import SubHeader from "@components/layout/header/SubHeader";

const Header = () => {
  return (
    <HeaderWrapper>
      <MainHeader />
      <SubHeader />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  ${() => css`
      padding: ${rem(10)};
      background-color: ${(props) => props.theme.color.white};
      color: ${(props) => props.theme.color.douzone500};
      width: 100%;
      `}
`;

export default Header;
