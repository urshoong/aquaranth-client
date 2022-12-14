import React, { useState } from "react";
import DeptTree from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTree";
import DeptInformation from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptInformation";
import { handleSelectDepartment } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import { DeptMainDiv } from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function DeptMain() {
  /**
   * 부서정보를 수정,조회 할 때 사용하는 상태입니다.
   */
  const [selectDepartment, setSelectDepartment] = useState({});

  /**
   * 부서들의 리스트를 관리하는 상태입니다.
   */
  const [deptList, setDeptList] = useState([]);


  /**
   * 모달창에서 트리구조를 선택할 때
   * 해당 부서의 필요한 정보를 조회합니다.
   * @param cNo
   * @param upperDNo
   */

  const clickDept = (companyNo, deptNo) => {
    handleSelectDepartment(deptNo).then((result) => {
      setSelectDepartment(result);
    });
  };

  /**
   * boolean 으로 변화할 함수입니다.
   */
  const changeBoolean = (value) => {
    let booleanValue = true;
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "false") {
        booleanValue = false;
      }
    }
    return booleanValue;
  };

  /**
   * 수정 버튼을 클릭하면 변경된 내용에 맞게 변경해줍니다.
   * @param e
   */
  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "mainFlag") {
      selectDepartment[name] = changeBoolean(value);
    } else {
      selectDepartment[name] = value;
    }
    setSelectDepartment({ ...selectDepartment });
  };

  return (
    <DeptMainDiv>
      <DeptTree
        clickDept={clickDept}
        selectDepartment={selectDepartment}
        deptList={deptList}
        setDeptList={setDeptList}
        setSelectDepartment={setSelectDepartment}
      />
      <DeptInformation
        selectDepartment={selectDepartment}
        setSelectDepartment={setSelectDepartment}
        inputChangeHandler={inputChangeHandler}
        clickDept={clickDept}
      />
    </DeptMainDiv>
  );
}

export default DeptMain;
