import React from "react";
import PaginationContent from "./PaginationContent";
import RoleGroupContent from "./RoleGroupContent";
import {
  Option,
  RoleGroupCompanySelectWrap,
  GroupCountWrap,
  RoleGroupSearchWrap,
  GroupSection,
  SearchBtn,
  SearchInput,
  Select,
  Span,
} from "./StyledCommon";

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
  displayCheckbox,
}) => {
  console.log("roleGroupList", roleGroupList);
  return (
    <>
      {company && (
        <GroupSection className="header" height="110px">
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
        </GroupSection>
      )}
      <GroupSection className="section1" height="50px">
        <GroupCountWrap>
          <Span>그룹 : </Span>
          <Span>{roleGroupList.length}</Span>
          <Span>개</Span>
        </GroupCountWrap>
      </GroupSection>
      <GroupSection className="section2" height={`calc(100% - ${company ? 220 : 110}px)`} ref={refRoleGroupListContainer}>
        {roleGroupList?.map(({
          orgaRoleNo, roleGroupNo, roleGroupName, companyName, orgaNo,
        }) => (
          <RoleGroupContent
            className="groupContent"
            key={`${displayCheckbox}${orgaRoleNo}`}
            orgaNo={orgaNo}
            companyName={companyName}
            orgaRoleNo={orgaRoleNo}
            roleGroupNo={roleGroupNo}
            roleGroupName={roleGroupName}
            roleGroupClickHandler={roleGroupClickHandler}
            displayCheckbox={displayCheckbox}
            refRoleGroupListContainer={refRoleGroupListContainer}
          />
        ))}
      </GroupSection>
      <GroupSection className="footer" height="60px">
        <PaginationContent
          response={roleGroupResponse}
          pageClickHandler={roleGroupPageClickHandler}
          selectChangeHandler={roleGroupSizeSelectChangeHandler}
        />
      </GroupSection>
    </>
  );
};

export default RoleGroupListContent;


