import React from "react";
import "./employeestyle.css";
//
// {emps.map((emp) => <div>{emp.empName}</div>)}

function EmpInformation({ emps }) {
  console.log(emps);
  return (

    <div className="pageLine">
      <div className="empList"> div2-1
        <span>사용자 : n 명</span> <span>정렬▼</span>
        {emps.map((emp) => (
          <div className="empItem">

            <div className="empItemImg">사진 </div>
            <div className="empIdName">
              <div>
                {emp.username}
              </div>
              <div>
                {emp.empName}
              </div>
            </div>
            <div>
              {emp.firstHiredate}
            </div>
          </div>
        ))}
      </div>

      <div className="infoPage">2-2
        <span>selectOne</span>
      </div>
    </div>
  );
}

export default EmpInformation;
