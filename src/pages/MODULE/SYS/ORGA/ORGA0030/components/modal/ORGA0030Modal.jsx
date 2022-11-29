import React, { useEffect, useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider, Span } from "@components/Grid";
import { useHistory } from "react-router-dom";
import axios from "axios";
import request from "../../../../../../../utils/axiosUtil";

const empInfo = async () => {
  const { data } = await request.get("/emp/loginlist");
  return data;
};

const registerLoginUser = async (user) => {
  const { data } = await request.post("/emp/registerLoginUser", user);
  return data;
};

const initState = {
  loginCompanyNo: 0,
  loginDeptNo: 0,
};


const ORGA0030Modal = (props) => {
  const [employeeState, setEmployeeState] = useState([]);
  const [selectLogin, setSelectLogin] = useState(initState);
  const history = useHistory();


  // 회사, 부서 set
  useEffect(() => {
    empInfo().then((data) => {
      console.log(data);
      setEmployeeState(data);
    });
  }, []);

  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  // 라디오 버튼 변경
  // const handleOnChangeRadio = (e) => {
  //   const { value } = e.target;
  //
  //   console.log("라디오 변경 시, 선택된 company값", value);
  //
  //   // 선택된 부서의 번호 가져오기.
  //   if (e.target.name === "loginDeptNo") {
  //     const deptName = e.target.name;
  //   } // 아니면  select인 dept로 해야하나..?
  //   // const deptNo = deptName.options[deptName.selectedIndex].value;
  //
  //
  //   // 내가 짠 회사 번호 넣는 코드
  //   setSelectLogin({ ...selectLogin, loginCompanyNo: value });
  //   console.log(selectLogin);
  // };
  //
  // // select 변경
  // const handleOnChangeSelect = (e) => {
  //   // target 지정
  //   const { target } = e;
  //
  //   // 선택한 값
  //   console.log(target);
  //
  //   // select 변경하면 회사 번호 알아오기.
  //   // select에 회사 번호를 type을 만들어서 좀 좋은 방법은 아니지만.. 알아온다.
  //   const companyNo = target.getAttribute("data-com");
  //
  //   // 선택된 부서의 번호 알아오기.
  //   const deptNo = target.options[target.selectedIndex].value;
  //
  //   // 선택된 회사 번호와 부서 번호 알아낸다.
  //   console.log("COMPANY---", companyNo, deptNo);
  //
  //
  //   // 이건 일단. deptno넣는거. 예전에 ㅐㄴㅐ가 만들어놓은 코드
  //   setSelectLogin({ ...selectLogin, loginDeptNo: target.value });
  //
  //   console.log(selectLogin);
  // };


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
      // TODO 모달말고 컴포넌트로 바꾸기(?)
    });

    history.replace("/");
    closeModal();
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="접속 회사 선택"
    >
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
    </Modal>
  );
};

export default ORGA0030Modal;
