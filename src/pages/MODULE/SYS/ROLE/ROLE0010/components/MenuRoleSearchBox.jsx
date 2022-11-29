import React, { useState } from "react";
import { Input } from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import { MenuRoleSearchBoxDiv } from "./MenuRoleContainer";

function MenuRoleSearchBox({ gnbList, onChangeSelectBox, selectValue, setSelectValue }) {

  return (
    <MenuRoleSearchBoxDiv>
      <select onChange={(e) => { onChangeSelectBox(e); setSelectValue(e.target.value); }} value={selectValue}>
        <option value="default">메뉴선택</option>
        {gnbList.map(({ menuNo, menuName, menuCode }) => <option key={menuNo} value={menuCode}>{menuName}</option>)}
      </select>
      {/* TODO: 메뉴단건 검색이 트리구조와 얽혀서 생기는 문제가 꽤나 복잡해 보이므로, 메뉴검색기능은 삭제할 예정. */}
      {/* <Input placeholder="메뉴명을 검색하세요" type="text" value={searchMenuName} onChange={(e) => setSearchMenuName(e.target.value)} /> */}
      {/* <Button onClick={() => onClickSearchBtn(searchMenuName)}>검색</Button> */}
    </MenuRoleSearchBoxDiv>
  );
}

export default MenuRoleSearchBox;
