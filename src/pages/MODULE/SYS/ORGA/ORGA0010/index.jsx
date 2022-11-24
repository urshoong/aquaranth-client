import React, { useEffect, useState } from "react";
import CompanyManagement from "./components/CompanyManagement";
import { getCompanyList } from "./api/company";

function Index() {
  const [list, setList] = useState([]); // 회사 정보 리스트, 검색 결과를 담을 상태값

  // 회사관리 페이지가 처음 접속됐을 때 회사 정보 리스트 출력
  useEffect(() => {
    getCompanyList().then((data) => {
      console.log("Company List : ", data);
      setList(data);
    });
  }, []);

  return (
    <div>
      <CompanyManagement list={list} setList={setList} />
    </div>
  );
}
export default Index;
