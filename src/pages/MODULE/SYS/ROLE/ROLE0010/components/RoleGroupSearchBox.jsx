import React, { useState } from "react";
import { Input } from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import { RoleGroupSearchBoxDiv } from "./RoleGroupContainer";

const initState = {
  companyNo: 0,
  roleGroupName: "",
};


function RoleGroupSearchBox({ companyList, onClickSearchBtn }) {
  const [searchParams, setSearchParams] = useState({ ...initState });

  // 검색박스 안에있는 회사정보, 권한그룹명 등 변경 이벤트
  const onChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "roleGroupName" || name === "companyNo") {
      searchParams[name] = value;
    }
    setSearchParams({ ...searchParams });
  };

  return (
    <RoleGroupSearchBoxDiv>
      <select name="companyNo" onChange={(e) => onChangeEvent(e)} value={searchParams.companyNo}>
        <option value="0">회사선택</option>
        {companyList.map(({ companyNo, companyName }) => <option key={companyNo} value={companyNo}>{companyName}</option>)}
      </select>
      <Input placeholder="권한명을 검색하세요" name="roleGroupName" value={searchParams.roleGroupName} type="text" onChange={(e) => onChangeEvent(e)} />
      <Button onClick={() => {
        onClickSearchBtn(searchParams);
        setSearchParams({ ...initState });
      }}
      >검색
      </Button>
    </RoleGroupSearchBoxDiv>
  );
}

export default RoleGroupSearchBox;
