import React, { useState } from "react";
import "./employeestyle.css";
import request from "../../utils/axiosUtil";


function EmpFrame({ emps, empListClick, empInfo }) {
  return (
    <div className="pageLine">
      <div className="empList"> div2-1
        <span>사용자 : {emps.length} 명</span> <span>정렬▼</span>
        {emps.map(({ empNo, username, empName, firstHiredate }) => (
          <div className="empItem" key={empNo} onClick={() => empListClick(empNo)} aria-hidden="true">
            <div className="empItemImg">사진 </div>
            <div className="empIdName">
              <div>
                {username}
              </div>
              <div>
                {empName}
              </div>
            </div>
            <div>
              {firstHiredate}
            </div>
          </div>
        ))}
      </div>


      <div className="infoPage">
        <span>●상세정보</span>
        <div>{empInfo.empName}</div>

      </div>
    </div>
  );
}

export default EmpFrame;
