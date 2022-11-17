import styled, { css } from "styled-components";


export const GridWrapper = styled.div`
  ${({ columns }) => {
    return css`
      display: grid;
      grid-template-columns: repeat(${columns || 12}, 1fr)
    `;
  }}
  `;


export const Span = ({ span }) => css`
  grid-column: span ${span};
`;

export const Divider = styled.div`
  ${Span}
  
`;

