import React from "react";

// 총 회사 건 수 component
function CompanyCount({ search }) {
  return (
    <div className="CompanySortDiv">
      <div>
        <span>회사</span>
        <span className="companyCountSpan">{search.length}</span>
        <span>건</span>
      </div>
      <div>
        <select>
          <option>정렬</option>
        </select>
      </div>
    </div>
  );
}

export default CompanyCount;
