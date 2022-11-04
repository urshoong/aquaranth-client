import React from "react";
import "./comLayout.css";

function ComLayout({ comList }) {
  return (
    <div className="firstOutDiv">
      <div className="headLine">
        <span className="comManage">회사관리</span>
      </div>
      <div className="mainDiv">
        <div className="searchDiv">
          <span className="comName">회사</span>
          <input className="comNameInput" type="text" placeholder="회사코드/회사명을 입력하세요." />
          <span className="comUse">사용여부</span>
          <select className="comUseSelect">
            <option>사용</option>
            <option>미사용</option>
          </select>
          <button className="searchBt">🔍</button>
        </div>
        <div className="listInfoDiv">
          <div className="comList">
            {comList?.map(({ companyNo, companyName, ownerName, companyUse }) => (
              <div className="comListDiv">
                <div>{companyNo}</div>
                <div>{ownerName}</div>
                <div>{companyName}</div>
                <div>{companyUse ? "사용" : "미사용"} </div>
              </div>
            ))}
            <div className="listRegisterDiv">+ ㅁ추가</div>
          </div>
          <div className="comInfo" />
        </div>
      </div>
    </div>
  );
}

export default ComLayout;
