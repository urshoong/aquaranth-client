import React, { useState } from "react";
import DeptBasicInfo from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptBasicInfo";
import DeptMemberInfo from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptMemberInfo";
import {
  CompanyInfoSpan,
  DeptInfoChoose,
  DeptInfoPageWrapper,
  DeptInfoTabWrapper,
  DeptListTab,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function DeptInformation({
  selectDepartment,
  inputChangeHandler,
  clickDept,
  setSelectDepartment,
}) {
  /**
   * 부서의 기본 정보와 부서의
   * 사용자 정보 컴포넌트를 바꿀 때
   * 사용하는 상태관리 입니다.
   */
  const [show, setShow] = useState("basic");

  const clickShowInfo = (e) => {
    const { target } = e;
    const { value } = target;
    const tabs = target.parentElement?.children;
    Array.prototype.map.call(tabs, (tab) => {
      tab.classList.remove("active");
    });
    target.classList.add("active");
    setShow(value);
  };

  if (!clickDept) {
    return (<></>);
  }

  return (
    <DeptInfoPageWrapper>
      <DeptInfoChoose>
        <CompanyInfoSpan>ㆍ상세정보</CompanyInfoSpan>
      </DeptInfoChoose>
      <DeptInfoTabWrapper>
        <DeptListTab type="button" className="active" value="basic" onClick={(e) => { clickShowInfo(e); }}>기본정보</DeptListTab>
        <DeptListTab type="button" value="detail" onClick={(e) => { clickShowInfo(e); }}>부서원정보</DeptListTab>
      </DeptInfoTabWrapper>
      {show === "basic" ? (
        <DeptBasicInfo
          selectDepartment={selectDepartment}
          inputChangeHandler={inputChangeHandler}
          setSelectDepartment={setSelectDepartment}
        />
      )
        : (
          <DeptMemberInfo
            deptOrgaNo={selectDepartment.orgaNo}
          />
        )}
    </DeptInfoPageWrapper>
  );
}

export default DeptInformation;
