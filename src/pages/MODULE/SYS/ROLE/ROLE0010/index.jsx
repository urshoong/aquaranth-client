import React, { useEffect, useState } from "react";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import RoleGroupContainer from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupContainer";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../../../utils/axiosUtil";
import MenuRoleContainer from "./components/MenuRoleContainer";


const Index = () => {
  const [companyList, setCompanyList] = useState([]);
  const [selectedRoleGroup, setSelectedRoleGroup] = useState({});
  const { refresh } = useSelector((state) => state.roleGroup);

  useEffect(() => {
    request.get("/company/list")
      .then(({ data }) => setCompanyList(data));
  }, []);

  const onClickRoleGroupItem = (roleGroup) => {
    setSelectedRoleGroup(roleGroup);
  };

  return (
    <Layout>
      <RoleGroupContainer onClickRoleGroupItem={onClickRoleGroupItem} refresh={refresh} companyList={companyList} />
      <MenuRoleContainer selectedRoleGroup={selectedRoleGroup} />
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

