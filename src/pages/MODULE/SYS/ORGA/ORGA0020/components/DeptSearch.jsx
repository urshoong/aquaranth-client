import React, { useState } from "react";
import { searchDept } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";
import {
  GroupSection,
  Option,
  RoleGroupCompanySelectWrap,
  RoleGroupSearchWrap,
  SearchBtn,
  SearchInput,
  Select,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function DeptSearch({
  companyList,
  setSelectCompany,
  setDeptList,
  selectCompany,
}) {
  /**
   * 검색어를 담을 상태값입니다.
   */
  const [deptSearch, setDeptSearch] = useState("");

  /**
   * 부서번호와 부서이름을 반아올
   * handler입니다.
   */
  const changeDeptSearch = (e) => {
    const { value } = e.target;

    setDeptSearch(value);
  };

  /**
   * 검색결과를 받아올
   * handler입니다.
   */
  const deptListBySearch = () => {
    searchDept(deptSearch, selectCompany).then((list) => {
      Swal.fire("검색 완료", `${list.length}건 검색`, "success").then(() => {
        setDeptList(list);
      });
    });
  };

  return (
    <GroupSection className="header" height="110px">
      <RoleGroupCompanySelectWrap>
        <Select
          name="company"
          className="secondTwoSelect"
          onChange={(e) => {
            setSelectCompany(e.target.value);
          }}
        >
          <Option value="">회사선택</Option>
          {companyList.map((item) => (
            <Option key={item.companyNo} value={item.companyNo}>{item.companyName}</Option>
          ))}
        </Select>
      </RoleGroupCompanySelectWrap>
      <RoleGroupSearchWrap>
        <SearchInput type="text" width="87%" placeholder="부서번호/부서명으로 검색" onChange={(e) => { changeDeptSearch(e); }} />
        <SearchBtn type="submit" width="12%" onClick={() => { deptListBySearch(deptSearch, selectCompany); }}>🔍</SearchBtn>
      </RoleGroupSearchWrap>
    </GroupSection>
  );
}

export default DeptSearch;
