import React from "react";

function UserMenu(props) {
  return (
    <>
      <div className="section roleGroup left">
        <div className="leftSection header">
          <div className="selectWrap">
            <select className="companySelect">
              <option>메뉴1</option>
              <option>메뉴2</option>
              <option>메뉴3</option>
            </select>
          </div>
          <div className="searchWrap">
            <input type="text" className="searchInput" placeholder="권한명을 검색하세요." />
            <button type="button" className="btn searchBtn">🔍</button>
          </div>
        </div>
        <div className="leftSection section2">
          본문내용
        </div>
      </div>
      <div className="section roleGroup right">
        페이지 메뉴를 선택해 주세요
      </div>
    </>
  );
}

export default UserMenu;
