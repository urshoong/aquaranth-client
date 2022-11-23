import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initState = {
  dname: "",
  ddesc: "",
  deptSort: "",
  upperDeptNo: "",
  mainflag: false,
  delflag: false,
};

const registerDept = async (deptDTO) => {
  const { data } = await axios.post("http://localhost:8080/api/dept/", deptDTO);
  return data;
};

function DeptRegisterComponent(props) {
  const [dept, setDept] = useState(initState);

  const history = useHistory();

  // useEffect( () => {
    // registerDept(dept).then( (result) => {
    //   console.log(result);
    //   setDept(result)
    // })
  // }, [])





  const handleChange = (e) => {
    dept[e.target.name] = e.target.value;

    setDept({ ...dept }); // setDept로 기존에 있던 부서와 추가된 부서 모두 dept에저장
  };

  const handleCheckChange = (e) => {
    dept[e.target.name] = e.target.checked;

    setDept({ ...dept }); // setDept로 기존에 있던 부서와 추가된 부서 모두 dept에저장
  };




  return (
    <div>
      <h1>register component test</h1>
      <div>
        <label>DNAME</label>
        <input type="text" onChange={(e) => handleChange(e)} name="deptName" />
      </div>

      <div>
        <label>DDESC</label>
        <input type="text" onChange={(e) => handleChange(e)} name="deptDesc" />
      </div>
      <div>
        <label>DEPTSORT</label>
        <input type="text" onChange={(e) => handleChange(e)} name="deptSort" />
      </div>
      <div>
        <label>UPPERDEPTNO</label>
        <input type="text" onChange={(e) => handleChange(e)} name="upperDeptNo" />
      </div>
      <div>
        <label>MAINFLAG</label>
        <input type="checkbox" onChange={(e) => handleCheckChange(e)} name="mainflag" />
      </div>
      <div>
        <label>DELFLAG</label>
        <input type="checkbox" onChange={(e) => handleCheckChange(e)} name="delflag" />
      </div>
      <div>
        <label>GNO</label>
        <input type="text" onChange={(e) => handleChange(e)} name="gno" />
      </div>
      <div>
        <label>DEPTH</label>
        <input type="text" onChange={(e) => handleChange(e)} name="depth" />
      </div>
      <button onClick={ () =>  {

        registerDept(dept).then(result => {
          console.log(result);
          history.push(`/dept/read/${result.newDeptNo}`);
        });

      }
      }>등록</button>

    </div>
  );
}

export default DeptRegisterComponent;
