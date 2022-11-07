import React from "react";

const UserRoleUserBasedPage = (props) => {
  console.log("");
  return (
    <div className="innerWrap">
      <div className="innerInformationWrap">
        <span>௹</span>
        <span>선택한 권한을 사용할 사용자를 선택하세요.</span>
      </div>
      <div className="innerSearchWrap">
        <input type="text" className="innerSearchInput" placeholder="부서 / 직급 / 직책 / 이름 / ID 를 검색 하세요" />
        <button type="button" className="btn innerSearchBtn">🔍</button>
      </div>
      <div className="innerContent">
        <div className="section leftMinusRight" />
        <div className="section right-400" />
      </div>
    </div>
  );
};

export default UserRoleUserBasedPage;
