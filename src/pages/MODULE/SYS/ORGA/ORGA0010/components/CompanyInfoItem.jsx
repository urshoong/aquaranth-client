import React from "react";

// 회사 기본정보 아이템 component
function CompanyInfoItem({ tagName, name, value, changeCompanyInformation }) {

  return (
    <div className="companyInfoItemDiv">
     <div className="companyInfoNameDiv">
       <span>{tagName}</span>
     </div>
     <div className="companyInfoInputDiv">
        {tagName === "설립일" ?
          <input type="date" name={name} value={value} onChange={(e)=>{ changeCompanyInformation(e); }}/>
          : tagName === "사용여부" ?
            <div className="companyUseInputDiv">
              <input type="radio" name={name} value="true" checked={value === true} onChange={(e)=>{ changeCompanyInformation(e); }} />사용
              <input type="radio" name={name} value="false" checked={value === false} onChange={(e)=>{ changeCompanyInformation(e); }} />미사용
            </div>
            : tagName === "회사코드" ?
              <input type="text" name={name} value={value} readOnly onChange={(e)=>{ changeCompanyInformation(e); }} />
          : <input type="text" name={name} value={value} onChange={(e)=>{ changeCompanyInformation(e); }} />
        }
     </div>
    </div>
  );
}

export default CompanyInfoItem;
