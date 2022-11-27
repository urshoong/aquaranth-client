import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import CommonTreeContainer from "../orgatree/CommonTreeContainer";
import request from "../../../../../../../utils/axiosUtil";
import OrgatreeEmpList from "../orgatree/OrgatreeEmpList";
import OrgatreeEmpDetail from "../orgatree/OrgatreeEmpDetail";

// 회사번호를 가져오기 위한 회사정보 요청
const getCompanyNoArr = async () => {
  const { data } = await request.get("/company/list");

  return data;
};


const ORGA0010Modal = () => {
  const { closeModal } = useModal();
  const [companyNoArr, setCompanyNoArr] = useState([]);
  const [empList, setEmpList] = useState([]); // 해당 부서에 소속된 모든 사원 정보를 담을 상태값
  const [empInfo, setEmpInfo] = useState({});


  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    getCompanyNoArr().then((list) => {
      console.log("소속된 모든 사원 정보 : ", list);
      setCompanyNoArr(list);
    });
  }, []);

  return (
    <Modal
      onClose={handleCloseModal}
      title="조직도"
    >

      <Orgatree>
        <OrgatreeItem over="auto" borderSize="1">
          {companyNoArr.map(({ companyNo }) => (
            <CommonTreeContainer
              key={companyNo}
              companyNo={companyNo}
              setEmpList={setEmpList}
            />
          ))}
        </OrgatreeItem>
        <OrgatreeItem borderSize="1">
          <OrgatreeEmpList empList={empList} setEmpInfo={setEmpInfo} />
        </OrgatreeItem>
        <OrgatreeItem>
          <OrgatreeEmpDetail empInfo={empInfo} />
        </OrgatreeItem>
      </Orgatree>
    </Modal>
  );
};

export default ORGA0010Modal;

const Orgatree = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  padding-top: 1em;
`;

const OrgatreeItem = styled.div`
  overflow: ${(prop) => prop.over};
  min-width: 230px;
  height: 30rem;
  border: ${(prop) => prop.borderSize}px solid darkgray;
`;


