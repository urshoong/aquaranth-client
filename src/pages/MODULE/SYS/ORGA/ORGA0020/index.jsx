import React, { useEffect, useState } from "react";
import "./view.css";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import DepartmentEditPage from "@pages/MODULE/SYS/ORGA/ORGA0020/pages/DepartmentEditPage";
import {
  deleteDept,
  findCompanyList,
  getTree,
  modifyDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";


function Index() {
  const { openModal } = useModal();
  const data = { menucode: "ORGA0020", menuname: "부서 관리" };

  /**
   * 모달창을 띄워 줄 핸들러 입니다.
   */
  const handleOnModal = () => {
    openModal({
      type: "ORGA0020",
      props: data,
    });
  };

  /**
   * 화면 재랜더링용 상태입니다.
   */
  const [refresh, setRefresh] = useState(false);

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

  /**
   * 조직도 트리에서 선택한 부서를
   * 수정 컴포넌트와, 등록 컴포넌트에서 사용할 수 있는 상태입니다.
   */
  const [selectDepartment, setSelectDepartment] = useState({});
  // ============================수정=============================================

  /**
   * 수정된 radio 버튼의 데이터를 관리합니다.
   */
  const [modRadioBtn, setModRadioBtn] = useState(true);

  /**
   * 수정 버튼을 클릭하면 변경된 내용에 맞게 변경해줍니다.
   * @param e
   */
  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    selectDepartment[name] = value;
    setSelectDepartment({ ...selectDepartment });
  };

  /**
   * 수정 버튼을 클릭하면 변경된 내용에 맞게 사용 여부를 변경해줍니다.
   * @param e
   */
  const radioBtnHandler = (e) => {
    // const { checked, name } = e.target;
    // modRadioBtn[name] = checked;
    // setModRadioBtn(modRadioBtn);
    const { value } = e.target;
    setModRadioBtn(value);
    console.log("사용여부가 바뀌었습니다", modRadioBtn);
  };
  /**
   * 수정 버튼을 클릭하면 입력한 데이터에
   * 맞게 수정기능을 수행합니다.
   * @param deptNo
   */
  const modClickHandler = () => {
    modifyDept({ ...selectDepartment, mainFlag: modRadioBtn }).then(() => {
      console.log("complete");
      alert("수정되었습니다.");
    });
  };


  // ============================수정=============================================

  // ==========================등록========================================


  // ==========================등록========================================

  // ==========================추가========================================
  /**
   * 1. 수정버튼을 보여줄지 등록버튼을 보여줄지를
   * boolean타입으로 설정하고 상태관리를 합니다.
   */
  const [viewSelect, setViewSelect] = useState(true);

  /**
   * 2. 추가 버튼 onClick시 해당 값을 false로 (등록 화면),
   * 등록 화면으로 되돌아가려면 해당 값을 true로 설정합니다.
   */


  // ==========================추가========================================


  return (
    <DepartmentEditPage
      selectDepartment={selectDepartment}
      setSelectDepartment={setSelectDepartment}
      setRefresh={setRefresh}
      handleSelectDepartment={handleSelectDepartment}
      companyList={companyList}
      setSelectCompany={setSelectCompany}
      selectCompany={selectCompany}
      inputChangeHandler={inputChangeHandler}
      radioBtnHandler={radioBtnHandler}
      modClickHandler={modClickHandler}
      viewSelect={viewSelect}
      setViewSelect={setViewSelect}
      handleOnModal={handleOnModal}
    />
  );
}

export default Index;
