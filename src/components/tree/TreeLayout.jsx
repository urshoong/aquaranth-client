import React from "react";
import styled from "styled-components";
import TreeItem from "@components/tree/TreeItem";

/**
 * 트리구조 레이아웃입니다.
 * @param apiList "API 리스트"
 * @param rootValue "최상위 값"
 * @param upperColumn "상위 컬럼"
 * @param matchColumn "상위 컬럼과 비교할 컬럼"
 * @param columnName "표시할 컬럼"
 * @param initCollapsed "컬럼 펼침여부"
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const TreeLayout = ({ apiList, rootValue, upperColumn, matchColumn, columnName, initCollapsed, selectedMenu, setSelectedMenu }) => {
  /**
   * JSON 데이터를 트리구조로 반환합니다.
   * @param list
   * @param findRootValue
   * @param findUpperColumns
   * @return {*}
   */
  const convertTreeList = (
    list,
    findRootValue = rootValue,
    findUpperColumns = upperColumn,
  ) => {
    return list.filter((item) => item[findUpperColumns] === findRootValue)
      .map((item) => ({ ...item, childrens: convertTreeList(list, item[matchColumn]) }));
  };

  return (
    <TreeWrapper>
      {convertTreeList(apiList).map((item) => (
        <TreeItem
          item={item}
          key={item[matchColumn]}
          itemColumn={columnName}
          initCollapsed={initCollapsed}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      ))}
    </TreeWrapper>
  );
};

const TreeWrapper = styled.div`
  font-size: 12px;
`;


export default TreeLayout;
