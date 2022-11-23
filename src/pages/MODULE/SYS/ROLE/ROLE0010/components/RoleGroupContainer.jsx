import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";
import { RoleGroupWrapper } from "@pages/MODULE/SYS/ROLE/ROLE0010";
import request from "@utils/axiosUtil";


const fetchRoleGroupList = async () => {
  const { data } = await request.get("/role-group");
  return data;
};


function RoleGroupContainer({ handleOnRoleGroupAddModal, refresh }) {
  const [roleGroupList, setRoleGroupList] = useState([]);

  const onClickAddBtn = () => {
    handleOnRoleGroupAddModal();
  };

  useEffect(() => {
    console.log("refresh 실행됨");
    fetchRoleGroupList().then((r) => setRoleGroupList(r));
  }, [refresh]);

  return (
    <RoleGroupWrapper>
      <RoleGroupHeader>header</RoleGroupHeader>
      <RoleGroupList roleGroupList={roleGroupList} />
      <RoleGroupAddBtn onClick={onClickAddBtn}>+ 추가</RoleGroupAddBtn>
      <RoleGroupPageWrapper>page</RoleGroupPageWrapper>
    </RoleGroupWrapper>
  );
}

export default RoleGroupContainer;

const RoleGroupHeader = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 20%;
`;

export const RoleGroupListWrapper = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 60%;
  
`;

const RoleGroupAddBtn = styled.button`
  border: black solid 1px;
  width: 100%;
  height: 10%;
`;

export const RoleGroupPageWrapper = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 10%;
`;
