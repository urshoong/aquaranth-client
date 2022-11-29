import React, { useState } from "react";
import {
  registerDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";

const initState = {
  deptName: "",
  deptDesc: "",
  upperDeptNo: "",
  companyNo: "",
  depth: "",
  mainflag: false,
};

function DepartmentRegisterComp(props) {
  /**
   * 등록할 부서의 상태를 관리합니다.
   */
  const [regDept, setRegDept] = useState(initState);

  /**
   * 등록에서 input의 text타입 데이터를 담당합니다.
   */
  const regiterChange = (e) => {
    const { value, name } = e.target;
    regDept[name] = value;
    setRegDept({ ...regDept });
  };

  /**
   * 등록에서 input의 radio타입 데이터를 담당합니다.
   */
  const registerRadioChange = (e) => {
    const { name, checked } = e.target;
    regDept[name] = checked;
    setRegDept({ ...regDept });
  };

  /**
   * 추가 버튼을 클릭하면
   * 부서가 조직도에 맞게 등록됩니다.
   */
  const regClickHandler = () => {
    registerDept(regDept).then((reuslt) => {
      setRegDept(reuslt);
      console.log("등록되었습니다.");
      alert("등록되었습니다.");
    });
  };
  return (
    <div>
      <h1>등록 컴포넌트</h1>
      <div>
        <label>회사번호</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="companyNo" />
      </div>
      <div>
        <label>부서명</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="deptName" />
      </div>
      <div>
        <label>부서약칭</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="deptDesc" />
      </div>
      <div>
        <label>상위부서번호</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="upperDeptNo" />
      </div>
      <div>
        <label>등록자명</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="regUser" />
      </div>
      <div>
        <label>사용 여부</label>
        <input type="checkbox" onChange={(e) => registerRadioChange(e)} name="mainFlag" />
      </div>
      <div>
        <label>뎁스</label>
        <input type="text" onChange={(e) => regiterChange(e)} name="depth" />
      </div>
      <button type="button" onClick={regClickHandler}>저장</button>

    </div>
  );
}

export default DepartmentRegisterComp;
