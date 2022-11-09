import React from "react";
import styled, { css } from "styled-components";


/**
 * GNB 메뉴 이름을 표시하는 헤더입니다.
 * @return {JSX.Element}
 * @constructor
 */
const SubHeader = ({ setPageTitle, pageTitle }) => {
  return (
    <SubHeaderWrapper>
      {pageTitle || "Page Title"}
    </SubHeaderWrapper>
  );
};

const SubHeaderWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.douzone300};
    color:${theme.color.white};
    padding: 10px;
  `}
`;

export default SubHeader;
