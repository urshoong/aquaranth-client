import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const modifyDept = async (deptDTO) => {
  const { data } = await axios.put(`http://localhost:8080/api/dept/${deptDTO.deptNo}`, deptDTO);
  return data;
};

const deleteDept = async (deptNo) => {
  const { data } = await axios.delete(`http://localhost:8080/api/dept/${deptNo}`);
  return data;
};


function DeptModifyComponent({ deptDTO }) {
  const [modDept, setModDept] = useState(deptDTO);
  const [delDept, setDelDept] = useState(deptDTO);

  useEffect( () => {

  }, [])

  const history = useHistory();


  const modHandleChange = (e) => {
    modDept[e.target.name] = e.target.value;
  };

  const modCheckHandleChange = (e) => {
    modDept[e.target.name] = e.target.checked;
  };


  return (
    <div>
      <h1>dept modify test</h1>

      <div>
        <label>dname</label>
        <input type="text" name="dname" onChange={(e) => modHandleChange(e)} />
      </div>
      <div>
        <label>deptSort</label>
        <input type="text" name="deptSort" onChange={(e) => modHandleChange(e)} />
      </div>
      <div>
        <label>ddesc</label>
        <input type="text" name="ddesc" onChange={(e) => modHandleChange(e)} />
      </div>
      <div>
        <label>upperDeptNo</label>
        <input type="text" name="upperDeptNo" onChange={(e) => modHandleChange(e)} />
      </div>
      <div>
        <label>mainFlag</label>
        <input type="checkbox" name="mainflag" onChange={(e) => modCheckHandleChange(e)} />
      </div>
      <div>
        <label>delFlag</label>
        <input type="checkbox" name="delflag" onChange={(e) => modCheckHandleChange(e)} />
      </div>


      <div>
        <button onClick={() => {
          modifyDept(deptDTO).then(result => {
            console.log(result);
            history.push("/")
          })
        }}>수정
        </button>


        <button onClick={() => {
          deleteDept(deptDTO.deptNo).then(result => {
            console.log(result);
            history.push("/");
          });
        }}>삭제
        </button>
      </div>




    </div>
  );
}

export default DeptModifyComponent;
