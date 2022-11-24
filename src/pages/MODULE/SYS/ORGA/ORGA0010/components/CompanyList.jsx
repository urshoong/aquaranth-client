import React from "react";
import "../Company.css";
import CompanyListItem from "./CompanyListItem";
import CompanyCount from "./CompanyCount";

// 회사 정보 리스트 component
function CompanyList({ list, setList, clickCompanyListItem, clickCompanyRegister }) {

  return (
    <div className="companyListDiv">
      <div className="companyCountItemDiv">
        <CompanyCount list={list} setList={setList} />
      </div>
      <div className="companyItemDiv">
        {list.map((item) => <CompanyListItem item={item} key={item.companyNo} clickCompanyListItem={clickCompanyListItem} />)}
      </div>
      <div className="companyRegisterBtnDiv">
        <button onClick={ clickCompanyRegister }>⊕ 추가</button>
      </div>
    </div>
  );
}

export default CompanyList;
