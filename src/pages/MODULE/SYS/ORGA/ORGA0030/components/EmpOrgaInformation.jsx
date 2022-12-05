import React from "react";

function EmpOrgaInformation({
  orga,
  handleOnClickOrgaRegister,
  orgaDisplay,
  company,
  handleOnChangeCompany,
  department,
  handleOnClickOrgaRegisterSubmit,
  handleOnClickOrgaRegisterReset,
  handleOnChangeOrgaRegisterInput,
  handleOnClickOrgaModify,
  handleOnChangeOrgaInput,
  handleOnClickOrgaModifyDept,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleOnClickOrgaRegister();
        }}
      >추가
      </button>

      <div style={{ display: orgaDisplay }}>
        <form>
          <div>
            회사 :
            <select
              name="companyNo"
              onChange={(e) => {
                handleOnChangeCompany(e);
              }}
            >
              <option value="0" key="-">--회사 선택--</option>
              {company.map((com) => (
                <option key={com.companyNo} value={com.companyNo}>
                  {com.companyName}
                </option>
              ))}
            </select>
          </div>

          <div>
            부서 :
            <select
              name="deptNo"
              onChange={(e) => {
                handleOnChangeOrgaRegisterInput(e);
              }}
            >
              <option value="0" key="-">--부서 선택--</option>
              {department.map((dept) => (
                <option key={dept.deptNo} value={dept.deptNo}>
                  {dept.deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            직급 :
            <select
              name="empRank"
              onChange={(e) => {
                handleOnChangeOrgaRegisterInput(e);
              }}
            >
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

          <button
            type="submit"
            onClick={() => {
              handleOnClickOrgaRegisterSubmit();
            }}
          >추가하기
          </button>
          <button
            type="button"
            onClick={() => {
              handleOnClickOrgaRegisterReset();
            }}
          >취소하기
          </button>
        </form>
      </div>

      {orga?.map((target) => {
        const {
          companyName,
          deptName,
          empRank,
          hiredDate,
          retiredDate,
          companyTel,
          companyAddress,
          orgaNo,
          deptMain,
          // empRole,
          companyNo,
          deptNo,
        } = target;

        return (
          <div key={orgaNo}>

            <button
              type="button"
              onClick={() => {
                handleOnClickOrgaModify({ orgaNo });
              }}
            >수정
            </button>

            <div className="empBasicInformation">
              <div>회사/부서</div>

              <div>
                <input className="unchangeable" value={companyName} readOnly />
                <select
                  name="deptNo"
                  onMouseDown={() => {
                    handleOnClickOrgaModifyDept(companyNo);
                  }}
                  onChange={(e) => {
                    handleOnChangeOrgaInput(e, target);
                  }}
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
              <div className="unchangeable">
                <input
                  name={`deptMain${orgaNo}`}
                  type="radio"
                  value="true"
                  checked={deptMain === true}
                  readOnly
                />주부서
                <input
                  name={`deptMain${orgaNo}`}
                  type="radio"
                  value="false"
                  checked={deptMain === false}
                  readOnly
                />부부서
              </div>

              <div>직급</div>

              <select
                className="essential"
                name="empRank"
                onChange={(e) => {
                  handleOnChangeOrgaInput(e, target);
                }}
              >
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

              <div>입사일 <input className="unchangeable" type="date" value={hiredDate} readOnly />
              </div>
              <div>퇴사일 <input
                type="date"
                value={retiredDate === null ? "" : retiredDate}
                name="retiredDate"
                onChange={(e) => {
                  handleOnChangeOrgaInput(e, target);
                }}
              />
              </div>

              <div>회사 전화번호</div>
              <div><input value={companyTel} readOnly className="unchangeable" /></div>

              <div>회사 주소</div>
              <div><input
                value={companyAddress}
                readOnly
                className="unchangeable"
                style={{ width: "300px" }}
              />
              </div>


            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmpOrgaInformation;
