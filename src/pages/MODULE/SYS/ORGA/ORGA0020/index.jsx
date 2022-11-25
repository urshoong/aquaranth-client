import React, { useEffect, useState } from "react";
import "./view.css";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import DepartmentEditPage from "@pages/MODULE/SYS/ORGA/ORGA0020/pages/DepartmentEditPage";
import { findCompanyList } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";


function Index() {
  // const { openModal } = useModal();
  // const data = { menucode: "ORGA0020", menuname: "부서 관리" };
  // const handleOnModal = () => {
  //   openModal({ type: "ORGA0020", props: data });
  // };

  /**
   * 화면 재랜더링용 상태입니다.
   */
  const [refresh, setRefresh] = useState(false);

  /**
   * 조직도 트리에서 선택한 부서를
   * 수정 컴포넌트와, 등록 컴포넌트에서 사용할 수 있는 상태입니다.
   */
  const [selectDepartment, setSelectDepartment] = useState({});

  /**
   * 컴포넌트가 로딩이 될때,
   * 검색에 사용할 회사들을 담는 상태입니다.
   */
  const [companyList, setCompanyList] = useState([]);

  /**
   * 조직도 트리에서 검색조건에 사용할 회사 선택 상태입니다.
   */
  const [selectCompany, setSelectCompany] = useState(0);

  useEffect(() => {
    findCompanyList().then((response) => {
      setCompanyList(response);
      console.log("회사 목록을 가져옵니다.", response);
    });
  }, []);
  /**
   * 조직도에 있는 부서들을 클릭할 때 마다,
   * DeptNo로 부서의 상세정보를 조회합니다.
   * @param deptNo
   */
  const handleSelectDepartment = async (deptNo) => {
    const { data } = await request.get(`/dept2/${deptNo}`);
    console.log("부서 정보를 조회합니다.", data);
    setSelectDepartment(data);
  };

  return (
    <DepartmentEditPage
      selectDepartment={selectDepartment}
      setSelectDepartment={setSelectDepartment}
      setRefresh={setRefresh}
      handleSelectDepartment={handleSelectDepartment}
      companyList={companyList}
      setSelectCompany={setSelectCompany}
      selectCompany={selectCompany}
    />
  );
}

export default Index;
