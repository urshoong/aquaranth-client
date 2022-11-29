import React, { useState } from "react";
import CompanyInformation from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyInformation";
import CompanySearch from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanySearch";
import CompanyList from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyList";
import { getCompanyList, getCompanyInformation, registerCompanyInformation,
  ModifyCompanyInformation, RemoveCompanyInformation } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/company";
import styled from "styled-components";
import Swal from "sweetalert2";

// 회사 기본정보 초기값
const initState = {
  companyNo: 0,
  companyName: "",
  companyAddress: "",
  companyTel: "",
  ownerName: "",
  businessNumber: "",
  foundingDate: "",
  companyUse: true,
};

const initStateName = {
  companyName: "회사명",
  companyAddress: "회사주소",
  companyTel: "대표전화",
  ownerName: "대표자명",
  businessNumber: "사업자번호",
  foundingDate: "설립일",
};


// 회사관리 component
function CompanyManagement({ list, setList }) {
  const [information, setInformation] = useState({}); // 해당 회사 정보를 담을 상태값
  const [show, setShow] = useState(true); // 회사 기본정보 component 화면 출력 상태값


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

  const checkArr = []; // 빈 문자인 기본정보의 값을 저장할 배열

  // 회사 기본정보에 빈 문자가 있는지 체크하는 함수
  const isEmpty = () => {
    const infoValueArr = Object.entries(information); // 회사 기본정보 객체의 value 값만 배열로 변경
    let checkNum = 0; // 기본정보 안에 빈 문자가 존재하는지 체크하는 숫자
    infoValueArr.forEach((item) => {
      if (item[1] === "") {
        checkNum += 1; // value 값이 빈 문자가 존재할 때마다 +1
        checkArr.push(item[0]); // 빈 문조가 존재하는 item 을 배열에 추가
      }
    });
    return checkNum === 0;
  };

  // 회사 기본정보를 등록 및 수정할 handler
  const clickCompanySave = () => {
    console.log(checkArr);
    const printName = [];
    const checkName = Object.entries(initStateName);
    isEmpty();
    checkArr.map((name) => {
      checkName.map((item) => {
        if (name === item[0]) {
          printName.push(item[1]);
        }
        return 0;
      });
      return printName;
    });
    console.log(printName);
    Swal.fire({
      title: "기본정보 미입력",
      text: `[${printName}]을 입력하지않았습니다.`,
    }).then();

    /* if (information.companyNo === 0) {
      console.log("회사 기본정보 등록");
      registerCompanyInformation(information).then(() => {
        Swal.fire("", "회사 등록이 완료되었습니다.").then(() => {
          getCompanyList().then((data) => {
            setList(data);
          });
        });
      });
    } else {
      console.log("회사 기본정보 수정");
      ModifyCompanyInformation(information).then(() => {
        getCompanyInformation(information.companyNo).then((data) => {
          setInformation(data);
        });
        getCompanyList().then((data) => {
          setList(data);
        });
      });
    } */
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
  };

  return (
    <CompanyManagementDiv>
      <CompanySearch setList={setList} />
      <CompanyListInfoDiv>
        <CompanyList
          list={list}
          setList={setList}
          clickCompanyListItem={clickCompanyListItem}
          clickCompanyRegister={clickCompanyRegister}
        />
        <CompanyInformation
          information={information}
          setInformation={setInformation}
          show={show}
          clickCompanyInfoShow={clickCompanyInfoShow}
          clickCompanySave={clickCompanySave}
          clickCompanyRemove={clickCompanyRemove}
        />
      </CompanyListInfoDiv>
    </CompanyManagementDiv>
  );
}

const CompanyManagementDiv = styled.div`
  color: black;
  box-sizing: border-box;
  height: 80vh;
  width: 80vw;
`;

const CompanyListInfoDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1em;
`;

export default CompanyManagement;
