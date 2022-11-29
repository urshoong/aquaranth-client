import React, { useEffect, useState } from "react";
import CommonTreeNode from "./CommonTreeNode";
import { getChildNode } from "../../api/OrgaTree";

function CommonTreeContainer({ deptNo = 1, depth = 0, companyNo = 1, changeTarget }) {
  const [arr, setArr] = useState([]);

  // const [target, setTarget] = useState(0);

  useEffect(() => {
    getChildNode(deptNo, depth, companyNo).then((result) => {
      setArr(result);
    });
  }, [deptNo, depth, companyNo]);

  return (
    <div>
      <CommonTreeNode arr={arr} changeTarget={changeTarget} />
    </div>
  );
}

export default CommonTreeContainer;
