import React from "react";
import { MenuRoleListDiv } from "./MenuRoleContainer";

function MenuRoleList({ lnbList }) {

  console.log(lnbList === true);
  return (
    <MenuRoleListDiv>
      메뉴리스트
    </MenuRoleListDiv>
  );
}

export default MenuRoleList;
