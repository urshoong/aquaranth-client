import React from "react";
import styled from "styled-components";
import request from "../../../../../../../utils/axiosUtil";

// 해당 사원의 정보를 요청
const getEmpInformation = async (empNo) => {
  const { data } = await request.get(`/orgatree/information/${empNo}`);

  return data;
};

function OrgatreeEmpItem({ empInfo, setEmpInfo }) {
  // 사원 정보를 구조분해
  const { orgaNo, empName, empRank, username, path, empPhone } = empInfo;

  // 사원 선택시 해당 사원에 대한 정보를 불러올 handler
  const clickEmpItem = () => {
    console.log(orgaNo);
    getEmpInformation(orgaNo).then((data) => {
      console.log("해당 사원의 정보 : ", data);
      setEmpInfo(data);
    });
  };

  return (
    <EmpItemDiv onClick={() => { clickEmpItem(); }}>
      <EmpInfo paddingBtm="0.3" fontSize="1.3" fontWeight="bold">{empName} / {empRank} | {username}</EmpInfo>
      <EmpInfo>{path}</EmpInfo>
      <EmpInfo paddingTop="1">📞 {empPhone}</EmpInfo>
    </EmpItemDiv>
  );
}

const EmpItemDiv = styled.div`
  border: 1px solid darkgray;
  margin: 0.5em 1em 0.5em 1em;
  padding: 1em 1em 1em 1em;
`;

const EmpInfo = styled.div`
  padding-top: ${(props) => props.paddingTop}em;
  padding-bottom: ${(props) => props.paddingBtm}em;
  font-size: ${(props) => props.fontSize}em;
  font-weight: ${(props) => props.fontWeight};
`;

export default OrgatreeEmpItem;
