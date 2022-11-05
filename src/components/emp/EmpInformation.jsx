import React, { useState } from "react";
import "./employeestyle.css";
import request from "../../utils/axiosUtil";


function EmpInformation({ emps, clickEmpList, empInformation, clickEmpRegister,
  changeEmpInput, clickEmpModify }) {
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
        <div>
          <span>빨간색은 필수 입력 항목입니다.</span>
        </div>
        <div>
          <span>검정색은 변경 불가 항목입니다.</span>
        </div>

        <button type="button" onClick={() => { clickEmpRegister(); }}>추가</button>
        <button type="button" onClick={() => { clickEmpModify(); }}>수정</button>
        <button type="button">삭제</button>

        <div className="empBasicInformation">
          <div className="category">{empInformation.empProfile}</div>
          <div className="info">
            <input type="file" />
          </div>

          <div>이름</div>
          <input
            type="text"
            name="empName"
            value={empInformation.empName}
            onChange={(e) => { changeEmpInput(e); }}
            className="essential"
          />

          <div>ID</div>
          <div className="unchangeable">{empInformation.username}</div>

          <div>비밀번호</div>
          <input
            type="text"
            name="password"
            value={empInformation.password}
            onChange={(e) => { changeEmpInput(e); }}
            className="essential"
          />

          <div>성별</div>
          <select name="gender" value={empInformation.gender} onChange={(e) => { changeEmpInput(e); }}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>


          <div>이메일</div>
          <input
            type="text"
            name="email"
            value={empInformation.email}
            onChange={(e) => { changeEmpInput(e); }}
          />

          <div>휴대전화</div>
          <input
            type="text"
            name="empPhone"
            value={empInformation.empPhone}
            onChange={(e) => { changeEmpInput(e); }}
          />

          <div>주소</div>
          <input
            type="text"
            name="empAddress"
            value={empInformation.empAddress}
            onChange={(e) => { changeEmpInput(e); }}
          />

          <div>최초입사일</div>
          <input type="date" value={empInformation.firstHiredate} readOnly className="unchangeable" />

          <div>최종퇴사일</div>
          <input type="date" value={empInformation.lastRetiredate} readOnly className="unchangeable" />
        </div>

      </div>
    </div>
  );
}

export default EmpInformation;
