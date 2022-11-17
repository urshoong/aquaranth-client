import React, { useState } from "react";
import "../employeestyle.css";
import EmpOrgaInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpOrgaInformation";
import EmpBasicInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpBasicInformation";


function EmpInformation({ emps, empInformation, clickEmpRegister,
  changeEmpInput, clickEmpModify, clickEmpRemove, clickEmp, clickOrga, view,
  basicColor, orgaColor, orga, handleOnClickOrgaRegister, orgaDisplay, company,
  handleOnChangeCompany, department, handleOnClickOrgaRegisterSubmit,
  handleOnClickOrgaRegisterReset, handleOnChangeOrgaRegisterInput,
  handleOnClickOrgaModify, handleOnChangeOrgaInput, handleOnClickOrgaModifyDept }) {
  return (
    <div className="pageLine" style={{ height: "600px" }}>
      <div className="empList" style={{ overflow: "auto", height: "600px" }}>
        <span>사용자 : {emps.length} 명</span> <span>정렬▼</span>
        {emps.map(({ empNo, username, empName, firstHiredDate }) => (
          <div className="empItem" key={empNo} onClick={() => clickEmp(empNo)} aria-hidden="true">
            <div className="empItemImg">사진 </div>
            <div className="empIdName">
              <div>
                {username}
              </div>
              <div>
                {empName}
              </div>
            </div>
            <div>
              {firstHiredDate}
            </div>
          </div>
        ))}
      </div>


      <div className="infoPage">
        <span className="basicFont" style={{ color: basicColor }} onClick={() => clickEmp(empInformation.empNo)} aria-hidden="true">●기본정보</span>
        <span className="orgaFont" style={{ color: orgaColor }} onClick={() => clickOrga(empInformation.empNo)} aria-hidden="true">●조직정보</span>

        <div>
          <span>빨간색은 필수 입력 항목입니다.</span>
        </div>
        <div>
          <span>검정색은 변경 불가 항목입니다.</span>
        </div>

        {view
          ? (
            <EmpBasicInformation
              clickEmpRegister={clickEmpRegister}
              clickEmpModify={clickEmpModify}
              clickEmpRemove={clickEmpRemove}
              empInformation={empInformation}
              changeEmpInput={changeEmpInput}
            />
          ) : (
            <EmpOrgaInformation
              orga={orga}
              handleOnClickOrgaRegister={handleOnClickOrgaRegister}
              orgaDisplay={orgaDisplay}
              company={company}
              handleOnChangeCompany={handleOnChangeCompany}
              department={department}
              handleOnClickOrgaRegisterSubmit={handleOnClickOrgaRegisterSubmit}
              handleOnClickOrgaRegisterReset={handleOnClickOrgaRegisterReset}
              handleOnChangeOrgaRegisterInput={handleOnChangeOrgaRegisterInput}
              handleOnClickOrgaModify={handleOnClickOrgaModify}
              handleOnChangeOrgaInput={handleOnChangeOrgaInput}
              handleOnClickOrgaModifyDept={handleOnClickOrgaModifyDept}
            />
          )}

      </div>


    </div>


  );
}

export default EmpInformation;
