import React from "react";
import styled, { css } from "styled-components";


/**
 * 모듈 내 각각의 모듈의 제목을 표시하는 컴포넌트 입니다.
 * @param title
 * @return {JSX.Element}
 * @constructor
 */
const ModuleTitle = () => {
  return (
    <ModuleTitleWrapper>
      {"Module Title"}
    </ModuleTitleWrapper>
  );
};
const ModuleTitleWrapper = styled.div`
  ${({ theme }) => {
    return css`
      height: ${theme.ui.moduleTitle};
      width: 100%;
      `;
  }}
`;


export default ModuleTitle;
