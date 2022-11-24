import React, { useEffect, useState } from "react";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import RoleGroupContainer from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupContainer";
import {useDispatch, useSelector} from "react-redux";


const Index = () => {
  const { refresh } = useSelector((state) => state.roleGroup);
  const { openModal } = useModal();

  const handleOnRoleGroupAddModal = () => {
    openModal({ type: "ROLE0010", props: [] });
  };


  return (
    <Layout>
      <RoleGroupContainer
        handleOnRoleGroupAddModal={handleOnRoleGroupAddModal}
        refresh={refresh}
      />
      <MenuRoleWrapper />
    </Layout>
  );
};

export default Index;

const Layout = styled.div`
  border: black solid 1px;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const RoleGroupWrapper = styled.div`
  border: black solid 1px;
  width: 30%;
  height: 100%;
`;

export const MenuRoleWrapper = styled.div`
  border: black solid 1px;
  width: 70%;
  height: 100%;
`;

