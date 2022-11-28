import "../employeestyle.css";
import React from "react";
import EmpOrgaInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpOrgaInformation";
import EmpBasicInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpBasicInformation";
import useModal from "@hooks/useModal";
import Button from "@components/Button";


function EmpInformation({ emps, empInformation, clickEmpRegister,
  changeEmpInput, clickEmpModify, clickEmpRemove, clickEmp, clickOrga, view,
  basicColor, orgaColor, orga, handleOnClickOrgaRegister, orgaDisplay, company,
  handleOnChangeCompany, department, handleOnClickOrgaRegisterSubmit,
  handleOnClickOrgaRegisterReset, handleOnChangeOrgaRegisterInput,
  handleOnClickOrgaModify, handleOnChangeOrgaInput, handleOnClickOrgaModifyDept }) {
  const { openModal } = useModal();
  const data = { menucode: "ORGA0030", menuname: "사원 관리" };
  const handleOnModal = () => {
    openModal({ type: "ORGA0030", props: data });
  };

  const handleOnRegisterModal = () => {
    openModal({ type: "ORGA0030Register" });
  };

  return (

    <div className="pageLine" style={{ height: "600px" }}>
      <Button type="button" onClick={handleOnModal}>ORGA0030 모달 띄우기</Button>
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
              handleOnRegisterModal={handleOnRegisterModal}
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
