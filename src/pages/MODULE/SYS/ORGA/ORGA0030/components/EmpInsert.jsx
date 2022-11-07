import React from "react";

function EmpInsert({ chengeEmpInput, clickEmpAdd, clickMoveEmpListPage }) {
  return (
    <div>
      <span>사원 정보 추가하기</span>

      <div>
        <div>
          <div className="empItemImg">사진</div>
          <input type="file" name="empProfile" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 이름 </span>
          <input type="text" name="empName" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> ID </span>
          <input type="text" name="username" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 비밀번호 </span>
          <input type="text" name="password" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 성별 </span>
          <select name="gender" onChange={(e) => { chengeEmpInput(e); }}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div>
          <span> 이메일 </span>
          <input type="text" name="email" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 휴대전화 </span>
          <input type="text" name="empPhone" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 주소 </span>
          <input type="text" name="empAddress" onChange={(e) => { chengeEmpInput(e); }} />
        </div>
      </div>

      <button type="submit" onClick={() => { clickEmpAdd(); }}>추가하기</button>
      <button type="button" onClick={() => { clickMoveEmpListPage(); }}>목록으로</button>
    </div>
  );
}

export default EmpInsert;
