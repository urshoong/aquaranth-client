import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuRoleWrapper } from "../index";
import MenuRoleSearchBox from "./MenuRoleSearchBox";
import MenuRoleList from "./MenuRoleList";
import request from "../../../../../../utils/axiosUtil";
import Button from "../../../../../../components/Button";
import {GET_ROUTES} from "../../ROLE0031/api/menu";

function MenuRoleContainer({ selectedRoleGroup }) {
  const [gnbList, setGnbList] = useState([]);
  const [lnbList, setLnbList] = useState([]);
  const { roleGroupNo, roleGroupName } = selectedRoleGroup;

  useEffect(() => {
    request.get("/menu/list?keyword=gnb")
      .then(({ data }) => setGnbList(data));
  }, []);

  if (roleGroupNo === undefined) {
    return <>메뉴권한을 부여할 권한그룹을 선택해주세요.</>;
  }

  const onChangeSelectBox = (e) => {
    const selectMenuCode = e.target.value;

    // request.get(`/menu/findundermenu/${selectMenuCode}`)
    //   .then(({ data }) => setLnbList(data));
  };

  return (
    <MenuRoleWrapper>
      <Header>
        {roleGroupNo}번 권한그룹이 선택되었습니다.<br />
        사용자메뉴 / 담당자메뉴<br />
        <Button>저장버튼</Button>
      </Header>
      <Content>
        <MenuRoleDiv>
          <MenuRoleSearchBox gnbList={gnbList} onChangeSelectBox={onChangeSelectBox} />
          <MenuRoleList lnbList={lnbList} />
        </MenuRoleDiv>
      </Content>
    </MenuRoleWrapper>
  );
}

export default MenuRoleContainer;

const Header = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 10%;
`;

const Content = styled.div`
  border: black solid 1px;
  display: flex;
  width: 100%;
  height: 90%;
`;

const MenuRoleDiv = styled.div`
  border: black 1px solid;
  width: 100%;
  height: 100%
`;

export const MenuRoleSearchBoxDiv = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

export const MenuRoleListDiv = styled.div`
  border: black solid 1px;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;
