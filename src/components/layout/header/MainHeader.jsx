import React from "react";
import { Link } from "react-router-dom";
import styled, {css} from "styled-components";


/**
 * 어플리케이션 메인 아이콘과, 로그인 정보를 표시하는 헤더입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const MainHeader = () => {
  return (
    <MainHeaderWrapper>
      <Link to="/">Aquaranth10</Link>
    </MainHeaderWrapper>
  );
};

const MainHeaderWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.white};
    padding: 10px;
  `}
`;

export default MainHeader;
