import React from "react";

function EmpOrgaInformation({ orga, handleOnClickOrgaRegister, orgaDisplay, company,
  handleOnChangeCompany, department, handleOnClickOrgaRegisterSubmit,
  handleOnClickOrgaRegisterReset, handleOnChangeOrgaRegisterInput, handleOnClickOrgaModify,
  handleOnChangeOrgaInput, handleOnClickOrgaModifyDept }) {
  return (
    <div>

      <button type="button" onClick={() => { handleOnClickOrgaRegister(); }}>추가</button>

      <div style={{ display: orgaDisplay }}>
        <form>
          <div>
            회사 :
            <select name="companyNo" onChange={(e) => { handleOnChangeCompany(e); }}>
              <option value="-" key="-">--회사 선택--</option>
              {company.map((com) => (
                <option key={com.companyNo} value={com.companyNo}>
                  {com.companyName}
                </option>
              ))}
            </select>
          </div>

          <div>
            부서 :
            <select name="deptNo" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }}>
              <option value="-" key="-">--부서 선택--</option>
              {department.map((dept) => (
                <option key={dept.deptNo} value={dept.deptNo}>
                  {dept.deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            직급 :
            <select name="empRank" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }}>
              <option value="-">--직급 선택--</option>
              <option value="회장" key="회장">회장</option>
              <option value="사장" key="사장">사장</option>
              <option value="이사" key="이사">이사</option>
              <option value="부장" key="부장">부장</option>
              <option value="과장" key="과장">과장</option>
              <option value="대리" key="대리">대리</option>
              <option value="주임" key="주임">주임</option>
              <option value="사원" key="사원">사원</option>
              <option value="인턴" key="인턴">인턴</option>
              <option value="일용직" key="일용직">일용직</option>
            </select>
          </div>

          <div>
            <span>권한</span>
            <input name="empRole" type="radio" value="ROLE_USER" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }} />일반
            <input name="empRole" type="radio" value="ROLE_ADMIN" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }} />관리자
          </div>

          <button type="submit" onClick={() => { handleOnClickOrgaRegisterSubmit(); }}>추가하기</button>
          <button type="reset" onClick={() => { handleOnClickOrgaRegisterReset(); }}>취소하기</button>
        </form>
      </div>


      {orga?.map(({ companyName, deptName, empRank, hiredDate, retiredDate,
        companyTel, companyAddress, orgaNo, deptMain, empRole, companyNo, deptNo }) => (
        <div key={orgaNo}>
            <button type="button" onClick={() => { handleOnClickOrgaModify(); }}>수정</button>
            <button type="button">삭제</button>

            <div className="empBasicInformation">
            <div>회사/부서</div>
            <div>
                <input className="unchangeable" value={companyName} readOnly />
                <input className="essential" name="deptName" value={deptName} onChange={(e) => { handleOnChangeOrgaInput(e); }} />

                <select
                name="deptNo"
                onMouseDown={() => { handleOnClickOrgaModifyDept(companyNo); }}
                onChange={(e) => { handleOnChangeOrgaInput(e); }}
              >
                <option value={deptNo}>{deptName}</option>
                {department?.map((dept) => (
                    <option key={dept.deptNo} value={dept.deptNo}>
                    {dept.deptName}
                  </option>
                ))}
              </select>

              </div>

            <div>사번</div>
            <div>
                <input className="unchangeable" value={orgaNo} readOnly />
              </div>

            <div>부서구분</div>
            <div readOnly className="unchangeable">
                <input name={`deptMain${orgaNo}`} type="radio" value="true" checked={deptMain === true} readOnly />주부서
                <input name={`deptMain${orgaNo}`} type="radio" value="false" checked={deptMain === false} readOnly />부부서
              </div>

            <div>직급</div>

            <select className="essential" name="empRank" onChange={(e) => { handleOnChangeOrgaInput(e); }}>
                <option value={empRank}>{empRank}</option>
                <option value="회장" key="회장">회장</option>
                <option value="사장" key="사장">사장</option>
                <option value="이사" key="이사">이사</option>
                <option value="부장" key="부장">부장</option>
                <option value="과장" key="과장">과장</option>
                <option value="대리" key="대리">대리</option>
                <option value="주임" key="주임">주임</option>
                <option value="사원" key="사원">사원</option>
                <option value="인턴" key="인턴">인턴</option>
                <option value="일용직" key="일용직">일용직</option>
              </select>


            <div>입사일 <input className="unchangeable" type="date" value={hiredDate} readOnly /></div>
            <div>퇴사일 <input type="date" value={retiredDate} name="retiredDate" onChange={(e) => { handleOnChangeOrgaInput(e); }} /></div>

            <div>회사 전화번호</div>
            <div><input value={companyTel} readOnly className="unchangeable" /></div>

            <div>회사 주소</div>
            <div><input value={companyAddress} readOnly className="unchangeable" /></div>

            <div>
                <span>권한</span>
              </div>
            <div>
                <input name={`empRole${orgaNo}`} type="radio" value="ROLE_USER" checked={empRole === "ROLE_USER"} onChange={(e) => { handleOnChangeOrgaInput(e); }} />일반
                <input name={`empRole${orgaNo}`} type="radio" value="ROLE_ADMIN" checked={empRole === "ROLE_ADMIN"} onChange={(e) => { handleOnChangeOrgaInput(e); }} />관리자
              </div>
          </div>
          </div>
      ))}
    </div>
  );
}

export default EmpOrgaInformation;
