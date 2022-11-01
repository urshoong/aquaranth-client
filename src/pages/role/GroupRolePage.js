import React from 'react';
import '../../styles/groupRoleStyle.css';

function GroupRolePage(props) {
  return (
    <div className="wrapper">
      <div className="role-header">권한그룹설정</div>
      <div className="role-body">
        <div className="information">권한 그룹을 설정하고...</div>
        <div className="role-content">
          <div className="content-left b">
            <div className="search">
              <input className="input" type={"text"}/><br/>
              <input className="input" type={"text"}/>
              <button className="button">찾기</button>
            </div>
            <div className="flex-container">
              <div>그룹: 138개</div>
              <div>필터</div>
            </div>
            <div className="group-list">
              <div className="group-item b">권한그룹1</div>
              <div className="group-item b">권한그룹2</div>
              <div className="group-item b">권한그룹3</div>
            </div>
            <div className="footer">
              <button className="button">추가</button>
              <div>paging</div>
            </div>
          </div>
          <div className="content-right b"></div>
        </div>
      </div>
    </div>
  );
}

export default GroupRolePage;
