import React from "react";
import UserRoleUserBasedPage from "@pages/MODULE/SYS/ROLE/ROLE0020/UserRoleUserBasedPage";

const Index = () => {
  console.log("Board");
  return (
    <div className="wrap">
      <div className="titleWrap">
        <span className="title">사용자권한설정</span>
        <div className="titleBtnDiv">
          <button type="button" className="btn">마스터권한설정</button>
        </div>
      </div>
      <div className="contentWrap">
        <div className="innerTabWrap">
          <span className="innerTab active">권한그룹기준</span>
          <span className="innerTab">사용자asdsa 기준</span>
        </div>
        <div className="content">
          {/* 권한그룹기준 페이지 */}
          {/* <UserRoleRoleGroupBasedPage /> */}
          {/* 사용자기준 페이지 */}
          <UserRoleUserBasedPage />
        </div>
      </div>
    </div>
  );
};

export default Index;
