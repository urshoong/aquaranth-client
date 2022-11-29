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
  const [roleGroupResponse, setRoleGroupResponse] = useState([]);
  const [loginUserInfo, setLoginUserInfo] = useState([]);
  const { openModal } = useModal();

  // 페이지 리랜더시 권한그룹목록 요청
  useEffect(() => {
    console.log("refresh 실행됨");
    fetchRoleGroupList().then((r) => setRoleGroupResponse(r));
  }, [refresh]);

  // 권한그룹 상태가 바뀌면 컴포넌트 리랜더링
  useEffect(() => {
  }, [roleGroupResponse]);

  // 권한그룹 추가버튼 클릭 이벤트
  const onClickAddBtn = () => {
    openModal({ type: "ROLE0010", props: { companyList } });
  };

  // TODO : 권한그룹명으로 권한그룹 검색버튼 클릭 요청
  const onClickSearchBtn = (searchParams) => {
    const { companyNo, roleGroupName } = searchParams;
    request.get(`/role-group?companyNo=${companyNo}&roleGroupName=${roleGroupName}`)
      .then(({ data }) => setRoleGroupResponse(data));
  };

  return (
    <RoleGroupWrapper>
      <RoleGroupSearchBox companyList={companyList} onClickSearchBtn={onClickSearchBtn} />
      <RoleGroupList companyList={companyList} roleGroupResponse={roleGroupResponse} onClickRoleGroupItem={onClickRoleGroupItem} />
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
