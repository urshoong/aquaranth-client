import React from "react";
import CompanyInfoItem from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyInfoItem";

// 회사 기본정보 component
function CompanyInformation({ information, setInformation, clickCompanyInfoShow,
  clickCompanySave, clickCompanyRemove, show }) {
  // 해당 회사 기본정보 구조분해
  const { companyNo, companyName, companyAddress, companyTel,
    ownerName, businessNumber, foundingDate, companyUse } = information;

  // companyUse 값을 boolean 으로 변화할 함수
  const changeBoolean = (value) => {
    let booleanValue = true;
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "false") {
        booleanValue = false;
      }
    }
    return booleanValue;
  };

  // 회사 기본정보값 변화를 도와줄 handler
  const changeCompanyInformation = (e) => {
    const { name, value } = e.target;
    if (name === "companyUse") {
      information[name] = changeBoolean(value);
    } else {
      information[name] = value;
    }
    console.log("입력값 : ", value);
    setInformation({ ...information });
  };


  return (
    <div className="companyInformationDiv">
      <div className="companyInfoBtnDiv">
        <span className="companyInfoSpan">ㆍ기본정보</span>
        <button className="companyInfoSaveBtn" type="submit" onClick={clickCompanySave}>저장</button>
        <button className="companyInfoDelBtn" type="submit" onClick={() => { clickCompanyRemove(companyNo); }}>삭제</button>
        <button className="companyInfoShowBtn" type="submit" onClick={clickCompanyInfoShow}>X</button>
      </div>
      {show
        && (
          <div>
            <CompanyInfoItem tagName="회사코드" name="companyNo" value={companyNo} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="사용여부" name="companyUse" value={companyUse} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="회사명" name="companyName" value={companyName} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="대표전화" name="companyTel" value={companyTel} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="사업자번호" name="businessNumber" value={businessNumber} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="설립일" name="foundingDate" value={foundingDate} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="대표자명" name="ownerName" value={ownerName} changeCompanyInformation={changeCompanyInformation} />
            <CompanyInfoItem tagName="회사주소" name="companyAddress" value={companyAddress} changeCompanyInformation={changeCompanyInformation} />
          </div>
        )}
    </div>
  );
}

export default CompanyInformation;
