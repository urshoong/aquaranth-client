import React from "react";
import { Input } from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import { MenuRoleSearchBoxDiv } from "./MenuRoleContainer";

function MenuRoleSearchBox({ gnbList, onChangeSelectBox }) {
  return (
    <MenuRoleSearchBoxDiv>
      <select onChange={(e) => onChangeSelectBox(e)}>
        <option>메뉴선택</option>
        {gnbList.map(({ menuNo, menuName, menuCode }) => <option key={menuNo} value={menuCode}>{menuName}</option>)}
      </select>
      <Input placeholder="메뉴명을 검색하세요" type="text" />
      <Button>검색</Button>
    </MenuRoleSearchBoxDiv>
  );
}

export default MenuRoleSearchBox;
