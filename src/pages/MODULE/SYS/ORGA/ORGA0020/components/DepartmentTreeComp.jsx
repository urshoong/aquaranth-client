import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import TreeItemComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/TreeItemComp";

// 트리 구조 데이터 출력
const getTree = async (companyNo, depth, upperDeptNo) => {
  const { data } = await request.get(`/dept2/findTree/${companyNo}/${depth}/${upperDeptNo}`);
  return data;
};


function DepartmentTreeComp({ companyNo, depth, deptNo, handleSelectDepartment }) {

  /**
   * 회사를 선택하면, 최상단 노드인 회사를 담는 상태입니다.
   */
  const [company, setCompany] = useState();

  useEffect(() => {
    getTree(companyNo, depth, companyNo).then((result) => {
      setCompany(result);
    });
  }, [deptNo, depth, companyNo]);


  return (
    <>
      <TreeItemComp arr={company} handleSelectDepartment={handleSelectDepartment} />
    </>
  );
}

export default DepartmentTreeComp;
