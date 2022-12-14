import React, { useEffect, useState } from "react";
import DeptSearch from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptSearch";
import DeptTreeItem from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTreeItem";
import DeptList from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptList";
import {
  DeptGroupSection,
  DeptListDiv, DeptListInnerDiv,
  DeptListTab,
  DeptListTapWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import { getCompanyList } from "@pages/MODULE/SYS/ROLE/ROLE0020/api/UserRole";

function DeptTree({
  clickDept,
  selectDepartment,
  setDeptList,
  deptList,
  setSelectDepartment,
}) {
  /**
   * 회사를 선택하는 상태 관리입니다.
   */
  const [selectCompany, setSelectCompany] = useState(0);

  /**
   * 회사 리스트를 조회하는 상태입니다.
   */
  const [companyList, setCompanyList] = useState([]);

  /**
   * 부서 트리 구조를 보여주거나
   * 검색조건에 맞는 부서 리스트를
   * 보여줍니다.
   */
  const [deptShow, setDeptShow] = useState("tree");

  /**
   * 트리 구조에 버튼을 클릭하면
   * 컴포넌트를 바꿔줍니다.
   */
  const clickDeptShow = (e) => {
    const { target } = e;
    const { value } = target;
    const tabs = target.parentElement?.children;
    Array.prototype.map.call(tabs, (tab) => {
      tab.classList.remove("active");
    });
    target.classList.add("active");
    setDeptShow(value);
  };

  /**
   * 회사리스트를 조회합니다.
   */
  useEffect(() => {
    getCompanyList().then((list) => {
      setCompanyList(list);
    });
  }, []);

  return (
    <DeptListDiv width="400px" border="2">
      <DeptSearch
        companyList={companyList}
        setSelectCompany={setSelectCompany}
        setDeptList={setDeptList}
        setCompanyList={setCompanyList}
        selectCompany={selectCompany}
      />
      <DeptGroupSection className="section2" height="calc(100% - 110px)">
        <DeptListTapWrapper>
          <DeptListTab type="button" className="active" value="tree" onClick={(e) => { clickDeptShow(e); }}>부서 트리 구조</DeptListTab>
          <DeptListTab type="button" value="list" onClick={(e) => { clickDeptShow(e); }}>부서 목록</DeptListTab>
        </DeptListTapWrapper>
        <DeptListInnerDiv>
          {deptShow === "tree" ? (
            <DeptTreeItem
              selectCompany={selectCompany}
              selectDepartment={selectDepartment}
              clickDept={clickDept}
              clickDeptShow={clickDeptShow}
            />
          ) : (
            <DeptList
              setDeptList={setDeptList}
              deptList={deptList}
              clickDept={clickDept}
              selectDepartment={selectDepartment}
              setSelectDepartment={setSelectDepartment}
            />
          )}
        </DeptListInnerDiv>
      </DeptGroupSection>
    </DeptListDiv>
  );
}

export default DeptTree;
