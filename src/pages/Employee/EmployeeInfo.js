import React from "react";
import "./EmployeeStyle.css";

// TODO 정렬, 페이징

function EmployeeInfo(props) {
  return (
    <div className="pageLine">

      <div className="empList"> div2-1
        <span>사용자 : n 명</span> <span>정렬▼</span>
        <div className="empItem">
          <div className="empItemImg">사진 </div>
          <div className="empIdName">
            <div>
              ID
            </div>
            <div>
              NAME
            </div>
          </div>
          <div>
            dd
          </div>
        </div>
      </div>

      <div className="infoPage">2-2
        <span>selectOne</span>
      </div>

    </div>
  );
}

export default EmployeeInfo;
