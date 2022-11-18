import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DeptModifyComponent from "../../components/dept/DeptModifyComponent";
import DeptTree from "../../components/dept/DeptTree";



function DeptSelectPage(props) {

  const { gno } = useParams()


  console.log('gno', gno)

  const [targetDept, setTargetDept] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [target, setTarget] = useState(0)



  const changeRefresh = () => {
    setRefresh(!refresh)
  }

  const selectDept = (deptNo) => {
    const target = depts.find( dept => dept.deptNo === deptNo)
    console.log("select Target : " + target);
    setTargetDept(target)
    console.log(targetDept);
  }

  const changeTarget = (target) => {
    setTarget(target)
    console.log("target : " + target);
  }


  return (
    <div>
      <h1>select page</h1>

      <div style={{display:'flex'}}>
        {/* <DeptTreeContainer changeTarget={changeTarget} upperDeptNo={gno} depth={0} selectDept={selectDept}></DeptTreeContainer> */}
        <DeptTree company={1} showDepth={-1}/>
        <DeptModifyComponent refresh={refresh} good={target} dept={targetDept} changeRefresh={changeRefresh} gno={gno} changeTarget={changeTarget} targetDept={selectDept}/>

      </div>

    </div>
  );
}

export default DeptSelectPage;
