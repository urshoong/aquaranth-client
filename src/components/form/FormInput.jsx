import React from "react";
import styled, { css } from "styled-components";
import { useController } from "react-hook-form";

const FormInput = ({ type, placeholder, autoComplete, control, name, rules, defaultValue, values }) => {
  const { field: { onChange, value, ref } } = useController({ name, control, rules, defaultValue });
  return (
    <InputWrapper>
      <Input
        ref={ref}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  ${({ styles }) => {
    return css`
      padding: inherit;
      place-items: center;
      font-size: inherit;
    `;
  }}
`;

const Input = styled.input`
  ${({ theme }) => {
    return css`
      width: 100%;
      font-size: inherit;
      border-bottom: 0.5px solid ${theme.color.grayA100};
    `;
  }}
`;
export default FormInput;
