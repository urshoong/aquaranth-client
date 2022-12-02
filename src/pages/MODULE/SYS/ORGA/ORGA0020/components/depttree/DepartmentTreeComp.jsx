import React, { useEffect, useState } from "react";
import TreeItemComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/depttree/TreeItemComp";
import { getTree } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import request from "@utils/axiosUtil";

const handleSelectDepartment = async (deptNo) => {
  const { data } = await request.get(`/dept2/${deptNo}`);
  return data;
};

function DepartmentTreeComp({
  companyNo,
  depth = 0,
  deptNo = 1,
  setDeptInfo,
  selectDepartment,
  setSelectDepartment,
  clickDept,
}) {
  /**
   * 회사를 선택하면, 최상단 노드인 회사를 담는 상태입니다.
   */
  const [topDepartment, setTopDepartment] = useState();

  /**
   * 부서 클릭 시 부서정보를 받아올
   * handler 입니다.
   * @param cNo
   * @param upperDNo
   */
  // const clickDept = (cNo, upperDNo) => {
  //   // console.log("click clickDept");
  //   // console.log("companyNo", cNo);
  //   // console.log("upperDeptNo", upperDNo);
  //   console.log(selectDepartment);
  //   setDeptInfo({
  //     companyNo: cNo,
  //     upperDeptNo: upperDNo === null ? 0 : upperDNo,
  //   });
  //   // handleSelectDepartment(requestNo).then((result) => {
  //   //   setDeptInfo(result);
  //   // });
  // };

  // useEffect(() => {
  //   handleSelectDepartment(deptNo).then((result) => {
  //     console.log(result);
  //     setSelectDepartment(result);
  //   });
  // }, []);

  useEffect(() => {
    getTree(companyNo, depth, deptNo).then((result) => {
      setTopDepartment(result);
    });
  }, [deptNo, depth, companyNo]);

  return (
    <TreeItemComp
      topDepartment={topDepartment}
      clickDept={clickDept}
    />
  );
}


export default DepartmentTreeComp;
