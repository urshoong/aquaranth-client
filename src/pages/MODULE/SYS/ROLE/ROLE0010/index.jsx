import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import "./style.css";
import styled from "styled-components";
import RoleGroupList from "./components/RoleGroupList";
import RoleGroupAddModal from "./components/RoleGroupAddModal";
import UserMenu from "./components/UserMenu";

const fetchGNBList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const fetchCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const fetchRoleGroup = async () => {
  const { data } = await request.get("/role-group");
  return data;
};

const addRoleGroup = async (roleGroup) => {
  const { data } = await request.post("/role-group", roleGroup);
  return data;
};


export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

function Index() {
  const [companyList, setCompanyList] = useState([]);
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [GNBList, setGNBList] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchRoleGroup()
      .then((data) => setRoleGroupList(data));
    fetchCompanyList()
      .then((data) => setCompanyList(data));
  }, [refresh]);

  return (
    <ModalContainer className="firstOutDiv">
      <div className="mainDiv">
        <div className="listInfoDiv">
          <RoleGroupList
            roleGroupList={roleGroupList}
            companyList={companyList}
            setModal={setModal}
          />
          <UserMenu />
        </div>
      </div>

      {
        modal === true ? (
          <RoleGroupAddModal
            addRoleGroup={addRoleGroup}
            companyList={companyList}
            setModal={setModal}
            refreshPage={refreshPage}
          />
        ) : null
      }
    </ModalContainer>
  );
}

export default Index;
