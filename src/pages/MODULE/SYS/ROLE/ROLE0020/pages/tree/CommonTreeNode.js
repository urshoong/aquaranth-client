import React, { useEffect, useRef, useState } from "react";
import { getChildNode } from "../../api/OrgaTree";

function CommonTreeNode({ arr, changeTarget }) {
  const [subArr, setSubArr] = useState([]);

  const buttonRef = useRef();

  const [icon, setIcon] = useState(">");

  const clickMore = (upperDeptNo, depth, companyNo) => {
    getChildNode(upperDeptNo, depth, companyNo).then((result) => {
      setSubArr(result);
      setIcon("∨");
    });
  };


  const clickButton = (upperDeptNo, depth, companyNo) => {
    if (icon === "∨") {
      setSubArr([]);
      setIcon(">");
    } else if (icon === ">") {
      clickMore(upperDeptNo, depth, companyNo);
    }
  };

  useEffect(() => {
    const button = buttonRef.current;

    /** 이 설정이 활성화되어 있으면 회사 클릭하면 하위 모든 부서를 한 번에 펼침 */
    // if (button) {
    //   button.click();
    // }
  }, []);

  if (!arr) {
    return (<></>);
  }

  return (
    <ul>
      {arr.map((dept) => (
        <li key={dept.deptNo}>
          <div style={{ height: "2em" }}>
            <button type="button" style={{ height: "2em", width: `${dept.depth * 1 + 1}em`, paddingLeft: `${dept.depth * 15}px`, verticalAlign: "text-bottom" }} ref={buttonRef} onClick={() => clickButton(dept.deptNo, dept.depth + 1, dept.companyNo)}>{dept.lowerDeptCnt > 0 ? icon : ""}</button>
            {dept.depth === 0 && <img src="/images/icon-tree-comp.png" alt="" style={{ width: "2em", height: "2em", padding: "0px 10px", display: "inline-block" }} />}
            {dept.depth > 0 && <img src={icon === ">" ? "/images/icon-tree-folder-close.png" : "/images/icon-tree-folder-open.png"} alt="" style={{ width: "2em", height: "2em", padding: "0px 10px", display: "inline-block" }} />}
            <span style={{ fontSize: "1.5em", verticalAlign: "0.1em" }} onClick={() => changeTarget(dept.orgaNo)} aria-hidden="true">{dept.deptNo}. {dept.deptName}</span>
          </div>

          {subArr ? subArr.map((childDept) => (
            <CommonTreeNode
              key={childDept.deptNo}
              arr={[childDept]}
              changeTarget={changeTarget}
            />
          )) : <></> }

        </li>
      ))}

    </ul>
  );
}

export default CommonTreeNode;
