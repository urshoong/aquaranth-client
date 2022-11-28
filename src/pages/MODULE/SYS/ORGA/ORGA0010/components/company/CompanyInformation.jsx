import React from "react";
import CompanyInfoItem from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyInfoItem";
import styled from "styled-components";

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
    <CompanyInformationDiv>
      <CompanyInfoBtnDiv>
        <CompanyInfoSpan>ㆍ기본정보</CompanyInfoSpan>
        <CompanyInfoBtn type="submit" onClick={clickCompanySave}>저장</CompanyInfoBtn>
        <CompanyInfoBtn type="submit" onClick={() => { clickCompanyRemove(companyNo); }}>삭제</CompanyInfoBtn>
        <CompanyInfoShowBtn type="submit" onClick={clickCompanyInfoShow}>X</CompanyInfoShowBtn>
      </CompanyInfoBtnDiv>
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
    </CompanyInformationDiv>
  );
}

const CompanyInformationDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 15fr;
  margin-top: 1em;
`;

const CompanyInfoBtnDiv = styled.div`
  display: grid;
  grid-template-columns: 20fr 1fr 1fr 1fr;
  grid-column-gap: 1em;
  border-bottom: 2px solid #6c6c6c;
`;

const CompanyInfoSpan = styled.span`
  font-size: 1.5em;
`;

const CompanyInfoBtn = styled.button`
  border: 1px solid darkgray;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  height: 2em;
  width: 3em;
`;

const CompanyInfoShowBtn = styled.button`
  margin-bottom: 0.5em;
  font-size: 1.3em;
  font-weight: bold;
  color: #6c6c6c;
`;

export default CompanyInformation;
