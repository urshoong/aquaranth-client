import React, { useEffect, useState } from "react";
import TreeItemComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/TreeItemComp";
import { getTree } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";


function DepartmentTreeComp({ companyNo,
  depth = 0,
  deptNo = 1,
  handleSelectDepartment,

}) {
  /**
   * 회사를 선택하면, 최상단 노드인 회사를 담는 상태입니다.
   */
  const [topDepartment, setTopDepartment] = useState();

  useEffect(() => {
    getTree(companyNo, depth, companyNo).then((result) => {
      setTopDepartment(result);
    });
  }, [deptNo, depth, companyNo]);

  return (
    <TreeItemComp
      topDepartment={topDepartment}
      handleSelectDepartment={handleSelectDepartment}/>
  );
}


export default DepartmentTreeComp;
