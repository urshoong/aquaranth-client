import React, { useRef, useState } from "react";
import { getChildNode } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";


function CommonTreeNode({ arr, changeTarget }) {
  const [subArr, setSubArr] = useState([]);

  const buttonRef = useRef();

  const [icon, setIcon] = useState("+");

  const clickMore = (upperDeptNo, depth, companyNo) => {
    getChildNode(upperDeptNo, depth, companyNo).then((result) => {
      // console.log(result)
      setSubArr(result);
      setIcon("-");
    });
  };

  const clickButton = (upperDeptNo, depth, companyNo) => {
    if (icon === "-") {
      setSubArr([]);
      setIcon("+");
    } else if (icon === "+") {
      clickMore(upperDeptNo, depth, companyNo);
    }
  };

  if (!arr) {
    return (<div />);
  }

  return (
    <ul>
      {arr.map((dept) => (
        <li key={dept.deptNo}>
          <div style={{ padding: "5px" }}>
            <button type="button" style={{ paddingLeft: `${dept.depth * 15}px`, fontSize: "1em" }} ref={buttonRef} onClick={() => clickButton(dept.deptNo, dept.depth + 1, dept.companyNo)}>{icon}</button>
            <span style={{ fontSize: "1em" }} onClick={() => changeTarget(dept.orgaNo)} aria-hidden="true">
              {dept.depth === 0 ? dept.companyNo : dept.deptNo} -- {dept.deptName}
            </span>
          </div>

          {subArr ? subArr.map((childDept) => (
            <CommonTreeNode
              key={childDept.deptNo}
              arr={[childDept]}
              changeTarget={changeTarget}
            />
          )) : <div /> }

        </li>
      ))}

    </ul>
  );
}

export default CommonTreeNode;
