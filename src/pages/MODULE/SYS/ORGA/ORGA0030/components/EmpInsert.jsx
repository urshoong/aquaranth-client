import React from "react";

function EmpInsert({ company, chengeEmpInput, clickEmpAdd, clickMoveEmpListPage, idCheck }) {
  return (
    <div>
      <span>사원 정보 추가하기</span>

      <div>
        {/* 회사 목록 selector */}
        <div>
          회사 :
          <select name="companyNo" onChange={(e) => { chengeEmpInput(e); }}>
            <option value="-">--회사 선택--</option>
            {company.map((com) => <option value={com.companyNo}>{com.companyName}</option>)}
          </select>

          {/* 예시. 나중에 경민이꺼 완성되고 pull하면 가져오기. */}
          부서 :
          <select name="deptNo" onChange={(e) => { chengeEmpInput(e); }}>
            <option value="-">--부서 선택--</option>
            <option value="1">개발팀</option>
            <option value="2">개발 1팀</option>
            <option value="3">개발 2팀</option>
            <option value="4">개발 3팀</option>
            <option value="5">인사팀</option>
            <option value="6">인사 1팀</option>
            <option value="7">인사 2팀</option>
          </select>

          직급 :
          <select name="empRank" onChange={(e) => { chengeEmpInput(e); }}>
            <option value="-">--직급 선택--</option>
            <option value="회장">회장</option>
            <option value="사장">사장</option>
            <option value="이사">이사</option>
            <option value="부장">부장</option>
            <option value="과장">과장</option>
            <option value="대리">대리</option>
            <option value="주임">주임</option>
            <option value="사원">사원</option>
            <option value="인턴">인턴</option>
            <option value="일용직">일용직</option>
          </select>

        </div>

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
          <input type="text" name="username" onChange={(e) => { chengeEmpInput(e); }} onBlur={(e) => { idCheck(e); }} />
        </div>

        <div>
          <span> 비밀번호 </span>
          <input type="password" name="password" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span> 성별 </span>
          <select name="gender" onChange={(e) => { chengeEmpInput(e); }}>
            <option value="-">--성별 선택--</option>
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
          <input /> <button type="button">우편번호</button>
          <input type="text" name="empAddress" onChange={(e) => { chengeEmpInput(e); }} />
        </div>

        <div>
          <span>권한</span>
          <input name="admin" type="radio" value="false" />일반
          <input name="admin" type="radio" value="true" />관리자
        </div>

      </div>

      <button type="submit" onClick={() => { clickEmpAdd(); }}>추가하기</button>
      <button type="button" onClick={() => { clickMoveEmpListPage(); }}>목록으로</button>
    </div>
  );
}

export default EmpInsert;
