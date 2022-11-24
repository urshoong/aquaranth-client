import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DeptTree from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTree";
import DeptModifyComponent from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptModifyComponent";

function DeptSelectPage(props) {
  const { gno } = useParams();


  console.log("gno", gno);

  const [targetDept, setTargetDept] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [target, setTarget] = useState(0);


  const changeRefresh = () => {
    setRefresh(!refresh);
  };

  const selectDept = (deptNo) => {
    const target = depts.find((dept) => dept.deptNo === deptNo);
    console.log(`select Target : ${target}`);
    setTargetDept(target);
    console.log(targetDept);
  };

  const changeTarget = (target) => {
    setTarget(target);
    console.log(`target : ${target}`);

    return (
      <div>
        <h1>select page</h1>

        <div style={{ display: "flex" }}>
          {/* <DeptTreeContainer changeTarget={changeTarget} upperDeptNo={gno} depth={0} selectDept={selectDept}></DeptTreeContainer> */}
          <DeptTree company={1} showDepth={-1} />
          <DeptModifyComponent
            refresh={refresh}
            good={target}
            dept={targetDept}
            changeRefresh={changeRefresh}
            gno={gno}
            changeTarget={changeTarget}
            targetDept={selectDept}
          />

        </div>

        <h1> test select page</h1>
        <h1> {deptDTO.deptNo} </h1>
        <h1> {deptDTO.dname} </h1>
        <h1> {deptDTO.deptSort} </h1>
        <h1> {deptDTO.ddesc} </h1>
        <h1> {deptDTO.upperDeptNo} </h1>
        <DeptModifyComponent deptDTO={deptDTO} />
      </div>
    );
  };
}

export default DeptSelectPage;
