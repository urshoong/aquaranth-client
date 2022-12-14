import React, { useEffect, useState } from "react";
import {
  registerDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";
import {
  DeptRegisterModalInfoBody, DeptRegisterModalInfoBtn,
  DeptRegisterModalInfoHeader, DeptRegisterModalInfoInput,
  DeptRegisterModalInfoWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const initState = {
  deptName: "",
  deptDesc: "",
  upperDeptNo: "",
  companyNo: "",
  depth: "",
  mainflag: false,
};

function DeptRegister({ deptInfo }) {
  /**
   * 등록할 부서의 상태를 관리합니다.
   */
  const [regDept, setRegDept] = useState(initState);

  useEffect(() => {
    setRegDept({
      ...initState,
      companyNo: deptInfo.companyNo,
      upperDeptNo: deptInfo.upperDeptNo,
    });
  }, [deptInfo]);

  /**
   * 등록에서 input의 text타입 데이터를 담당합니다.
   */
  const registerChange = (e) => {
    const { value, name } = e.target;
    regDept[name] = value;
    setRegDept({ ...regDept });
  };

  /**
   * 추가 버튼을 클릭하면
   * 부서가 조직도에 맞게 등록됩니다.
   */
  const regClickHandler = () => {
    registerDept(regDept).then((reuslt) => {
      setRegDept(reuslt);
      Swal.fire("", "부서등록 되었습니다.", "success");
    });
  };
  return (
    <DeptRegisterModalInfoWrapper>
      <DeptRegisterModalInfoHeader>회사번호</DeptRegisterModalInfoHeader>
      <DeptRegisterModalInfoBody>
        <DeptRegisterModalInfoInput type="text" className="unchangeable" value={regDept.companyNo || ""} onChange={(e) => registerChange(e)} name="companyNo" readOnly />
      </DeptRegisterModalInfoBody>
      <DeptRegisterModalInfoHeader>부서명</DeptRegisterModalInfoHeader>
      <DeptRegisterModalInfoBody>
        <DeptRegisterModalInfoInput type="text" value={regDept.deptName || ""} onChange={(e) => registerChange(e)} name="deptName" />
      </DeptRegisterModalInfoBody>
      <DeptRegisterModalInfoHeader>부서약칭</DeptRegisterModalInfoHeader>
      <DeptRegisterModalInfoBody>
        <DeptRegisterModalInfoInput type="text" value={regDept.deptDesc || ""} onChange={(e) => registerChange(e)} name="deptDesc" />
      </DeptRegisterModalInfoBody>
      <DeptRegisterModalInfoHeader>상위부서번호</DeptRegisterModalInfoHeader>
      <DeptRegisterModalInfoBody>
        <DeptRegisterModalInfoInput type="text" className="unchangeable" value={regDept.upperDeptNo || ""} onChange={(e) => registerChange(e)} name="upperDeptNo" readOnly />
      </DeptRegisterModalInfoBody>
      <DeptRegisterModalInfoBody>
        <DeptRegisterModalInfoBtn type="button" onClick={regClickHandler}>저장</DeptRegisterModalInfoBtn>
      </DeptRegisterModalInfoBody>
    </DeptRegisterModalInfoWrapper>
  );
}

export default DeptRegister;
