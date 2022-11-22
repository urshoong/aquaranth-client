import React from "react";
import styled, { css } from "styled-components";
import { lighten, rem } from "polished";
import { Link } from "react-router-dom";

/**
 * GNB 사이드바에 사용되는 메뉴 컴포넌트 입니다.
 * 아이콘과, 메뉴명을 표시합니다.
 * @param menuName
 * @param url
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const GnbMenuItem = ({ menu: { menuName, menuPath } }) => {
  return (
    <Link to={`${menuPath}`}>
      <GnbMenuItemWrapper>
        {menuName}
      </GnbMenuItemWrapper>
    </Link>
  );
};

const GnbMenuItemWrapper = styled.div`
  ${({ theme }) => {
    const { color: { sidebar, white } } = theme;
    return css`
    color : ${white};
    padding : ${rem(20)};
      &:hover{background-color: ${lighten(0.1, sidebar)};}
    `;
  }}
`;


export default GnbMenuItem;
