import React, { useState } from "react";
import styled, { css } from "styled-components";
import Arrow from "@styles/assets/icon/Arrow";


const TreeItem = ({ item, item: { depth }, itemColumn, initCollapsed, selectedItem, setSelectedItem }) => {
  const [collapsed, setCollapsed] = useState(initCollapsed);

  const handleOnCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSelectedMenu = (e, menu) => {
    setSelectedItem(menu);
  };

  const Items = ({ children, menu }) => {
    return (
      <Item
        depth={depth}
        onClick={(e) => {
          handleOnCollapsed();
          handleSelectedMenu(e, menu);
        }}
        menu={menu}
      >{children}
      </Item>
    );
  };

  if (item.childrens.length > 0) {
    return (
      <>
        <Items menu={item}>
          <Arrow color="black" size="1rem" isOpen={collapsed} />
          <IconImage src="https://cdn-icons-png.flaticon.com/512/29/29495.png" />
          {item[itemColumn]}
        </Items>
        <SubItem isOpen={collapsed}>
          {item.childrens.map((child) => (
            <TreeItem
              item={child}
              depth={depth}
              key={child[itemColumn]}
              itemColumn={itemColumn}
              initCollapsed={initCollapsed}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </SubItem>
      </>
    );
  }
  return (
    <Items menu={item}>
      <IconImage src="https://cdn-icons-png.flaticon.com/512/29/29495.png" />
      {item[itemColumn]}
    </Items>
  );
};

const IconImage = styled.img`
  ${() => css`
    width: 15px;
`}`;

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
    div > ::before {
      content:"ㄴ"
    `}
`;


export default TreeItem;
