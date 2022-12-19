import styled, { css } from "styled-components";
import { Span } from "@components/Grid";
import { lighten } from "polished";

export const MenuButton = styled.button`
  ${({ theme }) => {
    return css`
      margin: 10px 0;
      padding: 1rem;
      width: 100%;
      border: 1px solid ${theme.color.grayA100};;
    }
    `;
  }}
`;

export const Layout = styled.div`
  padding: 1rem;
  width: 100%;
`;

export const FormItemWrapper = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      border-top: 1px solid ${theme.color.grayA100};
      min-height: 49px;
      width: 100%;
      &:last-of-type{
        border-bottom: 1px solid ${theme.color.grayA100};
    }
    `;
  }}
`;

export const ColumnName = styled.div`
  ${({ theme }) => {
    return css`
      //background-color: ${theme.color.grayA100};
      background-color: ${theme.color.gray100};
      display: flex;
      width: 20%;
      max-width: 250px;
      place-items: center;
      justify-content: center;
    }
    `;
  }}
`;

export const Image = styled.img`
  ${({ theme }) => {
    return css`
      margin: 10px;
      width: 50px;
      height: 50px;
      padding: 5px;
      border: 1px solid ${theme.color.gray500};
      background-color: ${theme.color.gray500};
    `;
  }}
`;

export const Text = styled.div`
  ${({ theme }) => css`
      justify-content: center;
    ${theme.typo.subtitle2}
  `}`;


export const MenuFormWrapper = styled.div`
  border-radius: 0.1rem;
  height: 100%;
  position: relative;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  &>input{
    width: 100%;
    height: 100%;
  }
`;


export const TitleWrapper = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: space-between;
      color: ${theme.color.gray900};
      align-items: center;
      margin-bottom: 10px;
    `;
  }}
`;


export const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;
