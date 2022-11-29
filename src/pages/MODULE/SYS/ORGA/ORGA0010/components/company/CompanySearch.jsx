import React, { useState } from "react";
import styled from "styled-components";
import { getCompanySearch } from "../../api/company";

// 회사 검색 component
function CompanySearch({ setList }) {
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
      <CompanySearchDiv>
        <div>
          <CompanySearchSpan>회사</CompanySearchSpan>
          <CompanySearchInput type="text" placeholder="회사코드/회사명을 입력하세요." onChange={(e) => { changeCompanySearch(e); }} />
        </div>
        <div className="companyUseDiv">
          <CompanySearchSpan>사용여부</CompanySearchSpan>
          <select onChange={(e) => { changeCompanyUse(e); }}>
            <option value="true">사용</option>
            <option value="false">미사용</option>
          </select>
        </div>
        <CompanySearchBtn type="submit" onClick={() => { clickCompanySearch(); }}>검색</CompanySearchBtn>
      </CompanySearchDiv>
    </div>
  );
}

const CompanySearchDiv = styled.div`
  width: 100%;
  line-height: 37px;
  box-sizing: border-box;
  border: 1px solid darkgray;
  display: flex;
  justify-content: space-evenly;
`;

const CompanySearchSpan = styled.span`
  font-size: 1.3em;
  padding-right: 1em;
`;

const CompanySearchInput = styled.input`
  border: 1px solid darkgray;
  height: 1.7em;
  width: 25em;
`;

const CompanySearchBtn = styled.button`
  border: 1px solid darkgray;
  border-radius: 0.5em;
  height: 2.5em;
  width: 3em;
  margin-top: 0.4em;
`;

export default CompanySearch;
