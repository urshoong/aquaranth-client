import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RoleGroupItemWrapper } from "./RoleGroupList";
import Button from "../../../../../../components/Button";
import useModal from "../../../../../../hooks/useModal";

function RoleGroupItem({ roleGroup }) {
  const { roleGroupName, companyNo } = roleGroup;
  const { openModal } = useModal();

  const handleOnRoleGroupMocModal = () => {
    openModal({ type: "ROLE0010Mod", props: roleGroup });
  };

  return (
    <RoleGroupItemWrapper>
      <RoleGroupItemDiv>
        회사번호: {companyNo}<br />
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
