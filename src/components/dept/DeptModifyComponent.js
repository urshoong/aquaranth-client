import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import { useParams } from "react-router";

const modifyDept = async (deptDTO) => {
  const { data } = await axios.put(`http://localhost:8080/api/dept2/${deptDTO.deptNo}`, deptDTO)
  return data
}

const deleteDept = async (deptNo) => {
  const { data } = await axios.delete(`http://localhost:8080/api/dept2/${deptNo}`)
  return data
}

const getData = async (deptNo) => {
  const {data} = await axios.get(`http://localhost:8080/api/dept2/${deptNo}`)
  return data
}

const initState = {
  mainflag : false,
  delflag : false
}

function DeptModifyComponent({ dept,changeRefresh, gno , changeTarget, targetDept , good ,refresh, deptDTO}) {

  const [modData, setModData] = useState({})
  const [checkBox, setCheckBox] = useState(initState)

  const checkBoxHandler = (e) => {
    // const {name, checked} = e.target;
    // setCheckBox({
    //   ...checkBox,
    //   [name]:checked
    // })
    checkBox[e.target.name] = e.target.checked
    setCheckBox(checkBox)
    console.log(checkBox);
  }

  useEffect( () => {
    getData(good).then(result => {
      setCheckBox(checkBox)
      // console.log(checkBox)
    })
  }, [good])


  // useEffect( () => {
  //   modifyDept(good).then( result => {
  //     console.log(result);
  //   })
  // }, [good])

  const modClickHandler = (e) => {
    const { value, name } = e.target;
    modData[name] = value;
    setModData(modData);
    console.log(modData);
  }

  // const modClickCheckHandler = (e) => {
  //   modData[e.target.name] = e.target.checked
  //   setModData(modData)
  //   console.log(modData);
  // }

  const clickHandlerModify = () => {
    modifyDept({ ...modData, ...checkBox }).then(() => {
      console.log("complete");
    })
  };

  useEffect( () => {
    getData(good).then(result => {
      console.log(result);
      setModData(result)
    })
  }, [good])

  if(!good){
    return(
      <></>
    )
  }

  return (
    <div style={{backgroundColor:'green', margin:'50px'}}>
      <div style={{backgroundColor : 'pink'}}>
        <h1> 기존 데이터 영역 </h1>
        <h4> {modData.deptNo} </h4>
        <h4> {modData.deptName} </h4>
        <h4> {modData.deptDesc} </h4>
        <h4> {modData.gno} </h4>
        <h4> {modData.upperDeptNo} </h4>
        <h4> {modData.depth} </h4>
      </div>
      <hr/>

      <h1>수정 영역</h1>
      <div>
        <label>상위 부서번호</label>
        <input type="text"  value ={modData.upperDeptNo === null ? "0" : modData.upperDeptNo} readOnly={true} onChange={ (e) => modClickHandler(e) } name="upperDeptNo"/>
      </div>
      <div>
        <label>부서번호</label>
        <input type="text" value={modData.deptNo} onChange={ (e) => modClickHandler(e) } name="deptNo" readOnly={true}/>
      </div>
      <div>
        <label>부서이름</label>
        {/* <input type="text"  onChange={ (e) => modClickHandler(e) } name="dname"/> */}
        <select name="deptName" onChange={ (e) => {modClickHandler(e) } }>
          <option value=''>-- 부서 선택 -- </option>
          <option value="개발팀">개발팀</option>
          <option value="인사팀">인사팀</option>
          <option value="자원팀">자원팀</option>
          <option value="철강팀">철강팀</option>
          <option value="현장팀">현장팀</option>
        </select>
      </div>
      <div>
        <label>부서약칭</label>
        <input type="text" onChange={ (e) => modClickHandler(e) } name="deptDesc"/>
      </div>
      <div>
        <h4>주소 api 사용</h4>
      </div>
      <div>
        <label>사용여부</label>
        <input type="checkbox" onChange={ (e) => checkBoxHandler(e) } name="mainflag"/>
      </div>
      <div>
        <label>삭제여부</label>
        <input type="checkbox" onChange={ (e) => checkBoxHandler(e) } name="delflag"/>
      </div>
      <div>
        <h4>조직도 표시 할까?</h4>
      </div>
      <div>
        <label>부서정렬 (deptSort)</label>
        <input type="text" onChange={ (e) => modClickHandler(e) } name="deptSort"/>
      </div>
      <div>
        <label>부서정렬 (ord)</label>
        <input type="text" value={modData.ord} onChange={ (e) => modClickHandler(e) } name="ord" readOnly={true}/>
      </div>
      <button onClick={clickHandlerModify}>MODIFY</button>
=======

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



>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022

    </div>
  );
}

export default DeptModifyComponent;
<<<<<<< HEAD



=======
>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022
