import React, { useEffect, useState } from "react";
import CompanySearch from "./CompanySearch";
import CompanyList from "./CompanyList";
import request from "../../../../../../utils/axiosUtil";
import "../Company.css";

// 회사 정보 검색 요청
const getCompanySearch = async (companyUse, companySearch) => {
  const { data } = await request.get(`/company/search?companyUse=${companyUse}&companySearch=${companySearch}`);

  return data;
};

// 회사 정보 리스트 요청
const getCompanyList = async () => {
  const { data } = await request.get("/company/list");

  return data;
};

// 회사관리 component
function CompanyManagement() {
  const [search, setSearch] = useState([]); // 검색 결과를 담을 상태값
  const [list, setList] = useState([]);

  // 회사관리 페이지가 처음 접속됐을 때 회사 정보 리스트 출력
  useEffect(() => {
    getCompanyList().then((data) => {
      console.log("Company List : ", data);
      setSearch(data);
    });
  }, []);


  return (
    <div className="companyManagementDiv">
      <CompanySearch getCompanySearch={getCompanySearch} setSearch={setSearch} />
      <CompanyList search={search} />
    </div>
  );
}

export default CompanyManagement;
