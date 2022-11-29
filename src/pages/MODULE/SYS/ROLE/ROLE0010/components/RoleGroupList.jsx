import React from "react";
import styled from "styled-components";
import RoleGroupItem from "./RoleGroupItem";
import { RoleGroupListWrapper } from "./RoleGroupContainer";

function RoleGroupList({ roleGroupResponse, companyList, onClickRoleGroupItem }) {
  // TODO: 페이징관련 필드 여기에서 꺼낸다음 처리해주세요.
  const { dtoList } = roleGroupResponse;
  return (
    <RoleGroupListWrapper>
      {dtoList?.map((roleGroup) => <RoleGroupItem onClickRoleGroupItem={onClickRoleGroupItem} companyList={companyList} key={roleGroup.roleGroupNo} roleGroup={roleGroup} />)}
    </RoleGroupListWrapper>
  );
}

export default RoleGroupList;

export const RoleGroupItemWrapper = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 30%;
`;
