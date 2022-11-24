import React, { useState } from "react";

// 회사 검색 component
function CompanySearch({ getCompanySearch, setList }) {
  const [companySearch, setCompanySearch] = useState(""); // 검색어를 담을 상태값
  const [companyUse, setCompanyUse] = useState(true); // 사용여부를 담을 상태값

  // 회사코드 및 회사명을 받아올 handler
  const changeCompanySearch = (e) => {
    const { value } = e.target;
    console.log("companySearch : ", value);
    setCompanySearch(value);
  };

  // 사용여부를 받아올 handler
  const changeCompanyUse = (e) => {
    const { value } = e.target;
    console.log("companyUse : ", value);
    setCompanyUse(value);
  };

  // 검색결과를 받아올 handler
  const clickCompanySearch = () => {
    getCompanySearch(companyUse, companySearch).then((data) => {
      console.log("검색결과 : ", data);
      setList(data);
    });
  };

  return (
    <div>
      <div className="companySearchDiv">
        <div className="companySearchInputDiv">
          <span className="companySearchSpan">회사</span>
          <input className="companySearchInput" type="text" placeholder="회사코드/회사명을 입력하세요." onChange={(e) => { changeCompanySearch(e); }} />
        </div>
        <div className="companyUseDiv">
          <span className="companySearchSpan">사용여부</span>
          <select className="CompanyUseSelect" onChange={(e) => { changeCompanyUse(e); }}>
            <option value="true">사용</option>
            <option value="false">미사용</option>
          </select>
        </div>
        <button className="companySearchBtn" type="submit" onClick={() => { clickCompanySearch(); }}>검색</button>
      </div>
    </div>
  );
}

export default CompanySearch;
