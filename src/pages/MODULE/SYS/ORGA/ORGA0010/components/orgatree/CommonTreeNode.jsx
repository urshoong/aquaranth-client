import React, { useRef, useState } from "react";
import { getChildNode } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";
import { TreeLi, TreeUl } from "@pages/MODULE/SYS/ROLE/ROLE0020/pages/tree/CommonTreeNode";
import {
  MainTreeArrowButton,
  MainTreeOrgaWrapper,
  MainTreeOrgaIconImage, MainTreeOrgaSpan,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import ICON_TREE_COMP from "@styles/assets/icon/icon-tree-comp.png";
import ICON_TREE_FOLDER_CLOSE from "@styles/assets/icon/icon-tree-folder-close.png";
import ICON_TREE_FOLDER_OPEN from "@styles/assets/icon/icon-tree-folder-open.png";


function CommonTreeNode({ arr, changeTarget }) {
  const [subArr, setSubArr] = useState([]);

  const buttonRef = useRef();

  const [icon, setIcon] = useState("▶");

  const clickMore = (upperDeptNo, depth, companyNo) => {
    getChildNode(upperDeptNo, depth, companyNo).then((result) => {
      // console.log(result)
      setSubArr(result);
      setIcon("▼");
    });
  };

  const clickButton = (upperDeptNo, depth, companyNo) => {
    if (icon === "▼") {
      setSubArr([]);
      setIcon("▶");
    } else if (icon === "▶") {
      clickMore(upperDeptNo, depth, companyNo);
    }
  };

  if (!arr) {
    return (<div />);
  }

  return (
    <TreeUl>
      {arr.map((dept) => (
        <TreeLi key={dept.deptNo}>
          <MainTreeOrgaWrapper>
            <MainTreeArrowButton type="button" depth={dept.depth} ref={buttonRef} onClick={() => clickButton(dept.deptNo, dept.depth + 1, dept.companyNo)}>{icon}</MainTreeArrowButton>
            {dept.depth === 0 && <MainTreeOrgaIconImage src={ICON_TREE_COMP} alt="" />}
            {dept.depth > 0 && <MainTreeOrgaIconImage src={(icon === ">" && dept.lowerDeptCnt > 0) ? ICON_TREE_FOLDER_CLOSE : ICON_TREE_FOLDER_OPEN} alt="" />}
            <MainTreeOrgaSpan className="mainTreeOrgaSpan" onClick={(e) => changeTarget(e, dept.orgaNo)} aria-hidden="true">
              {/* {dept.depth === 0 ? dept.companyNo : dept.deptNo} */} {dept.deptName}
            </MainTreeOrgaSpan>
          </MainTreeOrgaWrapper>

          {subArr ? subArr.map((childDept) => (
            <CommonTreeNode
              key={childDept.deptNo}
              arr={[childDept]}
              changeTarget={changeTarget}
            />
          )) : <div /> }

        </TreeLi>
      ))}

    </TreeUl>
  );
}

export default CommonTreeNode;
