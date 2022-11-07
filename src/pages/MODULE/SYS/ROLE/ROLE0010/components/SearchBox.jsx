import React from "react";

function SearchBox({ companyList }) {
  return (
    <div className="searchDiv">
      <span className="comName">소속회사선택</span>
      <select className="comUseSelect">
        {companyList.map((company) => {
          const {
            companyNo,
            companyName,
          } = company;
          return <option key={companyNo}>{companyName}</option>;
        })}
      </select>
      <input className="comNameInput" type="text" placeholder="회사코드/회사명을 입력하세요." />
      <button type="button">🔍</button>
    </div>
  );
}

export default SearchBox;
