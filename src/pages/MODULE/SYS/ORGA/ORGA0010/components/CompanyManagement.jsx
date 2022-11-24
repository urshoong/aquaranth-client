import React, { useState } from "react";
import CompanySearch from "./CompanySearch";
import CompanyList from "./CompanyList";
import "../Company.css";
import CompanyInformation from "./CompanyInformation";
import { getCompanyList, getCompanyInformation, registerCompanyInformation
        , ModifyCompanyInformation, RemoveCompanyInformation } from "../api/company.js";

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
function CompanyManagement({ list, setList }) {
  const [information, setInformation] = useState({}); // 해당 회사 정보를 담을 상태값
  const [show, setShow] = useState(true);  // 회사 기본정보 component 화면 출력 상태값


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

  // 회사 기본정보를 등록 및 수정할 handler
  const clickCompanySave = () => {
    console.log(information);
   if(information.companyNo === 0) {
     console.log("회사 기본정보 등록");
     registerCompanyInformation(information).then(() => {
       getCompanyList().then((data) => {
         setList(data);
       });
       alert("회사 등록을 완료하였습니다.");
     });
   }
   else {
     console.log("회사 기본정보 수정");
     ModifyCompanyInformation(information).then(() => {
       getCompanyInformation(information.companyNo).then((data) => {
         setInformation(data);
       });
       getCompanyList().then((data) => {
         setList(data);
       });
       alert("회사 수정을 완료하였습니다.");
     });
   }
  };

  // 회사 기본정보 삭제(사용여부를 '미사용'으로 변경)할 handler
  const clickCompanyRemove = (companyNo) => {
    console.log(companyNo);
    RemoveCompanyInformation(companyNo).then(() => {
      getCompanyInformation(companyNo).then((data) => {
        setInformation(data);
      });
      getCompanyList().then((data) => {
        setList(data);
      });
    });
    alert("회사를 미사용 처리하였습니다.");
  };

  return (
    <div className="companyManagementDiv">
      <CompanySearch setList={setList} />
      <div className="companyListInfoDiv">
        <CompanyList list={list} setList={setList} clickCompanyListItem={clickCompanyListItem} clickCompanyRegister={clickCompanyRegister} />
        <CompanyInformation information={information} setInformation={setInformation} show={show}
                            clickCompanyInfoShow={clickCompanyInfoShow} clickCompanySave={clickCompanySave}
                            clickCompanyRemove={clickCompanyRemove} />
      </div>
    </div>
  );
}

export default CompanyManagement;
