import React from "react";

function SearchBox({ loginUserCompany }) {
  return (
    <div className="searchDiv">
      <div className="comName">{loginUserCompany.companyName}</div>
      <input className="comNameInput" type="text" placeholder="검색할 권한명을 입력하세요." />
      <button type="button" onClick={() => alert("검색하기 버튼을 클릭하셨습니다.")}>🔍</button>
    </div>
  );
}

export default SearchBox;
