import React, { useState } from "react";
import { useSelector } from "react-redux";

function SearchBox() {
  const { companyName } = useSelector((state) => state.roleGroup);
  const [searchText, setSearchText] = useState("");

  const onClickSearchBtn = () => {
    if (searchText === "") {
      alert("검색할 권한그룹명을 입력해주세요.");
    }
  };

  return (
    <div className="searchDiv">
      <div className="comName">{companyName}</div>
      <input className="comNameInput" type="text" placeholder="검색할 권한그룹명을 입력하세요." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <button type="button" onClick={() => onClickSearchBtn()}>🔍</button>
    </div>
  );
}

export default SearchBox;
