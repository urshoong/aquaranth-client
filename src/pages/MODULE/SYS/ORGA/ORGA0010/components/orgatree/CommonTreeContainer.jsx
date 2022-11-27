import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import CommonTreeNode from "./CommonTreeNode";

const getChildNode = async (upperDeptNo, depth, companyNo) => {
  const res = await request.get(`/orgatree/tree/${upperDeptNo}/${depth}/${companyNo}`);

  return res.data;
};

// 해당 부서에 소속된 모든 사원 정보를 요청
const getOrgatreeEmpList = async (orgaNo) => {
  const { data } = await request.get(`/orgatree/list/${orgaNo}`);

  return data;
};


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
