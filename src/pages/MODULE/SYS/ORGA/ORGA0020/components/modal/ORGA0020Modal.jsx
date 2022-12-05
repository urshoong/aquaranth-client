import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid } from "@components/Grid";
import { findCompanyList } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import DepartmentTreeComp
  from "@pages/MODULE/SYS/ORGA/ORGA0020/components/depttree/DepartmentTreeComp";
import DepartmentRegisterComp
  from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DepartmentRegisterComp";

const ORGA0020Modal = () => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [modalCompany, setModalCompany] = useState([]);

  const [companyNo, setCompanyNo] = useState(0);

  /**
   * 부서 정보 데이터 상태를 관리합니다.
   */
  const [deptInfo, setDeptInfo] = useState({});

  /**
 * 모달창에서 검색조건에 사용할 회사 선택 사항입니다.
 */
  const [modalSelectCompany, setModalSelectCompany] = useState(0);

  /**
 * 모달창에서 트리 구조도를 조회합니다.
 */
  const [topDept, setTopDept] = useState([]);

  /**
   * 모달창에서 트리구조를 선택할 때
   * 해당 부서의 필요한 정보를 조회합니다.
   * @param cNo
   * @param upperDNo
   */
  const clickDept = (cNo, upperDNo) => {
    console.log("click clickDept");
    console.log("companyNo", cNo);
    console.log("upperDeptNo", upperDNo);
    setDeptInfo({
      companyNo: cNo,
      upperDeptNo: upperDNo === null ? 0 : upperDNo,
    });
  };

  useEffect(() => {
    findCompanyList().then((result) => {
      setModalCompany(result);
    });
  }, []);

  return (
    <Modal
      onClose={handleCloseModal}
      title="부서 등록"
    >
      <CenterGrid>
        <select
          name="company"
          className="modalSelectCompany"
          onChange={(e) => {
            setCompanyNo(e.target.value);
          }}
        >
          <option>회사선택</option>
          {modalCompany.map((item) => (
            <option
              key={item.companyNo}
              value={item.companyNo}
            >
              {item.companyName}
            </option>
          ))}
        </select>
        <DepartmentTreeComp
          companyNo={companyNo}
          setDeptInfo={setDeptInfo}
          clickDept={clickDept}
        />
        <DepartmentRegisterComp deptInfo={deptInfo} />
      </CenterGrid>
    </Modal>

  );
};

export default ORGA0020Modal;
