import React from 'react';
import '../../styles/groupRoleStyle.css';
import SearchBox from "@components/roleGroup/SearchBox";
import RoleGroupList from "@components/roleGroup/RoleGroupList";

function RoleGroupPage(props) {
  return (
    <div className="wrapper">
      <div className="role-header">권한그룹설정</div>
      <div className="role-body">
        <div className="information">권한 그룹을 설정하고...</div>
        <div className="role-content">
          <div className="content-left b">
            <SearchBox />
            <RoleGroupList />
          </div>
          <div className="content-right b"></div>
        </div>
      </div>
    </div>
  );
}

export default RoleGroupPage;
