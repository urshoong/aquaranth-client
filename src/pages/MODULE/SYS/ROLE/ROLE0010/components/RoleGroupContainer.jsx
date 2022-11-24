import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";
import { RoleGroupWrapper } from "@pages/MODULE/SYS/ROLE/ROLE0010";
import request from "@utils/axiosUtil";
import RoleGroupSearchBox from "./RoleGroupSearchBox";
import useModal from "../../../../../../hooks/useModal";


const fetchRoleGroupList = async () => {
  const { data } = await request.get("/role-group");
  return data;
};

function RoleGroupContainer({ refresh, companyList, onClickRoleGroupItem }) {
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [loginUserInfo, setLoginUserInfo] = useState([]);
  const { openModal } = useModal();

  useEffect(() => {
    console.log("refresh 실행됨");
    fetchRoleGroupList().then((r) => setRoleGroupList(r));
  }, [refresh]);
  useEffect(() => {

  }, [roleGroupList]);


  const onClickAddBtn = () => {
    openModal({ type: "ROLE0010", props: { companyList } });
  };

  const onClickSearchBtn = (searchParams) => {
    // TODO : search
    const { companyNo, roleGroupName } = searchParams;
    request.get(`/role-group?companyNo=${companyNo}&roleGroupName=${roleGroupName}`)
      .then((r) => setRoleGroupList(r));
  };

  return (
    <RoleGroupWrapper>
      <RoleGroupSearchBox companyList={companyList} onClickSearchBtn={onClickSearchBtn} />
      <RoleGroupList companyList={companyList} roleGroupList={roleGroupList} onClickRoleGroupItem={onClickRoleGroupItem} />
      <RoleGroupAddBtn onClick={onClickAddBtn}>+ 추가</RoleGroupAddBtn>
      <RoleGroupPageWrapper>page</RoleGroupPageWrapper>
    </RoleGroupWrapper>
  );
}

export default RoleGroupContainer;

export const RoleGroupSearchBoxDiv = styled.div`
  border: black solid 1px;
  padding: 20px;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

export const RoleGroupListWrapper = styled.div`
  border: black solid 1px;
  overflow: auto;
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
