import React from "react";
import "../../Company.css";

// 회사 리스트 아이템 component
function CompanyListItem({ item, clickCompanyListItem }) {
  const { companyNo, companyName, ownerName, companyUse } = item;

  return (
    <div
      className="companyListItemDiv"
      onClick={() => { clickCompanyListItem(companyNo); }}
      onKeyDown={companyNo}
    >
      <div>{companyNo}</div>
      <div>{ownerName}</div>
      <div>{companyName}</div>
      <div
        className="companyUseItemDiv"
        style={companyUse ? { backgroundColor: "#6bb4ff" }
          : { backgroundColor: "#4b7dff" }}
      >{companyUse ? "사용" : "미사용"}
      </div>
    </div>
  );
}

export default CompanyListItem;
