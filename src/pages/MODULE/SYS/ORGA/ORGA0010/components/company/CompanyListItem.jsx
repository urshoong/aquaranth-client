import React from "react";
import styled from "styled-components";

// 회사 리스트 아이템 component
function CompanyListItem({ item, clickCompanyListItem }) {
  const { companyNo, companyName, ownerName, companyUse } = item;

  return (
    <CompanyListItemDiv
      onClick={() => { clickCompanyListItem(companyNo); }}
    >
      <div>{companyNo}</div>
      <div>{ownerName}</div>
      <div>{companyName}</div>
      <CompanyUseItemDiv
        style={companyUse ? { backgroundColor: "#6bb4ff" }
          : { backgroundColor: "#4b7dff" }}
      >{companyUse ? "사용" : "미사용"}
      </CompanyUseItemDiv>
    </CompanyListItemDiv>
  );
}

const CompanyListItemDiv = styled.div`
  width: 23em;
  height: 6em;
  border: 1px solid darkgray;
  border-radius: 0.5rem;
  justify-items: center;
  margin: 0.5em 0.5em 0.5em 0.5em;
  padding-top: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CompanyUseItemDiv = styled.div`
  border: 1px solid;
  border-radius: 1rem;
  height: 2em;
  width: 4em;
  padding-top: 0.2em;
  text-align: center;
  color: white;
`;

export default CompanyListItem;
