import React from "react";

function EmpOrgaInformation({ orga }) {
  return (
    <div>
      {orga.orgaNo}
      {orga.map(({ companyName, dname, empNo, empRank, hiredate,
        companyTel, companyAddress, orgaNo }) => (
        <div>
          <button type="button">추가</button>
          <button type="button">수정</button>
          <button type="button">삭제</button>

          <div className="empBasicInformation">
            <div>회사/부서</div>
            <div>
              <input className="unchangeable" value={companyName} />
              <input className="essential" value={dname} />
            </div>

            <div>사번</div>
            <div>
              <input className="unchangeable" value={orgaNo} />
            </div>

            <div>회사구분</div>
            <div>
              <input name="com" type="radio" value="true" />주회사
              <input name="com" type="radio" value="false" />부회사
            </div>

            <div>직급</div>
            <div><input className="essential" value={empRank} /></div>

            <div>입사일 <input className="unchangeable" type="date" value={hiredate} /></div>
            <div>퇴사일 <input /></div>

            <div>회사 전화번호</div>
            <div><input value={companyTel} /></div>

            <div>회사 주소</div>
            <div><input value={companyAddress} /></div>

            <div>
              <span>권한</span>
            </div>
            <div>
              <input name="admin" type="radio" value="false" />일반
              <input name="admin" type="radio" value="true" />관리자
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmpOrgaInformation;
