import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";

const TreeUL = styled.ul`
  list-style: none;
`

const SpaceSpan = styled.span`
  margin-left: 1em;
`

const getTree = async (company) => {
  const {data} = await axios.get(`http://192.168.0.162:8080/api/dept2/tree/${company}`)

  return data
}


function DeptTree({company = 1, showDepth = -1, callback}) {

  const [depts, setDepts] = useState([])


  const changeTarget = (event, deptNo, type) => {

    event.preventDefault()
    event.stopPropagation()

    for(let i = 0; i < depts.length; i++) {

      const current = depts[i]

      if(type === '+'){
        if(current.deptNo === deptNo){
          current.folder = false
        }

        if(current.display === false && current.upperDeptNo === deptNo ){
          current.display = true
        }
      }else if(type === '-'){

        if(current.deptNo === deptNo){
          current.folder = true
        }

        if(current.display === true && current.upperDeptNo === deptNo ){
          current.display = false
        }
      }
    }

    setDepts([...depts])

  }

  useEffect(() => {

    getTree(company).then(arr => {

      console.log(arr)

      const showArr = []

      for(let i = 0; i < arr.length; i++){

        const display = arr[i].depth <= showDepth || showDepth === -1

        const folder = arr[i].lastDno !== null && arr[i].depth > showDepth

        showArr.push({...arr[i], display: display, folder: folder })
      }

      setDepts(showArr)
    })

  },[company])

  //deptNo, orgaNo, deptName, upperDeptNo, ord,depth, companyNo, lastDno
  const list = depts.map(dept =>  {

    const {deptNo, orgaNo, deptName, depth, lastDno, display, folder} = dept

    if(display){
      return (
        <li key={orgaNo}>
          <TreeIcon lastDno={lastDno} deptNo={deptNo} folder={folder} changeTarget={changeTarget} depth={depth} />
          <span onClick={(e) => callback(orgaNo)}>{deptName}</span>
        </li>
      )
    }else {
      return <></>
    }

  })

  return (
    <div>
      <h2>DEPT TREE</h2>

      <TreeUL >
        {list}
      </TreeUL>

    </div>
  );
}

const makeSpace = (depth) => {
  const arr = []
  for(let i = 0; i <= depth; i++){
    arr.push(<SpaceSpan key={i}/>)
  }
  return arr
}

function TreeIcon ({folder,changeTarget, deptNo, depth, lastDno}) {

  if(!lastDno){
    return <>{makeSpace(depth)}<span/></>
  }

  if(!folder) {
    return <>{makeSpace(depth)}<span onClick={(e) =>changeTarget(e,deptNo,'-')}>-</span></>
  }else {
    return <>{makeSpace(depth)}<span onClick={(e) =>changeTarget(e,deptNo,'+')}>+</span></>
  }

}

export default DeptTree;
