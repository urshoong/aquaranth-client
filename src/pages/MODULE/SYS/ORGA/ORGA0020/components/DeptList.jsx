import React from "react";
import {
  DeptListItemDetailDiv,
  DeptListItemDiv,
  DeptUseItemDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import { handleSelectDepartment } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";

function DeptList({ deptList, selectDepartment, setSelectDepartment }) {
  /**
   * 부서 리스트에서 클릭하면
   * 부서 상세정보를 조회합니다
   * @param deptNo
   * */

  const clickListDept = (deptNo) => {
    handleSelectDepartment(deptNo).then((data) => {
      setSelectDepartment(data);
    });
  };

  return (
    <>
      {deptList.map(({ deptNo, deptName, path, mainFlag }) => (
        <DeptListItemDiv key={deptNo} className={selectDepartment.deptNo === deptNo ? "active" : ""} onClick={() => clickListDept(deptNo)}>
          <DeptListItemDetailDiv>{deptNo}</DeptListItemDetailDiv>
          <DeptListItemDetailDiv>{deptName}</DeptListItemDetailDiv>
          <DeptListItemDetailDiv>
            <DeptUseItemDiv mainFlag={mainFlag}>{ mainFlag ? "사용" : "미사용" }</DeptUseItemDiv>
          </DeptListItemDetailDiv>
          <DeptListItemDetailDiv>소속 : {path}</DeptListItemDetailDiv>
        </DeptListItemDiv>
      ))}
    </>
  );
}

export default DeptList;
