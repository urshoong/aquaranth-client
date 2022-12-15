import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import { companyList } from "@pages/MODULE/SYS/ORGA/ORGA0030/pages/Insert";
import Swal from "sweetalert2";
import {
  EmpButtonWrapper,
  EmpInsertBody, EmpInsertButton, EmpInsertExplainDiv,
  EmpInsertHeader, EmpInsertSelect,
  EmpInsertWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const deptList = async (companyNo) => {
  const { data } = await request.get(`/dept2/readName/${companyNo}`);
  return data;
};

const empOrgaRegister = async (orga) => {
  const { data } = await request.post("/emp/registerOrga", orga);
  return data;
};


const orgaInitState = {
  empNo: 0,
  companyNo: 0,
  deptNo: 0,
  empRank: "",
  orgaNo: 0,
  retiredDate: "",
};

function RegisterOrgaModal({ orga, clickOrga }) {
  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [orgaChange, setOrgaChange] = useState(orgaInitState);
  const [department, setDepartment] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setCompany(data);
    });
    orgaChange.empNo = orga[0]?.empNo;
  }, []);

  // 선택한 회사의 목록 정보 출력
  const handleOnChangeCompany = (e) => {
    const { value } = e.target;
    deptList(value).then((data) => {
      setDepartment(data);
    });
    setOrgaChange({ ...orgaChange, companyNo: value });
  };

  const handleOnChangeOrgaRegisterInput = (e) => {
    const { name, value } = e.target;
    setOrgaChange({ ...orgaChange, [name]: value });
  };

  const handleOnClickOrgaRegisterSubmit = (e) => {
    if (orgaChange.companyNo === 0 || orgaChange.deptNo === 0 || orgaChange.empRank === "") {
      Swal.fire("미입력 항목 존재", "항목을 모두 입력해주세요.", "warning").then();
    } else {
      empOrgaRegister(orgaChange).then(() => {
        clickOrga(e, orgaChange.empNo);
        closeModal();
      });
    }
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="사원 회사/부서 추가"
    >
      <EmpInsertExplainDiv>* 은 필수 항목입니다.</EmpInsertExplainDiv>
      <EmpInsertWrapper>

        <EmpInsertHeader>
          회사*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertSelect
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
          </EmpInsertSelect>
        </EmpInsertBody>

        <EmpInsertHeader>
          부서*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertSelect
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
          </EmpInsertSelect>
        </EmpInsertBody>

        <EmpInsertHeader>
          직급*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertSelect
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
          </EmpInsertSelect>
        </EmpInsertBody>
      </EmpInsertWrapper>

      <EmpButtonWrapper>
        <EmpInsertButton
          type="button"
          onClick={(e) => {
            handleOnClickOrgaRegisterSubmit(e);
          }}
        >추가
        </EmpInsertButton>
      </EmpButtonWrapper>
    </Modal>
  );
}

export default RegisterOrgaModal;
