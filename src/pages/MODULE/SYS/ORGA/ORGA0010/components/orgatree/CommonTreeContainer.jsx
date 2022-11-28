import React, { useEffect, useState } from "react";
import { getChildNode, getOrgatreeEmpList } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";
import CommonTreeNode from "./CommonTreeNode";


function CommonTreeContainer({ deptNo = 1, depth = 0, companyNo, setEmpList }) {
  const [arr, setArr] = useState([]);
  const [target, setTarget] = useState(0); // 조직번호를 가져올 상태값

  const changeTarget = (currentTarget) => {
    setTarget(currentTarget);
    getOrgatreeEmpList(target).then((data) => {
      console.log(data);
      setEmpList(data);
    });

    console.log("target deptNo", currentTarget);
  };


  useEffect(() => {
    getChildNode(deptNo, depth, companyNo).then((data) => {
      // console.log(data)
      setArr(data);
    });
  }, [deptNo, depth, companyNo]);


  return (
    <div>
      <CommonTreeNode key={companyNo} arr={arr} changeTarget={changeTarget} />
    </div>
  );
}

export default CommonTreeContainer;
