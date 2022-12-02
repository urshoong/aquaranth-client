import styled from "styled-components";

/**
 * UserRole Based Common Styled Components
 * */
export const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  height: 35px;
  padding-left: 5px;
  margin-right: 5px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
  box-sizing: border-box;
`;

export const Span = styled.span`
  font-size: ${(props) => props.fontSize || "1.3em"};
  font-weight: ${(props) => props.fontWeight};
`;

export const Button = styled.button`
  height: 35px;
  border: 2px solid #e6e6e6;
  background-color: #f8f8f8;
`;

export const Select = styled.select`
  width: ${(props) => props.width || "100%"};
  height: 35px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
`;

export const Option = styled.option``;

/**
 * UserRole Custom Common Styled Components
 * */

export const SearchInput = styled(Input)`
  font-size: ${(props) => props.fontSize};
`;

export const SearchBtn = styled(Button)`
  width: ${(props) => props.width || 0};
`;

/**
 * UserRole Index Styled Components
 * */

export const UserRoleWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const UserRoleTitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 2px solid #f3f3f3;
`;

export const UserRoleTitle = styled.span`
  position: absolute;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 2em;
  font-weight: bold;
`;

export const UserRoleMainContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 30px;
`;

export const UserRoleInnerTabWrapper = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid gray;
`;

export const UserRoleInnerTab = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  margin: 0 30px 0 0;
  font-size: 1.6em;
  font-weight: bold;
  color: gray;
  box-sizing: border-box;
  &.active{
    color: #46a3fb;
    border-bottom: 2px solid #46a3fb;
  }
`;

export const UserRoleMainContent = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  margin-top: 15px;
  display: flex;
`;

/**
 *
 * */
