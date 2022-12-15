import React from "react";
import {
  GroupItemButton,
  GroupItemSpan,
  GroupItemSpanWrapper,
  GroupItemWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import useModal from "../../../../../../hooks/useModal";

function RoleGroupItem({ roleGroup, companyList, onClickRoleGroupItem, selectedRoleGroup }) {
  const { roleGroupName, companyNo, companyName } = roleGroup;
  const { openModal } = useModal();

  // 권한그룹 수정/삭제 버튼 클릭시 모달 오픈
  const handleOnRoleGroupMocModal = () => {
    openModal({ type: "ROLE0010Mod", props: { roleGroup, companyList } });
  };

  return (
    <GroupItemWrapper
      className={selectedRoleGroup?.roleGroupNo === roleGroup.roleGroupNo ? "active" : ""}
      onClick={() => onClickRoleGroupItem(roleGroup)}
    >
      <GroupItemSpanWrapper>
        <GroupItemSpan>{companyName}</GroupItemSpan>
        <GroupItemSpan>{roleGroupName}</GroupItemSpan>
      </GroupItemSpanWrapper>
      <GroupItemButton onClick={handleOnRoleGroupMocModal}>수정/삭제</GroupItemButton>
    </GroupItemWrapper>
  );
}

export default RoleGroupItem;
