import React from "react";
import DepartmentTreeComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/tree/DepartmentTreeComp";
import {
  DeptListInnerWrapper,
  DeptRegisterModalEmptyDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function DeptTreeItem({
  selectCompany,
  selectDepartment,
  clickDept,
  clickDeptShow,
}) {
  return (
    <DeptListInnerWrapper>
      {(selectCompany && selectCompany !== 0) ? (
        <DepartmentTreeComp
          companyNo={selectCompany}
          selectDepartment={selectDepartment}
          clickDept={clickDept}
          clickDeptShow={clickDeptShow}
        />
      ) : (
        <DeptRegisterModalEmptyDiv>회사를 선택해주세요.</DeptRegisterModalEmptyDiv>
      )}
    </DeptListInnerWrapper>
  );
}

export default DeptTreeItem;

