import React from "react";
import styled from "styled-components";
import OrgatreeEmpItem from "./OrgatreeEmpItem";


function OrgatreeEmpList({ empList, setEmpInfo, clickFavoriteEmp }) {
  return (
    <EmpListDiv>
      {empList.map((empInfo) => (
        <OrgatreeEmpItem
          key={empInfo.orgaNo}
          mygroupNo={empInfo.mygroupNo}
          empInfo={empInfo}
          setEmpInfo={setEmpInfo}
          clickFavoriteEmp={clickFavoriteEmp}
        />
      ))}
    </EmpListDiv>
  );
}

const EmpListDiv = styled.div`
  border-top: 2px solid darkgray;
  overflow: auto;
  height: 30rem;
`;

export default OrgatreeEmpList;
