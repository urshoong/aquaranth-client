import React from "react";
import styled from "styled-components";
import PaginationContent from "./PaginationContent";
import RoleGroupContent from "./RoleGroupContent";
import { Option, SearchBtn, SearchInput, Select, Span } from "./RoleGroupStyledCommon";

const RoleGroupListContent = ({
  /* header props */
  company,
  companySelectChangeHandler,
  searchClickHandler,
  refCompanySelect,
  refSearchInput,
  /* list & pagination props */
  roleGroupList,
  roleGroupClickHandler,
  roleGroupResponse,
  roleGroupPageClickHandler,
  roleGroupSizeSelectChangeHandler,
  refRoleGroupListContainer,
  displayChekcbox,
}) => {
  return (
    <>
      {company && (
        <RoleGroupSection className="header" height="110px">
          <RoleGroupCompanySelectWrap>
            <Select onChange={companySelectChangeHandler} ref={refCompanySelect}>
              {company?.map(({
                companyNo,
                companyName,
                orgaNo,
              }) => (
                <Option
                  key={companyNo}
                  value={orgaNo}
                >{companyName}
                </Option>
              ))}
            </Select>
          </RoleGroupCompanySelectWrap>
          <RoleGroupSearchWrap>
            <SearchInput type="text" width="87%" placeholder="권한명을 검색하세요." ref={refSearchInput} />
            <SearchBtn type="button" width="12%" onClick={searchClickHandler}>🔍</SearchBtn>
          </RoleGroupSearchWrap>
        </RoleGroupSection>
      )}
      <RoleGroupSection className="section1" height="50px">
        <RoleGroupCountWrap className="groupCountWrap">
          <Span>그룹 : </Span>
          <Span>{roleGroupList.length}</Span>
          <Span>개</Span>
        </RoleGroupCountWrap>
        {/* TODO : 필터 넣을지 말지 차후 처리 */}
        {/* <div className="groupSortWrap">
            <select>
              <option>필터</option>
              <option>필터2</option>
              <option>필터3</option>
            </select>
          </div> */}
      </RoleGroupSection>
      <RoleGroupSection className="section2" height={`calc(100% - ${company ? 220 : 110}px)`} ref={refRoleGroupListContainer}>
        {roleGroupList?.map(({
          roleGroupNo, roleGroupName, companyName, orgaNo,
        }) => (
          <RoleGroupContent
            className="groupContent"
            key={roleGroupNo}
            orgaNo={orgaNo}
            companyName={companyName}
            roleGroupNo={roleGroupNo}
            roleGroupName={roleGroupName}
            roleGroupClickHandler={roleGroupClickHandler}
            displayChekcbox={displayChekcbox}
            refRoleGroupListContainer={refRoleGroupListContainer}
          />
        ))}
      </RoleGroupSection>
      <RoleGroupSection className="footer" height="60px">
        <PaginationContent
          response={roleGroupResponse}
          pageClickHandler={roleGroupPageClickHandler}
          selectChangeHandler={roleGroupSizeSelectChangeHandler}
        />
      </RoleGroupSection>
    </>
  );
};

export default RoleGroupListContent;

export const RoleGroupSection = styled.div`
  &:not(:last-of-type){
    border-bottom: 2px solid #ececec;
  }
  &.header{
    height: ${(props) => props.height};
    display: ${(props) => props.height || "none"};
    padding: 18px 15px;
    background-color: #f2f2f2;
  }
  &.section1{
    height: ${(props) => props.height};
    display: ${(props) => props.height || "flex"};
    background-color: #fafafa;
    justify-content: space-between;
  }
  &.section2{
    height: ${(props) => props.height};
    display: ${(props) => props.height || "none"};
    background-color: #fafafa;
    padding: 10px;
    overflow-y: auto;
  }
  &.footer{
    height: ${(props) => props.height};
    display: ${(props) => props.height || "none"};
    background-color: #f2f2f2;
  }
`;

export const RoleGroupCompanySelectWrap = styled.div`
  margin-bottom: 5px;
`;

export const RoleGroupSearchWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RoleGroupCountWrap = styled.div`
  height: 50px;
  line-height: 50px;
  width: 100px;
  padding-left: 10px;
  &>span{
    font-size: 1.3em;
    font-weight: bold;
  }
`;
