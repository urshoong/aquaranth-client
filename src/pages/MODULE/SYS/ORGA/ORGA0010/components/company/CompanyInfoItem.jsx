import React from "react";
import styled from "styled-components";

// 회사 기본정보 아이템 component
function CompanyInfoItem({ tagName, name, value, changeCompanyInformation }) {
  return (
  /* 회사코드 read only / 설립일 date 타입을 삼항연산자 말고 생각해보기 */
    <CompanyInfoItemDiv>
      <CompanyInfoNameDiv>
        <CompanyInfoNameSpan>{tagName}</CompanyInfoNameSpan>
      </CompanyInfoNameDiv>
      <CompanyInfoInputDiv>
        {tagName === "사용여부" && (
          <div>
            <CompanyUseInput type="radio" name={name} value="true" checked={value === true} onChange={(e) => { changeCompanyInformation(e); }} />사용
            <CompanyUseInput type="radio" name={name} value="false" checked={value === false} onChange={(e) => { changeCompanyInformation(e); }} />미사용
          </div>
        )}
        {tagName === "설립일" && <CompanyInfoInput type="date" name={name} value={value || ""} onChange={(e) => { changeCompanyInformation(e); }} />}
        {tagName === "회사코드" && <CompanyInfoInput type="text" name={name} value={value || ""} readOnly onChange={(e) => { changeCompanyInformation(e); }} />}
        {(tagName !== "사용여부" && tagName !== "설립일" && tagName !== "회사코드")
          && <CompanyInfoInput type="text" name={name} value={value || ""} onChange={(e) => { changeCompanyInformation(e); }} />}
      </CompanyInfoInputDiv>
    </CompanyInfoItemDiv>
  );
}

const CompanyInfoItemDiv = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr;
  border-bottom: 1px solid #6c6c6c;
`;

const CompanyInfoNameDiv = styled.div`
  text-align: right;
  border-right: 1px solid #6c6c6c;
  height: 3em;
  line-height: 3em;
`;

const CompanyInfoNameSpan = styled.span`
  margin-right: 0.5em;
`;

const CompanyInfoInputDiv = styled.div`
  height: 3em;
  line-height: 3em;
  width: 20em;
`;

const CompanyUseInput = styled.input`
  margin-left: 1em;
`;

const CompanyInfoInput = styled.input`
  width: 20em;
  height: 2em;
  line-height: 2em;
  margin-left: 1em;
`;

export default CompanyInfoItem;
