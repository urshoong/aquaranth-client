import React, { useState } from "react";
import styled from "styled-components";
import ICON_TREE_COMP from "@styles/assets/icon/icon-tree-comp.png";
import ICON_TREE_FOLDER_CLOSE from "@styles/assets/icon/icon-tree-folder-close.png";
import ICON_TREE_FOLDER_OPEN from "@styles/assets/icon/icon-tree-folder-open.png";
import { Span } from "../../components/StyledCommon";
import { getChildNode } from "../../api/OrgaTree";

function CommonTreeNode({ arr, changeTarget }) {
  const [subArr, setSubArr] = useState([]);

  const [icon, setIcon] = useState(">");

  const clickMore = (upperDeptNo, depth, orgaNo) => {
    getChildNode(upperDeptNo, depth, orgaNo).then((result) => {
      setSubArr(result);
      setIcon("∨");
    });
  };


  const clickButton = (upperDeptNo, depth, orgaNo) => {
    if (icon === "∨") {
      setSubArr([]);
      setIcon(">");
    } else if (icon === ">") {
      clickMore(upperDeptNo, depth, orgaNo);
    }
  };

  if (!arr) {
    return (<></>);
  }

  return (
    <TreeUl>
      {arr.map((dept) => (
        <TreeLi key={dept.deptNo}>
          <TreeInnerWrap>
            <TreeButton type="button" depth={dept.depth} onClick={() => clickButton(dept.deptNo, dept.depth + 1, dept.orgaNo)}>{dept.lowerDeptCnt > 0 ? icon : ""}</TreeButton>
            {dept.depth === 0 && <TreeImage src={ICON_TREE_COMP} alt="" />}
            {dept.depth > 0 && <TreeImage src={(icon === ">" && dept.lowerDeptCnt > 0) ? ICON_TREE_FOLDER_CLOSE : ICON_TREE_FOLDER_OPEN} alt="" />}
            <TreeSpan onClick={() => changeTarget(dept.orgaNo)} aria-hidden="true">{dept.deptNo}. {dept.deptName}</TreeSpan>
          </TreeInnerWrap>
          {subArr ? subArr.map((childDept) => (
            <CommonTreeNode
              key={childDept.deptNo}
              arr={[childDept]}
              changeTarget={changeTarget}
            />
          )) : <></> }
        </TreeLi>
      ))}
    </TreeUl>
  );
}

export default CommonTreeNode;

export const TreeUl = styled.ul``;

export const TreeLi = styled.li``;

export const TreeInnerWrap = styled.div`
  height: 2em;
`;

export const TreeButton = styled.button`
  height: 2em;
  width: ${(props) => props.depth * 1 + 1}em;
  padding-left: ${(props) => props.depth}em;
  vertical-align: text-bottom;
`;

export const TreeImage = styled.img`
  width: 2em;
  height: 2em;
  padding: 0 10px;
  display: inline-block
`;

export const TreeSpan = styled(Span)`
  font-size: 1.5em;
  vertical-align: 0.1em;
`;
