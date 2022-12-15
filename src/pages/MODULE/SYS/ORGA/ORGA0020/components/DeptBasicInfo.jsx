import React from "react";
import {
  deleteDept,
  handleSelectDepartment,
  modifyDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";
import {
  DeptBasicInformationBody,
  DeptBasicInformationBtnWrapper,
  DeptBasicInformationDiv,
  DeptBasicInformationHeader,
  DeptBasicInformationInput,
  DeptBasicInformationWrapper, EmpBasicInformationRadio,
  EmpInformationBtn,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function DeptBasicInfo({
  selectDepartment,
  inputChangeHandler,
  setSelectDepartment,
}) {
  const { deptNo, deptName, deptDesc, mainFlag, regUser } = selectDepartment;

  /**
   * 수정 버튼을 클릭하면 입력한 데이터에
   * 맞게 내용을 수정합니다.
   */
  const modClickHandler = () => {
    modifyDept(selectDepartment).then(() => {
      Swal.fire("", "수정이 완료되었습니다.", "success");
    });
  };

  /**
   * 부서를 삭제합니다
   * (부서 사용여부 '사용'인 부서를
   * '미사용'으로 변경해줍니다.)
   */
  const clickRemoveHandler = () => {
    if (mainFlag === true) {
      deleteDept(deptNo).then(() => {
        Swal.fire("변경 완료", "미사용처리 되었습니다.", "success").then(() => {
          handleSelectDepartment(deptNo).then((data) => {
            setSelectDepartment(data);
          });
        });
      });
    } else {
      Swal.fire("변경 실패", "이미 미사용 부서입니다.", "warning");
    }
  };

  return (
    <DeptBasicInformationWrapper>
      <DeptBasicInformationBtnWrapper>
        <EmpInformationBtn type="button" onClick={modClickHandler}>수정</EmpInformationBtn>
        <EmpInformationBtn type="button" onClick={clickRemoveHandler}>삭제</EmpInformationBtn>
      </DeptBasicInformationBtnWrapper>
      <DeptBasicInformationDiv>
        <DeptBasicInformationHeader>부서번호</DeptBasicInformationHeader>
        <DeptBasicInformationBody>
          <DeptBasicInformationInput
            type="text"
            className="unchangeable"
            value={deptNo || ""}
            name="deptNo"
            onChange={(e) => inputChangeHandler(e)}
            readOnly
          />
        </DeptBasicInformationBody>
        <DeptBasicInformationHeader>부서명</DeptBasicInformationHeader>
        <DeptBasicInformationBody>
          <DeptBasicInformationInput
            type="text"
            value={deptName || ""}
            name="deptName"
            onChange={(e) => inputChangeHandler(e)}
          />
        </DeptBasicInformationBody>
        <DeptBasicInformationHeader>부서 약칭</DeptBasicInformationHeader>
        <DeptBasicInformationBody>
          <DeptBasicInformationInput
            type="text"
            value={deptDesc || ""}
            name="deptDesc"
            onChange={(e) => inputChangeHandler(e)}
          />
        </DeptBasicInformationBody>
        <DeptBasicInformationHeader>사용 여부</DeptBasicInformationHeader>
        <DeptBasicInformationBody>
          <EmpBasicInformationRadio
            type="radio"
            name="mainFlag"
            value="true"
            checked={mainFlag === true}
            onChange={(e) => inputChangeHandler(e)}
          />사용
          <EmpBasicInformationRadio
            type="radio"
            name="mainFlag"
            value="false"
            checked={mainFlag === false}
            onChange={(e) => inputChangeHandler(e)}
          />미사용
        </DeptBasicInformationBody>
        <DeptBasicInformationHeader>등록자명</DeptBasicInformationHeader>
        <DeptBasicInformationBody>
          <DeptBasicInformationInput
            type="text"
            className="unchangeable"
            name="regUser"
            value={regUser || ""}
            readOnly
          />
        </DeptBasicInformationBody>
      </DeptBasicInformationDiv>
    </DeptBasicInformationWrapper>
  );
}

export default DeptBasicInfo;
