import React from "react";
import "../Company.css";
import CompanyListItem from "./CompanyListItem";
import CompanyCount from "./CompanyCount";

// 회사 정보 리스트 component
function CompanyList({ search }) {
  return (
    <div className="companyListDiv">
      <div className="companyCountItemDiv">
        <CompanyCount search={search} />
      </div>
      <div className="companyItemDiv">
        {search.map((item) => <CompanyListItem item={item} />)}
      </div>
    </div>
  );
}

export default CompanyList;
