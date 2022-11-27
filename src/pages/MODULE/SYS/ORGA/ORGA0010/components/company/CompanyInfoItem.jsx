import React from "react";

// 회사 기본정보 아이템 component
function CompanyInfoItem({ tagName, name, value, changeCompanyInformation }) {
  return (
  /* 회사코드 read only / 설립일 date 타입을 삼항연산자 말고 생각해보기 */
    <div className="companyInfoItemDiv">
      <div className="companyInfoNameDiv">
        <span>{tagName}</span>
      </div>
      <div className="companyInfoInputDiv">
        {tagName === "사용여부"
          ? (
            <div className="companyUseInputDiv">
              <input type="radio" name={name} value="true" checked={value === true} onChange={(e) => { changeCompanyInformation(e); }} />사용
              <input type="radio" name={name} value="false" checked={value === false} onChange={(e) => { changeCompanyInformation(e); }} />미사용
            </div>
          )
          : <input type="text" name={name} value={value} onChange={(e) => { changeCompanyInformation(e); }} />}
      </div>
    </div>
  );
}

export default CompanyInfoItem;
