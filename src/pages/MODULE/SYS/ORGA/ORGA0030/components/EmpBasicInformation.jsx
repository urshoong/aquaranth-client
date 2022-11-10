import React from "react";

function EmpBasicInformation({ clickEmpRegister, clickEmpModify, clickEmpRemove,
  empInformation, changeEmpInput }) {
  return (
    <div>
      <button type="button" onClick={() => { clickEmpRegister(); }}>추가</button>
      <button type="button" onClick={() => { clickEmpModify(); }}>수정</button>
      <button type="button" onClick={() => { clickEmpRemove(); }}>삭제</button>

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
          onChange={(e) => { changeEmpInput(e); }}
          className="essential"
        />

        <div>성별</div>
        <select name="gender" value={empInformation.gender} onChange={(e) => { changeEmpInput(e); }}>
          <option value="-">--성별 선택--</option>
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

        <div>
          <span>권한</span>
        </div>
        <div>
          <input name="admin" type="radio" value="false" />일반
          <input name="admin" type="radio" value="true" />관리자
        </div>

        <div>최초입사일</div>
        <input type="date" value={empInformation.firstHiredate} readOnly className="unchangeable" />

        <div>최종퇴사일</div>
        <input type="date" value={empInformation.lastRetiredate} readOnly className="unchangeable" />
      </div>
    </div>
  );
}

export default EmpBasicInformation;
