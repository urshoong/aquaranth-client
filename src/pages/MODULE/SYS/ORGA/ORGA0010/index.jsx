import React, { useEffect, useState } from "react";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import CompanyManagement from "./components/company/CompanyManagement";
import { getCompanyList } from "./api/company";

function Index() {
  const [list, setList] = useState([]); // 회사 정보 리스트, 검색 결과를 담을 상태값
  const data = { menucode: "ORGA0010", menuname: "회사 관리" };
  const { openModal } = useModal();

  // 회사관리 페이지가 처음 접속됐을 때 회사 정보 리스트 출력
  useEffect(() => {
    getCompanyList().then((companyList) => {
      console.log("Company List : ", companyList);
      setList(companyList);
    });
  }, []);

  // 조직도 모달창을 띄워줄 handler
  const handleOnModal = () => {
    openModal({ type: "ORGA0010", props: data });
  };


  return (
    <div>
      <TreeButton type="button" onClick={handleOnModal}>🏰</TreeButton>
      <CompanyManagement list={list} setList={setList} />
    </div>
  );
}

// 조직도 모달창 버튼
const TreeButton = styled.button`
  font-size: 1rem;
  margin-bottom: 0.5em;
`;

export default Index;
