import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Arrow from "@styles/assets/icon/Arrow";


const SidebarTreeItem = ({ item, item: { depth }, itemColumn, initCollapsed }) => {
  const [collapsed, setCollapsed] = useState(initCollapsed);

  const handleOnCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (item.childrens.length > 0) {
    return (
      <>
        <Item onClick={handleOnCollapsed} depth={depth} itemColumn={itemColumn}>
          <Arrow color="black" size="1rem" isOpen={collapsed} />{item[itemColumn]}
        </Item>
        <SubItem isOpen={collapsed}>
          {item.childrens.map((child) => (
            <SidebarTreeItem
              item={child}
              depth={depth}
              key={child[itemColumn]}
              itemColumn={itemColumn}
              initCollapsed={initCollapsed}
            />
          ))}
        </SubItem>
      </>
    );
  }
  return (
    <SbLink to={`/${item.url}`}>
      <Item depth={depth}>{item[itemColumn]}</Item>
    </SbLink>
  );
};

const Item = styled.div`
  ${({ depth }) => css`
    display: flex;
    align-items: center;
    padding-left: ${depth}rem;
    height: 32px;
    `}
  &:hover {
    background-color: #f6f6f2;
    cursor: pointer;
  }
`;

const SubItem = styled.div`
  ${({ isOpen }) => css`
    overflow: hidden;
    max-height: ${isOpen ? "100%" : "0"};
    div > a > ::before {
      content:"ㄴ"
    `}
`;

export const SbLink = styled(Link)`
`;

export default SidebarTreeItem;
