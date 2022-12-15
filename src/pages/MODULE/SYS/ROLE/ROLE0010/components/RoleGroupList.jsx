import React from "react";
import {
  Button, GroupCountSpan,
  GroupCountWrapper, GroupInfoButton,
  GroupInfoSection,
  GroupListSection,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import RoleGroupItem from "./RoleGroupItem";

function RoleGroupList({
  roleGroupResponse,
  companyList,
  onClickRoleGroupItem,
  onClickAddBtn,
  selectedRoleGroup,
}) {
  // TODO: 페이징관련 필드 여기에서 꺼낸다음 처리해주세요.
  const { dtoList, total } = roleGroupResponse;

  return (
    <>
      <GroupInfoSection>
        <GroupCountWrapper>
          <GroupCountSpan>그룹 : </GroupCountSpan>
          <GroupCountSpan>{total}</GroupCountSpan>
          <GroupCountSpan>개</GroupCountSpan>
        </GroupCountWrapper>
        <GroupInfoButton onClick={onClickAddBtn}>권한그룹추가</GroupInfoButton>
      </GroupInfoSection>
      <GroupListSection>
        {dtoList?.map((roleGroup) => (
          <RoleGroupItem
            onClickRoleGroupItem={onClickRoleGroupItem}
            companyList={companyList}
            key={roleGroup.roleGroupNo}
            roleGroup={roleGroup}
            selectedRoleGroup={selectedRoleGroup}
          />
        ))}
      </GroupListSection>
    </>
  );
}

export default RoleGroupList;
