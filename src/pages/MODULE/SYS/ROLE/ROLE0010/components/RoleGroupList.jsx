import React from "react";
import styled from "styled-components";
import RoleGroupItem from "./RoleGroupItem";
import {RoleGroupListWrapper} from "./RoleGroupContainer";

function RoleGroupList({ roleGroupList }) {
  return (
    <RoleGroupListWrapper>
      {roleGroupList.map((roleGroup) => <RoleGroupItem key={roleGroup.roleGroupNo} roleGroup={roleGroup} />)}
    </RoleGroupListWrapper>
  );
}

export default RoleGroupList;

export const RoleGroupItemWrapper = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 30%;
`;
