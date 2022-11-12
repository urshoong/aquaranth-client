import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import "./style.css";
import styled from "styled-components";
import RoleGroupModModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupModModal";
import RoleGroupList from "./components/RoleGroupList";
import RoleGroupAddModal from "./components/RoleGroupAddModal";
import UserMenu from "./components/UserMenu";

export const ModalContainer = styled.div`
  //width: 100vw;
  //height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
const fetchGNBList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};
const fetchLoginUserCompany = async () => {
  const { data } = await request.get("/login/company");
  return data;
};
const fetchRoleGroup = async () => {
  const { data } = await request.get("/role-group");
  return data;
};


// 권한그룹 추가
const addRoleGroup = async (roleGroup) => {
  const { data } = await request.post("/role-group", roleGroup);
  return data;
};

// 권한그룹 수정
const modRoleGroup = async (roleGroup) => {
  const { data } = await request.put("/role-group", roleGroup);
  return data;
};

// 권한그룹 수정
const delRoleGroup = async (roleGroupNo) => {
  const { data } = await request.delete(`/role-group/${roleGroupNo}`);
  return data;
};

function Index() {
  const [loginUserCompany, setLoginUserCompany] = useState({});
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [modModal, setModModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onClickDelBtn = (roleGroupNo) => {
    delRoleGroup(roleGroupNo)
      .then((data) => {
        alert("권한그룹 삭제가 완료되었습니다.");
        setModModal(false);
      })
      .catch((data) => alert(data));
  };

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchRoleGroup()
      .then((data) => setRoleGroupList(data));
    fetchLoginUserCompany()
      .then((data) => setLoginUserCompany(data));
  }, [refresh]);

  return (
    <div className="mainDiv">
      <div className="listInfoDiv">
        <RoleGroupList
          roleGroupList={roleGroupList}
          loginUserCompany={loginUserCompany}
          addModal={addModal}
          modModal={modModal}
          setAddModal={setAddModal}
          setModModal={setModModal}
          refreshPage={refreshPage}
          onClickDelBtn={onClickDelBtn}
          addRoleGroup={addRoleGroup}
        />
        <UserMenu />
      </div>
    </div>
  );
}

export default Index;
