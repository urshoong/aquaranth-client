import React from "react";

function RegisterDept({ deptInfo }) {
  // 부서 정보 컬럼명 구조분해
  // 회사번호, 부서번호, 부서명, 상위부서번호, 등록자명, 사용여부, depth.
  const { companyNo, deptNo, deptName, upperDeptNo, regUser, mainFlag, depth } = deptInfo;

  return (
    <div>
      <div>회사번호 : {companyNo}</div>
      <div>부서번호 : {deptNo == null ? 0 : deptNo}</div>
      <div>부서이름 : {deptName}</div>
      <div>상위부서번호 : {upperDeptNo}</div>
      <div>등록자 : {regUser}</div>
      <div>사용여부 : {mainFlag ? "사용" : "미사용"}</div>
      <div>깊이 : {depth}</div>
    </div>
  );
}

export default RegisterDept;
