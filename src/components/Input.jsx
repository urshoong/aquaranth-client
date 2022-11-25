import styled, { css } from "styled-components";
import { Span } from "@components/Grid";

export const Input = styled.input`
  ${({ theme }) => {
    return css`
      ${Span};
      border : 1px solid ${theme.color.gray500};
      &:focus {
        border: 1px solid ${theme.color.douzone500};
      }
    `;
  }}
`;
