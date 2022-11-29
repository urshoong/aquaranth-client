import React from "react";
import styled from "styled-components";
import CompanyListItem from "./CompanyListItem";
import CompanyCount from "./CompanyCount";

// 회사 정보 리스트 component
function CompanyList({ list, setList, clickCompanyListItem, clickCompanyRegister }) {
  return (
    <CompanyListDiv>
      <CompanyCountItemDiv>
        <CompanyCount list={list} setList={setList} />
      </CompanyCountItemDiv>
      <CompanyItemDiv>
        {list.map((item) => (
          <CompanyListItem
            item={item}
            key={item.companyNo}
            clickCompanyListItem={clickCompanyListItem}
          />
        ))}
      </CompanyItemDiv>
      <CompanyRegisterBtnDiv>
        <CompanyRegisterBtn type="submit" onClick={clickCompanyRegister}>⊕ 추가</CompanyRegisterBtn>
      </CompanyRegisterBtnDiv>
    </CompanyListDiv>
  );
}

const CompanyListDiv = styled.div`
  border: 1px solid darkgray;
  height: 72vh;
  width: 20vw;
  display: grid;
  grid-template-rows: 1fr 15fr 2fr;
  margin-top: 1em;
`;

const CompanyCountItemDiv = styled.div`
  font-size: 1.3em;
  padding-top: 0.3em;
  padding-left: 0.5em;
  border-bottom: 1px solid darkgray;
`;

const CompanyItemDiv = styled.div`
  overflow: auto;
`;

const CompanyRegisterBtnDiv = styled.div`
  border-top: 1px solid darkgray;
  display: flex;
  justify-content: center;
`;

const CompanyRegisterBtn = styled.button`
  font-size: 1.2em;
  color: #888888;
`;

export default CompanyList;
