import React, { useEffect, useState } from "react";
import CompanySearch from "./CompanySearch";
import CompanyList from "./CompanyList";
import request from "../../../../../../utils/axiosUtil";
import "../Company.css";
import CompanyInformation from "./CompanyInformation";

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

// 해당 회사 정보 요청
const getCompanyInformation = async (companyNo) => {
  const { data } = await request.get(`/company/information/${companyNo}`);

  return data;
};

// 회사 기본정보 추가 요청
const registerCompanyInformation = async (information) => {
  await request.post("/company/register", information);
};


// 회사 기본정보 초기값
const initState = {
  companyNo : 0,
  companyName : "",
  companyAddress : "",
  companyTel : "",
  ownerName : "",
  businessNumber : "",
  foundingDate : "",
  companyUse : true
};


// 회사관리 component
function CompanyManagement() {
  const [list, setList] = useState([]); // 회사 정보 리스트, 검색 결과를 담을 상태값
  const [information, setInformation] = useState({}); // 해당 회사 정보를 담을 상태값
  const [show, setShow] = useState(true);  // 회사 기본정보 component 화면 출력 상태값


  // 회사관리 페이지가 처음 접속됐을 때 회사 정보 리스트 출력
  useEffect(() => {
    getCompanyList().then((data) => {
      console.log("Company List : ", data);
      setList(data);
    });
  }, []);

  // 회사 정보 리스트 중 하나를 선택했을 때 해당 회사 정보를 받아올 handler
  const clickCompanyListItem = (companyNo) => {
    getCompanyInformation(companyNo).then((data) => {
      console.log(data);
      setInformation(data);
      setShow(true);
    });
  };

  // 회사 기본정보 component 화면 출력 off 할 handler
  const clickCompanyInfoShow = () => {
    setShow(false);
  };

  // 회사 기본정보 추가할 component 출력 handler
  const clickCompanyRegister = () => {
    setInformation({ ...initState });
    setShow(true);
  };

  // 회사 기본정보를 추가할 handler
  const clickCompanySave = () => {
    console.log(information);
    registerCompanyInformation(information).then(() => {
      getCompanyList().then((data) => {
        setList(data);
      })
    })
  };

  return (
    <div className="companyManagementDiv">
      <CompanySearch getCompanySearch={getCompanySearch} setList={setList} />
      <div className="companyListInfoDiv">
        <CompanyList list={list} clickCompanyListItem={clickCompanyListItem} clickCompanyRegister={clickCompanyRegister} />
        <CompanyInformation information={information} setInformation={setInformation} show={show}
                            clickCompanyInfoShow={clickCompanyInfoShow} clickCompanySave={clickCompanySave} />
      </div>
    </div>
  );
}
export default CompanyManagement;
