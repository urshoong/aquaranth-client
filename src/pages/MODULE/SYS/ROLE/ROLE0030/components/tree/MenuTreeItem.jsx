import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import Arrow from "@styles/assets/icon/Arrow";
import { GET_MENULIST } from "@api/commonApi";

const MenuTreeItem = ({ subMenuItem, menuList, setSelectedMenu }) => {
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
            <Icon src={subMenuItem.iconUrl} alt="" />
            <MenuName onClick={() => setSelectedMenu(subMenuItem.menuCode)}>{subMenuItem.menuName}</MenuName>
          </MenuItem>


          { subMenu ? subMenu.map((menu) => (
            <MenuTreeItem
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
    border: 1px solid black;
  `}
`;

const MenuItemWrapper = styled.div`
  ${({ depth }) => css`
    padding-left: ${depth / 2}rem;
  `}
`;

const MenuItem = styled.div`
  ${() => css`
    display: flex;
  `}
`;

const Icon = styled.img`
  ${() => css`
    width: 10px;
    height: 10px;
    
  `}
`;

const MenuName = styled.div`
`;


const CollapseButton = styled.button`
  ${({ theme, depth }) => css`
    font-size: 1rem;
    height: 1rem;
    color: #46a3fb;
  `}
`;

export default MenuTreeItem;
