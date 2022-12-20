import React from "react";
import {
  MenuRoleItemDiv,
  MenuRoleItemInput,
  MenuRoleItemSpan,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";

function MenuRoleItem({ menu, onChangeCheckBox }) {
  const { menuName, checked, menuNo, depth, upperMenuNo } = menu;
  return (
    <MenuRoleItemDiv depth={depth}>
      <MenuRoleItemInput type="checkbox" value={menuNo} onChange={(e) => onChangeCheckBox(e)} checked={checked} />
      <MenuRoleItemSpan>{menuName}</MenuRoleItemSpan>
    </MenuRoleItemDiv>
  );
}

export default MenuRoleItem;
