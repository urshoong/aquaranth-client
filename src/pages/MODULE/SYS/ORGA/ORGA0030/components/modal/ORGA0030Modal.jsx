import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider, Span } from "@components/Grid";
import { useHistory } from "react-router-dom";
import request from "../../../../../../../utils/axiosUtil";

const empInfo = async () => {
  const { data } = await request.get("/emp/loginlist");
  console.log(data);
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

  // 라디오 버튼 변경
  const handleOnChangeRadio = (e) => {
    const { value } = e.target;
    setSelectLogin({ ...selectLogin, loginCompanyNo: value });
  };

  // select 변경
  const handleOnChangeSelect = (e) => {
    const { value } = e.target;
    setSelectLogin({ ...selectLogin, loginDeptNo: value });
  };

  // 회사 변경 확인 클릭 버튼
  const handleOnClickChangeDeptSubmit = (e) => {
    console.log(selectLogin);
    registerLoginUser(selectLogin).then(() => {
      // TODO 메인페이지로 histroy, 체크박스 눌리면 select값도 같이 못가져오나..
    });
  };

  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
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
                <input value={info.empName} name="empName" readOnly />
                {info.lastLoginIp}
                {info.lastLoginTime}
                {info.companyList.map((company) => {
                  return (
                    <div key={company.companyNo}>
                      <input
                        name="loginCompanyNo"
                        type="radio"
                        value={company.companyNo}
                        onChange={(e) => { handleOnChangeRadio(e); }}
                        readOnly
                      />
                      {company.companyName}
                      <select name="dept" onChange={(e) => { handleOnChangeSelect(e); }}>
                        <option value="0">--부서 선택--</option>
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
