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

  const registerClickHandler = (e) => {
    dept[e.target.name] = e.target.value;
    setDept({...dept});
  };

  const registerCheckClickHandler = (e) => {
    dept[e.target.name] = e.target.checked;
    setDept({...dept});
  };


  return (
    <div>
      <h1> register component test </h1>

      <div>
        <label>dname</label>
        <input type="text" name="dname" onChange={(e) => registerClickHandler(e)} />
      </div>
      <div>
        <label>deptSort</label>
        <input type="text" name="deptSort" onChange={(e) => registerClickHandler(e)} />
      </div>
      <div>
        <label>ddesc</label>
        <input type="text" name="ddesc" onChange={(e) => registerClickHandler(e)} />
      </div>
      <div>
        <label>upperDeptNo</label>
        <input type="text" name="upperDeptNo" onChange={(e) => registerClickHandler(e)} />
      </div>
      <div>
        <label>mainflag</label>
        <input type="checkbox" name="mainflag" onChange={(e) => registerCheckClickHandler(e)} />
      </div>
      <div>
        <label>delflag</label>
        <input type="checkbox" name="delflag" onChange={(e) => registerCheckClickHandler(e)} />
      </div>

      <button onClick={() => {
        registerDept(dept).then((result) => {
          console.log(result);
          history.push("/");
        });
      }}
      >등록
      </button>
    </div>


  );
}

export default DeptRegisterComponent;
