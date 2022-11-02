import React from "react";
import "./userrole.css";

function UserRolePage(props) {
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
          <span className="innerTab">사용자 기준</span>
        </div>
        <div className="content">
          <div className="section left">
            <div className="leftSection header">
              <div className="selectWrap">
                <select className="companySelect">
                  <option>(주)KE향</option>
                  <option>더존</option>
                  <option>카카오</option>
                  <option>삼성</option>
                </select>
              </div>
              <div className="searchWrap">
                <input type="text" className="searchInput" placeholder="권한명을 검색하세요." />
                <button type="button" className="btn searchBtn">🔍</button>
              </div>
            </div>
            <div className="leftSection section1">
              <div className="groupCountWrap">
                <span>그룹 : </span>
                <span>4</span>
                <span>개</span>
              </div>
              <div className="groupSortWrap">
                <select>
                  <option>필터</option>
                  <option>필터2</option>
                  <option>필터3</option>
                </select>
              </div>
            </div>
            <div className="leftSection section2">
              <div className="groupContent active">
                <span>(주)KE향</span>
                <span>관리</span>
              </div>
              <div className="groupContent">
                <span>(주)KE향</span>
                <span>기본권한미사용</span>
              </div>
              <div className="groupContent">
                <span>(주)KE향</span>
                <span>기본권한사용</span>
              </div>
              <div className="groupContent">
                <span>(주)KE향</span>
                <span>일반</span>
              </div>
            </div>
            <div className="leftSection footer">
              <div className="paginationWrap">
                <ul className="pagination">
                  <li className="pageBtn prev">«</li>
                  <li className="pageBtn prev">‹</li>
                  <li className="pageBtn page">1</li>
                  <li className="pageBtn next">›</li>
                  <li className="pageBtn next">»</li>
                  <select className="pageBtn pageSizeSelect">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                  </select>
                </ul>
              </div>
            </div>
          </div>
          <div className="section right">
            <div className="innerTitleWrap">
              <span className="innerTitle">• 사용자 선택</span>
              <button type="button" className="btn orgaBtn">👨‍👨‍👦</button>
            </div>
            <div className="innerInformationWrap">
              <span>௹</span>
              <span>선택한 권한을 사용할 사용자를 선택하세요.</span>
            </div>
            <div className="innerSearchWrap">
              <input type="text" className="innerSearchInput" placeholder="부서 / 직급 / 직책 / 이름 / ID 를 검색 하세요" />
              <button type="button" className="btn innerSearchBtn">🔍</button>
            </div>
            <div className="innerContent">

            </div>
            <div className="innerPaginationWrap">
              <div className="paginationWrap">
                <ul className="pagination">
                  <li className="pageBtn prev">«</li>
                  <li className="pageBtn prev">‹</li>
                  <li className="pageBtn page">1</li>
                  <li className="pageBtn next">›</li>
                  <li className="pageBtn next">»</li>
                  <select className="pageBtn pageSizeSelect">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                  </select>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRolePage;
