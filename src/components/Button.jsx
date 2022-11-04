import { adjustHue, darken, lighten } from "polished";
import styled from "styled-components";


const Button = styled.button`
  background: ${lighten(0.1, "#1c7ed6")};
  &:hover {
  font-size: ${(props) => props.fontsize};
    transition: ease-in-out 1s;
    background: ${lighten(0.5, "#000000")};
  }
`;


export default Button;
