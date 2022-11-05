import React, { useState } from "react";
import "./employeestyle.css";
import request from "../../utils/axiosUtil";


function EmpInformation({ emps, clickEmpList, empInfo, clickEmpAdd }) {
  return (
    <div className="pageLine">
      <div className="empList"> div2-1
        <span>사용자 : {emps.length} 명</span> <span>정렬▼</span>
        {emps.map(({ empNo, username, empName, firstHiredate }) => (
          <div className="empItem" key={empNo} onClick={() => clickEmpList(empNo)} aria-hidden="true">
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
        <button type="button" onClick={() => { clickEmpAdd(); }}>추가</button>
        <button type="button">수정</button>
        <button type="button">삭제</button>

        <div className="empBasicInformation">
          <div className="category">사진</div>
          <div className="info">{empInfo.empProfile}</div>

          <div>이름</div>
          <div>{empInfo.empName}</div>

          <div>ID</div>
          <div>{empInfo.username}</div>

          <div>비밀번호</div>
          <div>{empInfo.password}</div>

          <div>성별</div>
          <div>{empInfo.gender}</div>

          <div>이메일</div>
          <div>{empInfo.email}</div>

          <div>휴대전화</div>
          <div>{empInfo.empPhone}</div>

          <div>주소</div>
          <div>{empInfo.empAddress}</div>

          <div>최초입사일</div>
          <input type="date" value={empInfo.firstHiredate} readOnly />

          <div>최종퇴사일</div>
          <input type="date" value={empInfo.lastRetiredate} readOnly />
        </div>

      </div>
    </div>
  );
}

export default EmpInformation;
