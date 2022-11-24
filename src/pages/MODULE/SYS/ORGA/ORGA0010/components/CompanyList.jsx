import React from "react";
import "../Company.css";
import CompanyListItem from "./CompanyListItem";
import CompanyCount from "./CompanyCount";

// 회사 정보 리스트 component
function CompanyList({ list, clickCompanyListItem, clickCompanyRegister }) {
  return (
    <div className="companyListDiv">
      <div className="companyCountItemDiv">
        <CompanyCount list={list} />
      </div>
      <div className="companyItemDiv">
        {list.map((item) => <CompanyListItem item={item} clickCompanyListItem={clickCompanyListItem} />)}
      </div>
      <div className="companyRegisterBtnDiv">
        <button onClick={ clickCompanyRegister }>⊕ 추가</button>
      </div>
    </div>
  );
}

export default CompanyList;
