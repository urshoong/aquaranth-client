import React, { useEffect, useState } from "react";
import { CenterGrid } from "@components/Grid";
import { useHistory } from "react-router-dom";
import { empInfo, registerLoginUser } from "@pages/auth/Profile/api/profile";

const Index = () => {
  const initState = {
    loginCompanyNo: 0,
    loginDeptNo: 0,
  };

  const [employeeState, setEmployeeState] = useState([]);
  const [selectLogin, setSelectLogin] = useState(initState);
  const history = useHistory();


  // 회사, 부서 set
  useEffect(() => {
    empInfo().then((data) => {
      setEmployeeState(data);
    });
  }, []);

  // 회사 변경 확인 클릭 버튼
  const handleOnClickChangeDeptSubmit = (e) => {
    // 클래스 companyDiv 내의 모든 요소를 가져온다.
    const companyDivs = document.querySelectorAll(".companyDiv");

    // 유사 배열
    // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
    // 가져온 요소들을 각 각 새로운 배열로 만들어 반환한다.
    Array.prototype.map.call(companyDivs, (companyDiv) => {
      console.log(companyDiv);
      // 타입이 라디오인 요소 선택
      const radio = companyDiv.querySelector("input[type='radio']");
      // 타입이 셀렉인 요소 선택
      const select = companyDiv.querySelector("select");


      console.log(radio);
      console.log(radio.checked);
      // 라디오 체크된 부분의 radio값과 select값을 입력해준다.
      if (radio.checked) {
        selectLogin.loginCompanyNo = radio.value;
        selectLogin.loginDeptNo = select.value;
        setSelectLogin({ ...selectLogin });
      }

      console.log("selectLogin", selectLogin);
    });

    registerLoginUser(selectLogin).then(() => {
      location.href = "/";
      location.reload();
      // TODO 모달말고 컴포넌트로 바꾸기(?)
    });
  };

  return (
    <CenterGrid>
      <div>
        {employeeState.map((info) => {
          return (
            <div key={info.empNo}>
              <div>{info.empName}</div>
              <div>최근 접속 IP : {info.lastLoginIp}</div>
              <div>최근 로그인 시간 : {info.lastLoginTime}</div>
              <div>현재 접속 IP : {info.loginIp}</div>

              {info.companyList.map((company) => {
                return (
                  <div key={company.companyNo} className="companyDiv">
                    <input
                      name="loginCompanyNo"
                      type="radio"
                      value={company.companyNo}
                      // onChange={(e) => { handleOnChangeRadio(e); }}
                      readOnly
                    />
                    {company.companyName}
                    <select name="dept">
                      {company.deptList.map((dept) => {
                        return (
                          <option key={dept.deptNo} value={dept.deptNo} name="loginDeptNo">
                            {dept.deptName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
          );
        })}
        <button type="submit" onClick={() => { handleOnClickChangeDeptSubmit(); }}>확인</button>
        {/* <button type="reset" onClick={() => { handleCloseModal(); }}>취소</button> */}
      </div>

    </CenterGrid>
  );
};

export default Index;
