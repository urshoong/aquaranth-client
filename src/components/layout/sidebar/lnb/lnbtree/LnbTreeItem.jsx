import React, { useState } from "react";
import styled, { css } from "styled-components";
import Arrow from "@styles/assets/icon/Arrow";
import { GET_MENULIST } from "@api/commonApi";

const LnbTreeItem = ({ subMenuItem, menuList, setSelectedMenu }) => {
  const [subMenu, setSubMenu] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = (menuNo) => {
    if (collapse) {
      setCollapse(false);
      setSubMenu([]);
    }
    if (!collapse) {
      setCollapse(true);
      GET_MENULIST(menuNo).then((res) => {
        setSubMenu(res.data);
      });
    }
  };

  return (
    <MenuTreeWrapper>
      {menuList.map(() => (
        <MenuItemWrapper
          key={subMenuItem.menuNo}
          depth={subMenuItem.depth}
        >
          <MenuItem>
            {subMenuItem.subMenuCount ? (
              <CollapseButton
                onClick={() => {
                  handleCollapse(subMenuItem.menuNo);
                }}
              >
                <Arrow color="black" size="1rem" isOpen={collapse} />
              </CollapseButton>
            ) : ""}
            <Wrapper>
              <IconWrapper>
                <Icon src={subMenuItem.iconUrl} alt="메뉴 아이콘" />
              </IconWrapper>
              <MenuName onClick={() => setSelectedMenu(subMenuItem)}>{subMenuItem.menuName}</MenuName>
            </Wrapper>
          </MenuItem>

          {subMenu ? subMenu.map((menu) => (
            <LnbTreeItem
              subMenuItem={menu}
              key={menu.menuNo}
              menuList={[subMenuItem]}
              setSelectedMenu={setSelectedMenu}
            />
          )) : ""}
        </MenuItemWrapper>
      ))}
    </MenuTreeWrapper>
  );
};

const MenuTreeWrapper = styled.div`
  ${() => css`
    padding: 0.5rem;
  `}
`;

const MenuItemWrapper = styled.div`
  ${({ depth }) => css`
    padding-left: ${depth / 2.5}rem;

  `}
`;

const MenuItem = styled.div`
  ${() => css`
    display: flex;
  `}
`;

const IconWrapper = styled.div`
  ${() => css`
    width: 1.5rem;
  `}
`;

const Icon = styled.img`
  ${() => css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;

const MenuName = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;


const CollapseButton = styled.button`
  ${({ theme, depth }) => css`
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;

const Wrapper = styled.div`
  ${({}) => css`
    display: flex;
  `}
`;

export default LnbTreeItem;
