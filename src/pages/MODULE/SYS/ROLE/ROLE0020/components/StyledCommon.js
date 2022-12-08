import styled, { css } from "styled-components";

/**
 * Based Common Styled Components
 * */
export const Input = styled.input`
  ${({ theme }) => css`
    width: ${(props) => props.width || "100%"};
    height: 35px;
    padding-left: 5px;
    margin-right: 5px;
    border: 2px solid ${theme.color.gray350};
    font-size: 1.3em;
    box-sizing: border-box;
  `}
`;

export const Span = styled.span`
  font-size: ${(props) => props.fontSize || "1.3em"};
  font-weight: ${(props) => props.fontWeight};
`;

export const Button = styled.button`
  ${({ theme }) => css`
    height: 35px;
    border: 2px solid ${theme.color.gray350};
    background-color: ${theme.color.gray200};
  `}
`;

export const Select = styled.select`
  width: ${(props) => props.width || "100%"};
  height: 35px;
  border: 2px solid #e6e6e6;
  font-size: 1.3em;
`;

export const Option = styled.option``;

/**
 * Custom Common Styled Components
 * */

export const SearchInput = styled(Input)`
  font-size: ${(props) => props.fontSize};
`;

export const SearchBtn = styled(Button)`
  width: ${(props) => props.width || 0};
`;

/**
 * Pagination Content Styled Components
 * */
export const PaginationWrap = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
`;

export const Pagination = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const PageBtn = styled.li`
  ${({ theme }) => css`
    //&.pageBtn{
      height: 28px;
      width: 28px;
      line-height: 20px;
      padding: 0 5px;
      border: 2px solid ${theme.color.gray350};
      background-color: white;
      font-size: 1.2em;
      font-weight: bold;
      margin: 2px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    //}
    &.pageBtn.page{
      border: 0;
      background-color: transparent;
      margin: 4px 5px;
    }
    &.pageBtn.page.active{
      color: ${theme.color.activeBDBlue};
    }
  `}
`;

export const PageImage = styled.img`
  padding: 0.5em;
`;

export const PageSizeSelect = styled(Select)`
  height: 28px;
  width: 60px;
  line-height: 20px;
  padding: 0 5px;
  background-color: white;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
`;

/**
 * RoleGroup List Content Styled Components
 * */
export const GroupSection = styled.div`
  ${({ theme }) => css`
    &:not(:last-of-type){
      border-bottom: 2px solid ${theme.color.gray300};
    }
    &.header{
      height: ${(props) => props.height};
      display: ${(props) => props.height || "none"};
      padding: 18px 15px;
      //background-color: #f2f2f2;
      background-color: ${theme.color.gray200};
    }
    &.section1{
      width: 100%;
      height: ${(props) => props.height};
      display: ${(props) => props.height && "flex"};
      background-color: ${theme.color.gray50};
      //background-color: #fafafa;
      justify-content: space-between;
    }
    &.section2{
      height: ${(props) => props.height};
      display: ${(props) => (props.height ? "" : "none")};
      background-color: ${theme.color.gray50};
      //background-color: #fafafa;
      padding: 10px;
      overflow-y: auto;
    }
    &.footer{
      height: ${(props) => props.height};
      display: ${(props) => props.height || "none"};
      background-color: ${theme.color.gray100};
      //background-color: #f2f2f2;
    }
  `}
`;

export const RoleGroupCompanySelectWrap = styled.div`
  margin-bottom: 5px;
`;

export const RoleGroupSearchWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const GroupCountWrap = styled.div`
  ${({ theme }) => css`
    height: 50px;
    line-height: 50px;
    width: 100px;
    padding-left: 10px;
    &>span{
      font-size: 1.3em;
      font-weight: bold;
    }
    &>span:nth-of-type(2){
      color: ${theme.color.activeBDBlue};
    }
  `}
`;

export const GroupSortWrap = styled.div`
  height: 50px;
  line-height: 50px;
  margin-right: 15px;
  &>select{
    border: none;
    font-size: 1.3em;
    font-weight: bold;
    outline: none;
  }
