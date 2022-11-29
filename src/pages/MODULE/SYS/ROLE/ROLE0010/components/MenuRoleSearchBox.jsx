import React, { useState } from "react";
import { Input } from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import { MenuRoleSearchBoxDiv } from "./MenuRoleContainer";

// TODO: 메뉴단건 검색이 트리구조와 얽혀서 생기는 문제가 꽤나 복잡해 보이므로, 메뉴검색기능은 삭제할 예정.
function MenuRoleSearchBox({ gnbList, onChangeSelectBox, selectValue, setSelectValue, onClickSearchBtn }) {
  // const [searchMenuName, setSearchMenuName] = useState("");

  return (
    <MenuRoleSearchBoxDiv>
      <select onChange={(e) => { onChangeSelectBox(e); setSelectValue(e.target.value); }} value={selectValue}>
        <option value="default">메뉴선택</option>
        {gnbList.map(({ menuNo, menuName, menuCode }) => <option key={menuNo} value={menuCode}>{menuName}</option>)}
      </select>
      {/* <Input placeholder="메뉴명을 검색하세요" type="text" value={searchMenuName} onChange={(e) => setSearchMenuName(e.target.value)} /> */}
      {/* <Button onClick={() => onClickSearchBtn(searchMenuName)}>검색</Button> */}
    </MenuRoleSearchBoxDiv>
  );
}

export default MenuRoleSearchBox;
