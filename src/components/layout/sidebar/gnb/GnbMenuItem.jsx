import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
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
const GnbMenuItem = ({ menu: { menuName, menuPath, iconUrl }, visible }) => {
  return (
    <Link to={`${menuPath}`}>
      <GnbMenuItemWrapper>
        <Icon src={iconUrl} />
        <Menuname visible={visible}>
          {menuName}
        </Menuname>
      </GnbMenuItemWrapper>
    </Link>
  );
};

const GnbMenuItemWrapper = styled.div`
  ${({ theme }) => {
    const { color: { sidebar, white }, ui } = theme;
    return css`
      display: flex;
      align-items: center;
      overflow: hidden;
      color: ${darken(0.5, white)};
      width: calc(${ui.gnbSidebar} + ${ui.gnbSidebarOpen});
      padding: calc(${theme.ui.gnbSidebar} / 4);
      transition: 0.1s;
      &:hover {
        background-color: ${darken(0.1, sidebar)};
        color: ${white};
      }
    `;
  }}
`;

const Icon = styled.img.attrs({
  alt: "메뉴 아이콘",
})`
  ${({ theme }) => css`
    width: calc(${theme.ui.gnbSidebar} / 2)
  `}
`;

const Menuname = styled.div`
  ${({ theme, visible }) => {
    return css`
      padding-left: 0.5rem;
      ${theme.typo.subtitle1}
      content-visibility: ${visible ? "visible" : "hidden"};
    `;
  }}
`;


export default GnbMenuItem;
