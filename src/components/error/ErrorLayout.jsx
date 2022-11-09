import React from "react";
import styled from "styled-components";


const ErrorLayout = ({ image, messange, buttonText, onButtonClick }) => (
  <div>
    <Wrapper>
      <img src={image} alt="error" />
      <div>{messange}</div>
      {buttonText && (
        <div className="button-wrapper">
          <button type="button" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </Wrapper>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 20rem;
    height: auto;
    }
  }
  .message {
    padding-left: 1rem;
    padding-right: 1rem;
    white-space: pre;
    text-align: center;
    line-height: 1.5;
    font-size: 2.5rem;
    margin-top: 2rem;
  }
  .button-wrapper {
    margin-top: 2rem;
    
  }
`;

export default ErrorLayout;
