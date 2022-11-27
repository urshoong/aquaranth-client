import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import { CenterGrid } from "@components/Grid";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import { useHistory } from "react-router-dom";

const empRegister = async (emp) => {
  const { data } = await request.post("/emp/register", emp);
  return data;
};

export const companyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const deptList = async (companyNo) => {
  const { data } = await request.get(`/dept2/readName/${companyNo}`);
  return data;
};

const initState = {
  companyNo: 0,
  deptNo: 0,
  empRank: "",
  empName: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
  empRole: "",
  empUse: 1,
};


function Orga0030RegisterModal(props) {
  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [employee, setEmployee] = useState(initState);
  const [company, setCompany] = useState([]);
  const [department, setDepartment] = useState([]);

  const history = useHistory();

  useEffect(() => {
    companyList()
      .then((data) => {
        setCompany(data);
      });
  }, []);

  // 회사 선택 시 (선택 회사 정보 변경 시) 실행되는 함수
  const handleOnChangeCompany = (e) => {
    const { value } = e.target;
    setEmployee({
      ...employee,
      companyNo: value,
    });
    deptList(value)
      .then((data) => {
        setDepartment(data);
      });
  };

  // 사원 정보 입력값 변경 시 실행되는 함수
  const handleOnChangeEmployee = (e) => {
    const {
      name,
      value,
    } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  /// //////////////
  const idCheck = () => {

  };
  /// //////////////

  const clickEmpAdd = () => {
    empRegister(employee)
      .then(() => {
        setEmployee(employee);
        closeModal();
        history.replace("/SYS/ORGA/ORGA0030");
      });
  };

  const clickMoveEmpListPage = () => {
    history.replace("/SYS/ORGA/ORGA0030");
  };

  return (
    <Modal title="사원 추가">
      <CenterGrid>
        <div>
          <div>
            회사 :
            <select
              name="companyNo"
              onChange={(e) => {
                handleOnChangeCompany(e);
              }}
            >
              <option value="0">--회사 선택--</option>
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
                handleOnChangeEmployee(e);
              }}
            >
              <option value="0">--부서 선택--</option>
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
                handleOnChangeEmployee(e);
              }}
            >
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
            <span> 이름 </span>
            <input
              type="text"
              name="empName"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />
          </div>

          <div>
            <span> ID </span>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
              onBlur={(e) => {
                idCheck(e);
              }}
            />
          </div>

          <div>
            <span> 비밀번호 </span>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />
          </div>

          <div>
            <span> 성별 </span>
            <select
              name="gender"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            >
              <option value="-">--성별 선택--</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>

          <div>
            <span> 이메일 </span>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />
            {/* {...register("email", { required: true })} */}
          </div>

          <div>
            <span> 휴대전화 </span>
            <input
              type="text"
              name="empPhone"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />
          </div>

          <div>
            <span> 주소 </span>
            <input
              type="text"
              name="empAddress"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />
          </div>

          <div>
            <span>권한</span>
            <input
              name="empRole"
              type="radio"
              value="ROLE_USER"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />일반
            <input
              name="empRole"
              type="radio"
              value="ROLE_ADMIN"
              onChange={(e) => {
                handleOnChangeEmployee(e);
              }}
            />관리자
          </div>


          <button
            type="submit"
            onClick={() => {
              clickEmpAdd();
            }}
          >추가하기
          </button>

          <button
            type="button"
            onClick={() => {
              handleCloseModal();
            }}
          >취소/닫기
          </button>
        </div>
      </CenterGrid>
    </Modal>
  );
}

export default Orga0030RegisterModal;
