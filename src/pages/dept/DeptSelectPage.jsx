import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import DeptModifyComponent from "@components/dept/DeptModifyComponent";
import { useParams } from "react-router";
import axios from "axios";

const readDept = async (deptNo) => {
  const { data } = await axios.get(`http://localhost:8080/api/dept/${deptNo}`);
  return data;
};


function DeptSelectPage(props) {
  const [deptDTO, setDeptDTO] = useState({});

  const { deptNo } = useParams();

  useEffect(() => {
    readDept(deptNo).then((data) => {
      console.log(data);
      setDeptDTO(data);
    });
  }, []);

  if (!deptDTO.deptNo) {
    return <h1>Loading.......</h1>;
>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022
  }


  return (
    <div>
<<<<<<< HEAD
      <h1>select page</h1>

      <div style={{display:'flex'}}>
        {/* <DeptTreeContainer changeTarget={changeTarget} upperDeptNo={gno} depth={0} selectDept={selectDept}></DeptTreeContainer> */}
        <DeptTree company={1} showDepth={-1}/>
        <DeptModifyComponent refresh={refresh} good={target} dept={targetDept} changeRefresh={changeRefresh} gno={gno} changeTarget={changeTarget} targetDept={selectDept}/>

      </div>

=======
      <h1> test select page</h1>
      <h1> {deptDTO.deptNo} </h1>
      <h1> {deptDTO.dname} </h1>
      <h1> {deptDTO.deptSort} </h1>
      <h1> {deptDTO.ddesc} </h1>
      <h1> {deptDTO.upperDeptNo} </h1>
      <DeptModifyComponent deptDTO={deptDTO} />
>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022
    </div>
  );
}

export default DeptSelectPage;
