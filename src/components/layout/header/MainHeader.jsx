import React from "react";
import styled, {css} from "styled-components";
import {rem} from "polished";
import {Link} from "react-router-dom";

const MainHeader = () => {
  return (
    <HeaderWrapper>
      <Link to="/">Aquaranth10</Link>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  ${() => {
    return css`
      padding: ${rem(10)};
      background-color: ${(props) => props.theme.color.white};
      color: ${(props) => props.theme.color.douzone500};
      width: 100%;
      `
  }}
`

export default MainHeader;
