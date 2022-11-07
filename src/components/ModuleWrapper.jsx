import React from "react";
import styled, {css} from "styled-components";

const ModuleWrapper = styled.div`
  ${() => css`
    width: 100%;
    height: calc(100% - 92px);
    position: relative;
    `}
`;

export default ModuleWrapper;
