import React, { useEffect, useRef, useState } from "react";
import { getTree } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import { TreeLi, TreeUl } from "@pages/MODULE/SYS/ROLE/ROLE0020/pages/tree/CommonTreeNode";
import {
  MainTreeArrowButton,
  MainTreeOrgaIconImage,
  MainTreeOrgaSpan,
  MainTreeOrgaWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import ICON_TREE_COMP from "@styles/assets/icon/icon-tree-comp.png";
import ICON_TREE_FOLDER_CLOSE from "@styles/assets/icon/icon-tree-folder-close.png";
import ICON_TREE_FOLDER_OPEN from "@styles/assets/icon/icon-tree-folder-open.png";

function TreeItemComp({
  topDepartment,
  clickDept,
  selectCompany,
  selectDepartment,
}) {
  /**
   * 조직도에서 1depth밑의 부서들의 상태를 관리합니다.
   */
  const [department, setDepartment] = useState([]);
  /**
   * 조직도에서 조직도를 열고 닫고 할 때 사용하는 아이콘을 관리합니다.
   */
  const [icon, setIcon] = useState("▶");

  /**
   * 회사를 선택할 때 마다 트리 구조를 랜더링 합니다.
   * */
  useEffect(() => {
    setDepartment([]);
    setIcon("▶");
  }, [selectCompany]);

  /**
   * HTML 태그 선택자
   * @type {React.MutableRefObject<undefined>}
   */
  const buttonRef = useRef();

  /**
   * 클릭을 할 때 마다, 하위 부서가 있는지 탐색합니다.
   * @param companyNo
   * @param depth
   * @param upperDeptNo
   */
  const findUnderDepartment = (companyNo, depth, upperDeptNo) => {
    getTree(companyNo, depth, upperDeptNo).then((result) => {
      setDepartment([]);
      setDepartment(result);
      setIcon("▼");
    });
  };

  /**
   * 메뉴를 폴딩하는 버튼입니다.
   * @param companyNo
   * @param depth
   * @param upperDeptNo
   */
  const foldingButton = (companyNo, depth, upperDeptNo) => {
    if (icon === "▼") {
      setDepartment([]);
      setIcon("▶");
    } else if (icon === "▶") {
      findUnderDepartment(companyNo, depth, upperDeptNo);
    }
  };

  if (!topDepartment) {
    return (<></>);
  }

  return (
    <TreeUl>
      {topDepartment.map((item) => (
        <TreeLi key={item.deptNo}>
          <MainTreeOrgaWrapper>
            <MainTreeArrowButton
              depth={item.depth}
              type="button"
              ref={buttonRef}
              onClick={() => foldingButton(item.companyNo, item.depth + 1, item.deptNo)}
            >{icon}
            </MainTreeArrowButton>
            {item.depth === 0 && <MainTreeOrgaIconImage src={ICON_TREE_COMP} alt="" />}
            {item.depth > 0 && <MainTreeOrgaIconImage src={(icon === ">" && item.lowerDeptCnt > 0) ? ICON_TREE_FOLDER_CLOSE : ICON_TREE_FOLDER_OPEN} alt="" />}
            <MainTreeOrgaSpan
              className={selectDepartment?.deptNo === item.deptNo ? "active" : ""}
              onClick={() => { clickDept(item.companyNo, item.deptNo); }}
              aria-hidden="true"
            >{item.deptName}
            </MainTreeOrgaSpan>
          </MainTreeOrgaWrapper>
          {department ? department.map((childrenItem) => (
            <TreeItemComp
              key={childrenItem.deptNo}
              topDepartment={[childrenItem]}
              clickDept={clickDept}
              selectDepartment={selectDepartment}
            />
          )) : <div /> }
        </TreeLi>
      ))}
    </TreeUl>
  );
}

export default TreeItemComp;
