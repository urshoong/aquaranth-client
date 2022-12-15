import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import DeptRegister from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptRegister";
import DeptTreeItem from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTreeItem";
import { getCompanyList } from "@pages/MODULE/SYS/ROLE/ROLE0020/api/UserRole";
import {
  DeptRegisterModalDiv,
  DeptRegisterModalEmptyDiv,
  DeptRegisterModalTreeDiv,
  DeptRegisterModalWrapper,
  Option,
  Select,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const ORGA0020Modal = () => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  /**
   * 모달창에서 회사 리스트를 상태 관리합니다.
   */
  const [modalCompanyList, setModalCompanyList] = useState([]);

  /**
   * 모달창에서 검색조건에 사용할 회사 선택 사항입니다.
   */
  const [modalSelectCompanyNo, setModalSelectCompanyNo] = useState(0);

  /**
   * 부서 정보 데이터 상태를 관리합니다.
   */
  const [deptInfo, setDeptInfo] = useState({});

  /**
   * 모달창에서 트리구조를 선택할 때
   * 해당 부서의 필요한 정보를 조회합니다.
   * @param cNo
   * @param upperDNo
   */
  const clickDept = (cNo, upperDNo) => {
    setDeptInfo({
      companyNo: cNo,
      upperDeptNo: upperDNo === null ? 0 : upperDNo,
    });
  };

  /**
   * 회사 목록을 조회합니다.
   */
  useEffect(() => {
    getCompanyList().then((result) => {
      setModalCompanyList(result);
    });
  }, []);

  return (
    <Modal
      onClose={handleCloseModal}
      title="부서 등록"
    >
      <DeptRegisterModalWrapper>
        <DeptRegisterModalDiv>
          <Select
            name="company"
            className="secondTwoSelect"
            onChange={(e) => {
              setModalSelectCompanyNo(e.target.value);
            }}
          >
            <Option value="">회사선택</Option>
            {modalCompanyList.map((item) => (
              <Option key={item.companyNo} value={item.companyNo}>{item.companyName}</Option>
            ))}
          </Select>
          <DeptRegisterModalTreeDiv>
            {
              (modalSelectCompanyNo && modalSelectCompanyNo !== 0)
                ? (
                  <DeptTreeItem
                    clickDept={clickDept}
                    selectCompany={modalSelectCompanyNo}
                  />
                )
                : (
                  <DeptRegisterModalEmptyDiv>회사를 선택해주세요.</DeptRegisterModalEmptyDiv>
                )
            }
          </DeptRegisterModalTreeDiv>
        </DeptRegisterModalDiv>
        <DeptRegister deptInfo={deptInfo} />
      </DeptRegisterModalWrapper>
    </Modal>

  );
};

export default ORGA0020Modal;
