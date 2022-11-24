import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RoleGroupItemWrapper } from "./RoleGroupList";
import Button from "../../../../../../components/Button";
import useModal from "../../../../../../hooks/useModal";

function RoleGroupItem({ roleGroup, companyList, onClickRoleGroupItem }) {
  const { roleGroupName, companyNo, companyName } = roleGroup;
  const { openModal } = useModal();

  const handleOnRoleGroupMocModal = () => {
    openModal({ type: "ROLE0010Mod", props: { roleGroup, companyList } });
  };

  return (
    <RoleGroupItemWrapper>
      <RoleGroupItemDiv onClick={() => onClickRoleGroupItem(roleGroup)}>
        회사이름: {companyName}<br />
        {roleGroupName}
      </RoleGroupItemDiv>
      <button onClick={handleOnRoleGroupMocModal}>수정/삭제</button>
    </RoleGroupItemWrapper>
  );
}

export default RoleGroupItem;

export const RoleGroupItemDiv = styled.div`
  border: green 1px solid;
  padding: 10px;
  margin: 20px;
`;
