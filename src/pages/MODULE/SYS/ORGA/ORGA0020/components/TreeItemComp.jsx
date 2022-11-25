import React, { useEffect, useRef, useState } from "react";
import request from "@utils/axiosUtil";

// 트리 구조 데이터 출력
const getTreeStructure = async (companyNo, depth, upperDeptNo) => {
  const { data } = await request.get(`/dept2/findTree/${companyNo}/${depth}/${upperDeptNo}`);
  return data;
};


function TreeItemComp({ arr, handleSelectDepartment }) {
  const [subArr, setSubArr] = useState([]);
  const [icon, setIcon] = useState("+");
  const buttonRef = useRef();

  const clickMore = (companyNo, depth, upperDeptNo) => {
    getTreeStructure(companyNo, depth, upperDeptNo).then((result) => {
      setSubArr(result);
      setIcon("-");
    });
  };

  const clickButton = (companyNo, depth, upperDeptNo) => {
    if (icon === "-") {
      setSubArr([]);
      setIcon("+");
    } else if (icon === "+") {
      clickMore(companyNo, depth, upperDeptNo);
    }
  };

  useEffect(() => {
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
          <div>
            <button type="button" ref={buttonRef} onClick={() => clickButton(dept.companyNo, dept.depth + 1, dept.deptNo)}>{icon}</button>
            <span onClick={() => handleSelectDepartment(dept.deptNo)} aria-hidden="true">{dept.deptNo} -- {dept.deptName}</span>
          </div>

          {subArr ? subArr.map((childDept) => (
            <TreeItemComp
              key={childDept.deptNo}
              arr={[childDept]}
              handleSelectDepartment={handleSelectDepartment}
            />
          )) : <></> }


        </li>
      ))}
    </ul>
  );
}

export default TreeItemComp;