`;

/**
 * UserRole Index Styled Components
 * */

export const ModuleInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModuleInnerTitleWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 60px;
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    border-bottom: 2px solid ${theme.color.gray300};
  `}
`;

export const ModuleInnerTitle = styled.span`
  position: absolute;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 2em;
  font-weight: bold;
`;

export const ModuleInnerMainContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
`;

export const UserRoleInnerTabWrapper = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid gray;
`;

export const UserRoleInnerTab = styled.span`
  ${({ theme }) => css`
    display: inline-block;
    height: 100%;
    line-height: 40px;
    margin: 0 30px 0 0;
    font-size: 1.6em;
    font-weight: bold;
    color: gray;
    box-sizing: border-box;
    &.active{
      color: ${theme.color.activeBDBlue};
      border-bottom: 2px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const UserRoleMainContent = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  margin-top: 15px;
  display: flex;
`;

/**
 * UserRole RoleGroup based Page Styled Components
 * */

export const UserRoleSection = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: ${(props) => props.width};
    border: ${(props) => (props.border ? `${props.border}px solid ${theme.color.gray350}` : "")};
    padding-left: ${(props) => props.paddingLeft};
    padding-right: ${(props) => props.paddingRight};
  `}
`;

/**
 * Company Page Styled Components
 * */

export const CompanyManagementDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export const CompanyListInfoDiv = styled.div`
  height: calc(100% - 70px);
  display: flex;
  margin-top: 15px;
`;

export const CompanySearchDiv = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 55px;
    line-height: 55px;
    box-sizing: border-box;
    border: 1px solid ${theme.color.gray350};
    display: flex;
    justify-content: space-between;
  `}
`;

export const CompanySearchWrap = styled.div``;

export const CompanySearchInnerWrap = styled.div`
  display: inline-block;
`;

export const CompanySearchSpan = styled(Span)`
  display: inline-block;
  width: 8em;
  padding-right: 1em;
  text-align: right;
  font-weight: bold;
`;

export const CompanySearchInput = styled(Input)`
  height: 35px;
  width: 17em;
`;

export const CompanySearchBtn = styled(Button)`
  height: 2.5em;
  width: 3em;
  margin-right: 1.5em;
`;


export const CompanyListDiv = styled(UserRoleSection)`
`;

export const CompanyRegisterBtnDiv = styled(GroupSection)`
  display: flex;
  justify-content: center;
`;

export const CompanyRegisterBtn = styled.button`
  ${({ theme }) => css`
    font-size: 1.2em;
    color: ${theme.color.gray700};
  `}
`;

export const CompanyListItemDiv = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100px;
    border: 2px solid ${theme.color.gray350};
    background-color: ${theme.color.white};
    border-radius: 10px;
    align-items: center;
    padding: 17px 20px;
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 1fr 1fr;
    &.active{
      background-color: ${theme.color.activeBGBlue};
      border: 2px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const CompanyListItemInnerDiv = styled.div`
  ${({ theme }) => css`
    width: 100%;
    &:not(:last-of-type){
      font-size: 1.3em;
      font-weight: bold;
      color: ${theme.color.gray800};
    }
    &:nth-of-type(3){
      color: black;
      font-size: 1.5em;
    }
    &:nth-of-type(even){
      text-align: right;
    }
    &:nth-of-type(odd){
      text-align: left;
    }
  `}
`;

export const CompanyUseItemDiv = styled.div`
  border: 1px solid;
  border-radius: 1rem;
  height: 2em;
  width: 4em;
  padding-top: 0.2em;
  text-align: center;
  color: white;
  margin: 0 0 0 auto;
  background-color: ${({ companyUse }) => (companyUse ? "#6bb4ff" : "#4b7dff")};
`;

export const CompanyInformationDiv = styled.div`
  //display: grid;
  //grid-template-rows: 1fr 15fr;
  //margin-top: 1em;
  width: calc(100% - 400px);
  height: 100%;
  padding-left: 15px;
`;

export const CompanyInfoBtnDiv = styled.div`
  //display: grid;
  //grid-template-columns: 20fr 1fr 1fr 1fr;
  //grid-column-gap: 1em;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 30px;
  border-bottom: 2px solid #6c6c6c;
`;

export const CompanyInfoSpan = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`;

export const CompanyInfoBtnWrapper = styled.div`
  
`;

export const CompanyInfoBtn = styled(Button)`
  border-radius: 0.5em;
  //margin-bottom: 0.5em;
  height: 2.5em;
  width: 4em;
  margin: 0 5px;
`;

export const CompanyInfoShowBtn = styled.button`
  font-size: 2.5em;
  color: #6c6c6c;
  vertical-align: -3px;
  margin: 0 5px;
`;

export const CompanyInfoItemWrapper = styled.div`
`;

export const CompanyInfoItemDiv = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1.5fr 10fr;
    border-bottom: 2px solid ${theme.color.gray300};
  `}
`;

export const CompanyInfoNameDiv = styled.div`
  ${({ theme }) => css`
    text-align: right;
    // border-right: 1px solid ${theme.color.gray300};
    line-height: 3em;
    background-color: ${theme.color.gray100};
    font-size: 1.1em;
    font-weight: bold;
    height: 40px;
  `}
`;

export const CompanyInfoNameSpan = styled.span`
  margin-right: 0.5em;
`;

export const CompanyInfoInputDiv = styled.div`
  height: 3em;
  line-height: 3em;
  width: 20em;
`;

export const CompanyUseInputWrapper = styled.div`
`;

export const CompanyUseInput = styled.input`
  margin-left: 1em;
`;

export const CompanyInfoInput = styled.input`
  width: 20em;
  height: 2em;
  line-height: 2em;
  margin-left: 1em;
`;

/**
 * Main Organization Chart Modal Styled Components
 * */

export const GroupChoose = styled.div`
  border-bottom: 1px solid black;
`;

export const GroupChooseBtn = styled.button`
  ${({ theme }) => css`
    font-size: 1.5em;
    color: #6c6c6c;
    padding: 0.9em 1em;
    font-weight: bold;
    &.active{
      color: ${theme.color.activeBDBlue};
      border-bottom: 2px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const GroupChooseSpan = styled.span`
  ${({ theme }) => css`
    width: 1px;
    border-right: 1px solid ${theme.color.gray500}; 
    padding-top: 3px;
  `}
`;

export const Orgatree = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  padding-top: 1em;
`;

export const OrgatreeItem = styled.div`
  overflow: ${(prop) => prop.over};
  min-width: 230px;
  max-height: 30rem;
  border: ${(prop) => prop.borderSize};
  &:not(.list){
    max-width: 230px;
  }
`;

export const MainTreeContainerWrapper = styled.div``;

export const MainTreeOrgaWrapper = styled.div`
  padding: 5px;
`;

export const MainTreeOrgaIconImage = styled.img`
  width: 1.7em;
  height: 1.7em;
  padding: 0 0.5em;
  display: inline-block
`;

export const MainTreeOrgaSpan = styled(Span)`
  ${({ theme }) => css`
    font-size: 1.2em;
    font-weight: bold;
    display: inline-block;
    vertical-align: -3px;
    &.active{
      background-color: ${theme.color.activeBGBlue};
      border: 2px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const MainTreeArrowButton = styled.button`
  padding-left: ${({ depth }) => `${depth * 15}px`};
  font-size: 1em;
`;

export const MainOrgaTreeEmpListDiv = styled.div`
  ${({ theme }) => css`
    border-top: 2px solid ${theme.color.gray800};
    overflow: auto;
    height: 29.9rem;
    background-color: ${theme.color.gray50};
  `}
`;

export const EmpItemDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    border: 1px solid ${theme.color.gray500};
    border-radius: 0.2rem;
    margin: 0.5em 1em 0.5em 1em;
    padding: 2em;
    background-color: ${theme.color.white};
    &.active{
      background-color: ${theme.color.activeBGBlue};
      border: 1px solid ${theme.color.activeBDBlue};
    }
  `}
`;

export const EmpInfo = styled.div`
  text-align: ${(props) => props.align};
  padding-top: ${(props) => props.paddingTop}em;
  padding-bottom: ${(props) => props.paddingBtm}em;
  font-size: ${(props) => props.fontSize}em;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  position: ${({ empNo }) => (empNo ? "absolute" : "")};
  top: ${({ empNo }) => (empNo ? "15px" : "")};
  right: ${({ empNo }) => (empNo ? "15px" : "")};
  cursor: ${({ empNo }) => (empNo ? "pointer" : "")};
  visibility: ${({ visible }) => visible};
`;

export const EmpInfoDivideSpan = styled.span`
  ${({ theme }) => css`
    width: 1px;
    height: 0.8em;
    display: inline-block;
    border-right: 1px solid ${theme.color.gray500}; 
  `}
`;

export const EmpInfoGray = styled.span`
  ${({ theme }) => css`
    color: ${theme.color.gray800};
  `}
`;
/// ///
export const EmpInformationDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-row-gap: 1rem;
`;

export const EmpProfil = styled.div`
  ${({ theme }) => css`
    text-align: center;
    border: 1px solid ${theme.color.gray500};
    border-radius: 0.2rem;
    background-color: #f2f5fa;
    height: 15rem;
    position: relative;
  `}
`;

export const EmpProfilVerticalSpan = styled.span`
  ${({ theme }) => css`
    display: inline-block;
    width: 185px;
    height: 1px;
    border-bottom: 1px solid ${theme.color.gray500};
  `}
`;

export const EmpProfilDetail = styled.p`
  margin-top: ${({ marginTop }) => marginTop}em;
  font-size: ${({ fontSize }) => fontSize}em;
  font-weight: ${({ fontWeight }) => fontWeight};
`;

export const EmpDetail = styled.div`
  border-top: 2px solid #6c6c6c;
`;

export const EmpProfilItem = styled.div`
  width: 100%;
  height: 100%;
`;

export const EmpProfilImg = styled.div`
  border-radius: 70%;
  margin: 1.5em auto 0 auto;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-color: ${(props) => props.src || "#46A3FB"};
`;

export const EmpDetailTitle = styled.div`
  ${({ theme }) => css`
    font-size: 12px;
    background-color: ${theme.color.gray100};
    text-align: center;
    height: 3em;
    line-height: 3em;
  `}
`;

export const EmpItemSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 3em;
  line-height: 3em;
`;

export const EmpDetailItem = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-column-gap: 0.5em;
    border-bottom: 1px solid ${theme.color.gray500};
    font-size: 12px;
    font-weight: bold;
  `}
`;

export const MygroupBtn = styled.button`
  width: 2.3em;
  height: 2.3em;
  background-image: url("/images/myGroup_icon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 0.5em;
  margin-top: 0.5em;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  &:hover{
    background-image: url("/images/myGroup_icon_active.png");
  }
`;

export const MygroupList = styled.div`
  display: grid;
  grid-template-rows: 1fr 13fr;
`;

export const MygroupListInnerWrapper = styled.div`
`;

export const MygroupUpperDiv = styled.div`
  display: flex;
  line-height: 2em;
  margin-top: 0.5em;
`;

export const MygroupItem = styled.div`
  font-size: 1.3em;
  margin-left: 0.5em;
  display: flex;
`;

export const MyRegisterSpan = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

export const MyRegisterBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: ${(props) => props.margin};
  float: ${(props) => props.float};
`;

export const MygroupInput = styled.input`
  margin-right: 10px;
  width: 100px;
  outline: none;
  &.active{
    border: 1px solid darkgray;
    border-radius: 3px;
  }
`;

export const MygroupModalList = styled.div`
  font-size: 1rem;
  padding: 0.5em 0.5em;
`;

export const MyGroupModalInsertBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: 0.5em;
`;

export const MyGroupModalRegisterBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-top: 0.5em;
  float: right;
`;

export const MyGroupModalRadioBtn = styled.input`
`;
