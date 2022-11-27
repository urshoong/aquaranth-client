import React from "react";

function EmpBasicInformation({ clickEmpRegister, clickEmpModify,
  empInformation, changeEmpInput, handleOnRegisterModal }) {
  return (
    <div>
      <button type="button" onClick={() => { handleOnRegisterModal(); }}>추가</button>
      <button type="button" onClick={() => { clickEmpModify(); }}>수정</button>

      <div className="empBasicInformation">
        <div className="category" />
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
          readOnly
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

        <div>최초입사일</div>
        <input type="date" name="firstHiredDate" value={empInformation.firstHiredDate} readOnly className="unchangeable" />

        <div>최종퇴사일</div>
        <input type="date" name="lastRetiredDate" value={empInformation.lastRetiredDate === null ? "" : empInformation.lastRetiredDate} onChange={(e) => { changeEmpInput(e); }} />

        <div>
          <span>계정 사용</span>
        </div>
        <div>
          <input name="empUse" type="radio" value="true" checked={empInformation.empUse === true} onChange={(e) => { changeEmpInput(e); }} />사용
          <input name="empUse" type="radio" value="false" checked={empInformation.empUse === false} onChange={(e) => { changeEmpInput(e); }} />미사용
        </div>
      </div>
    </div>
  );
}

export default EmpBasicInformation;
