import React, { useState } from "react";
import "./userrole.css";

import UserRoleRoleGroupBasedPage from "@pages/MODULE/SYS/ROLE/ROLE0020/UserRoleRoleGroupBasedPage";
import UserRoleUserBasedPage from "@pages/MODULE/SYS/ROLE/ROLE0020/UserRoleUserBasedPage";

const initPageChange = {
  pageName: "UserRoleRoleGroupBasedPage",
};

function Index() {
  const [pageChange, setPageChange] = useState(initPageChange);

  const userRolePageClickHandler = (e) => {
    const pageName = e.target.dataset?.name;
    setPageChange({ pageName });
  };

  return (
    <div className="userRoleWrap">
      <div className="titleWrap">
        <span className="title">사용자권한설정</span>
        <div className="titleBtnDiv">
          {/* <button type="button" className="btn">마스터권한설정</button> */}
        </div>
      </div>
      <div className="contentWrap">
        <div className="innerTabWrap">
          <span className={`innerTab ${pageChange?.pageName === "UserRoleRoleGroupBasedPage" ? "active" : ""}`} data-name="UserRoleRoleGroupBasedPage" onClick={userRolePageClickHandler} aria-hidden="true">권한그룹기준</span>
          <span className={`innerTab ${pageChange?.pageName === "UserRoleUserBasedPage" ? "active" : ""}`} data-name="UserRoleUserBasedPage" onClick={userRolePageClickHandler} aria-hidden="true">사용자 기준</span>
        </div>
        <div className="content">
          {pageChange?.pageName === "UserRoleRoleGroupBasedPage" && <UserRoleRoleGroupBasedPage />}
          {pageChange?.pageName === "UserRoleUserBasedPage" && <UserRoleUserBasedPage />}
        </div>
      </div>
    </div>

  );
}

export default Index;
