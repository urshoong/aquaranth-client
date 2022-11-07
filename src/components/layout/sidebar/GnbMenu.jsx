import React from "react";
import styled, { css } from "styled-components";
import { lighten, rem } from "polished";
import { Link } from "react-router-dom";


const GnbMenu = ({ menu, menuIcon }) => (
  <MenuWrapper>
    <Link to={menu}>{menu.menuName}</Link>
  </MenuWrapper>
);

const MenuWrapper = styled.div`
  ${({ theme }) => {
    const { color: { sidebar, white } } = theme;
    return css`
    color : ${white};
    padding : ${rem(20)};
      &:hover{background-color: ${lighten(0.3, sidebar)};}
    `;
  }}
`;


export default GnbMenu;
