import React, { useEffect, useState } from "react";
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
  }


  return (
    <div>
      <h1> test select page</h1>
      <h1> {deptDTO.deptNo} </h1>
      <h1> {deptDTO.dname} </h1>
      <h1> {deptDTO.deptSort} </h1>
      <h1> {deptDTO.ddesc} </h1>
      <h1> {deptDTO.upperDeptNo} </h1>
      <DeptModifyComponent deptDTO={deptDTO} />
    </div>
  );
}

export default DeptSelectPage;
