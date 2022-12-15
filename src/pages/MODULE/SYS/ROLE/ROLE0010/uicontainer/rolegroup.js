import styled, { css } from "styled-components";

export const IndexPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// title
export const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 2px solid #f3f3f3;
`;
export const TitleSpan = styled.span`
  position: absolute;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 2em;
  font-weight: bold;
`;

// tab
export const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 30px;
`;

export const InnerTabWrapper = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid gray;
`;

export const InnerTabSpan = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  margin: 0 30px 0 0;
  font-size: 1.6em;
  font-weight: bold;
  color: gray;
  box-sizing: border-box;
`;

export const Section = styled.div`
  height: 100%;

  &.roleGroup.left {
    width: 400px;
    border: 2px solid #e6e6e6;
  }

  &.roleGroup.right {
    width: 400px;
    border: 2px solid #e6e6e6;
  }
`;

export const SearchBoxDiv = styled.div`
  ${({ theme }) => css`
    height: 110px;
    padding: 18px 15px;
    background-color: #f2f2f2;
    border-bottom: 2px solid ${theme.color.gray350};
  `}
`;

export const SelectWrapper = styled.div`
  margin-bottom: 5px;
`;

export const SearchBoxSelect = styled.select`
  width: 100%;
  height: 35px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
`;

export const SearchBoxBtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 10px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchInput = styled.input`
  width: 87%;
  height: 35px;
  padding-left: 5px;
  margin-right: 5px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
  box-sizing: border-box;
`;

export const Button = styled.button`
  height: 35px;
  border: 2px solid #e6e6e6;
  background-color: #f8f8f8;
  padding: 0 5px;

  &.searchBtn {
    width: 12%;
    height: 35px;
    border: 2px solid #e6e6e6;
    background-color: #f8f8f8;
  }
`;

export const GroupInfoSection = styled.div`
  ${({ theme }) => css`
    height: 50px;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid ${theme.color.gray300};
  `}
`;

export const GroupInfoButton = styled(Button)`
  margin-right: 10px;
  padding: 0 5px;
`;

export const GroupCountWrapper = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100px;
  padding-left: 10px;
`;

export const GroupCountSpan = styled.span`
  ${({ theme }) => css`
    font-size: 1.3em;
    font-weight: bold;
    &:nth-of-type(2) {
      color: ${theme.color.activeBDBlue};
    }
  `}
`;

export const GroupListSection = styled.div`
  height: calc(100% - 220px);
  background-color: #fafafa;
  padding: 10px;
  overflow-y: auto;
`;

export const GroupItemWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    border: 2px solid ${theme.color.gray350};
    border-radius: 10px;
    padding: 17px 20px;
    margin-bottom: 5px;
    background-color: ${theme.color.white};
  
    &.active {
      background-color: ${theme.color.activeBGBlue};
      border: 2px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const GroupItemSpanWrapper = styled.div`
`;

export const GroupItemSpan = styled.span`
    position: relative;
    font-weight: bold;
    display: block;
  &:nth-of-type(1) {
    top: 0;
    font-size: 1.5em;
    color: gray;
  }
  &:nth-of-type(2) {
    top: 25px;
    font-size: 1.8em;
  }
`;

export const GroupItemButton = styled(Button)`
  position: relative;
  height: initial;
  padding: 0 5px;
`;

export const LeftSectionFooter = styled.div`
  height: 60px;
  background-color: #f2f2f2;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
`;

export const PaginationUl = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const PaginationLi = styled.li`
  height: 28px;
  width: 28px;
  line-height: 20px;
  padding: 0 5px;
  border: 2px solid #e6e6e6;
  background-color: white;
  font-size: 1.2em;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  &.prev, &.next {
    font-size: 1.7em;
  }

  &.page {
    border: 0;
    background-color: transparent;
    margin: 4px 5px;
  }
`;

export const PageSizeSelect = styled.select`
  height: 28px;
  width: 28px;
  line-height: 20px;
  padding: 0 5px;
  border: 2px solid #e6e6e6;
  background-color: white;
  font-size: 1.2em;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  //width: 60px;
  //font-size: 1.3em;
  outline: none;
`;

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  display: flex;
`;

export const EmptyContentDiv = styled.div`
  ${({ theme }) => css`
    width: calc(100% - 415px);
    margin-left: 15px;
    font-size: 1.75em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${theme.color.gray300};
  `}
`;

export const InnerContentDiv = styled.div`
  width: calc(100% - 400px);
  padding-left: 15px;
`;

export const MenuRoleWrapper = styled.div`
  height: 100%;
`;

export const MenuRoleListWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: calc(100% - 110px);
    padding: 15px;
    overflow: auto;
    background-color: ${theme.color.gray50};
  `}
`;

export const MenuRoleEmptyDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.75em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuRoleItemDiv = styled.div`
  padding: 2px;
`;

export const MenuRoleItemInput = styled.input`
  vertical-align: -2px;
  margin: 0 5px;
`;

export const MenuRoleItemSpan = styled.span`
  font-size: 1.2em;
`;

/**
 * RoleGroup Modal Styled Components
 * */

export const RoleGroupModalBtn = styled(Button)`
  width: 50px;
  margin: 0 10px;
`;

export const RoleGroupModalInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding-left: 5px;
    border: 1px solid ${theme.color.gray500};
    font-size: 1.2em;
  `}
`;

export const RoleGroupModalRadio = styled.input`
  margin: 0 5px;
  &:last-of-type{
    margin-left: 15px;
  }
`;

export const RoleGroupModalSelect = styled.select`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.color.gray500};
    font-size: 1.2em;
    outline: none;
  `}
`;

export const RoleGroupModalContent = styled.div`
  //display: flex;
  //flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 3fr;
  //margin: 10px;
  //height: 90px;
`;

export const RoleGroupModalHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    background-color: ${theme.color.gray100};
    border-bottom: 1px solid ${theme.color.gray400};
    min-height: 49px;
    padding-right: 10px;
    font-size: 1.2em;
    font-weight: bold;
    &:first-of-type{
      border-top: 1px solid ${theme.color.gray400};
    }
  `}
`;

export const RoleGroupModalBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 7px;
    height: 49px;
    border-bottom: 1px solid ${theme.color.gray400};
    &:nth-of-type(2){
      border-top: 1px solid ${theme.color.gray400};
    }
  `}
`;

export const RoleGroupModalFooter = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
`;
