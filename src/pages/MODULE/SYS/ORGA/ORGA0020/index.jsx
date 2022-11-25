import React, { useEffect, useState } from "react";
import "./view.css";
import useModal from "@hooks/useModal";
import { useParams } from "react-router-dom";
import request from "@utils/axiosUtil";
import DepartmentEditPage from "@pages/MODULE/SYS/ORGA/ORGA0020/pages/DepartmentEditPage";

const findDepartmentByCompanyNo = async (companyNo) => {
  /**
   * 400 에러가 나기 때문에 1번 회사로 함.
   */
  const { data } = await request.get("/dept2/list/1");
  return data;
};

const findCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};


function Index() {
  // const { openModal } = useModal();
  // const data = { menucode: "ORGA0020", menuname: "부서 관리" };
  // const handleOnModal = () => {
  //   openModal({ type: "ORGA0020", props: data });
  // };

  const { companyNo } = useParams();

  /**
   * 화면 재랜더링용 상태입니다.
   */
  const [refresh, setRefresh] = useState(false);

  /**
   * 조직도에 뿌려질 회사들을 보관하는 상태입니다.
   */
  const [departmentList, setDepartmentList] = useState([]);

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

  useEffect(() => {
    setDepartmentList([]);
  }, [selectCompany]);

  // useEffect(() => {
  //   findDepartmentByCompanyNo(companyNo).then((result) => {
  //     console.log(result);
  //     setDepartmentList(result);
  //   });
  // }, [refresh]);
  /**
   * 조직도에 있는 부서들을 클릭할 때 마다,
   * DeptNo로 선택한 부서를 상태에 올리는 함수
   * @param deptNo
   */
  const handleSelectDepartment = (deptNo) => {
    console.log("부서 pk", deptNo);
    const targetDepartment = departmentList.find((item) => item.deptNo === deptNo);
    console.log("선택한 부서", targetDepartment);
    setSelectDepartment(targetDepartment);
  };


  return (
    <DepartmentEditPage
      departmentList={departmentList}
      setDepartmentList={setDepartmentList}
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
