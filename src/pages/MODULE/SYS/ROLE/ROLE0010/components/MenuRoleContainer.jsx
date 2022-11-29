import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeRefresh } from "@reducer/roleGroupSlice";
import { MenuRoleWrapper } from "../index";
import MenuRoleSearchBox from "./MenuRoleSearchBox";
import MenuRoleList from "./MenuRoleList";
import request from "../../../../../../utils/axiosUtil";
import Button from "../../../../../../components/Button";

const initState = {
  roleGroupNo: 0,
  moduleCode: "",
  menuRoles: [],
};

const fetchMenuRoles = async (selectMenuCode, roleGroupNo) => {
  const { data } = await request.get(`/menu-role?moduleCode=${selectMenuCode}&roleGroupNo=${roleGroupNo}`);
  return data;
};

function MenuRoleContainer({ selectedRoleGroup, setSelectedRoleGroup }) {
  const [gnbList, setGnbList] = useState([]);
  const [lnbList, setLnbList] = useState([]);
  const [menuRoleDTO, setMenuRoleDTO] = useState({ ...initState });
  const [selectValue, setSelectValue] = useState("default");
  const { roleGroupNo, roleGroupName } = selectedRoleGroup;
  const dispatch = useDispatch();

  // 최초 랜더시 GNB 메뉴리스트 불러오기
  useEffect(() => {
    request.get("/menu/list?keyword=gnb")
      .then(({ data }) => setGnbList(data));
  }, []);

  // 권한그룹이 새로 선택될때마다 초기화 작업
  useEffect(() => {
    menuRoleDTO.menuRoles = [];
    menuRoleDTO.roleGroupNo = roleGroupNo; // 권한그룹번호 초기화
    menuRoleDTO.moduleCode = "";
    setMenuRoleDTO({ ...menuRoleDTO });
    setLnbList([]);
    setSelectValue("default");
  }, [roleGroupNo]);

  if (!roleGroupNo) {
    return <>메뉴권한을 부여할 권한그룹을 선택해주세요.</>;
  }

  // 메뉴검색 select box 이벤트
  const onChangeSelectBox = (e) => {
    const selectMenuCode = e.target.value;
    menuRoleDTO.moduleCode = selectMenuCode;
    // 권한그룹에 맞는 메뉴권한 요청
    fetchMenuRoles(selectMenuCode, roleGroupNo)
      .then((data) => {
        // lnb 리스트 불러올때, 요청할 DTO 에도 체크가 되어있도록 해주어야함.
        data.map(({ menuNo, checked }) => { if (checked) { menuRoleDTO.menuRoles.push(menuNo); } });
        setMenuRoleDTO({ ...menuRoleDTO });
        setLnbList(data);
      });
  };

  // 메뉴권한 저장요청
  const onClickMenuRoleSaveBtn = () => {
    if (menuRoleDTO.moduleCode === "") {
      alert("메뉴를 선택해주세요.");
      return;
    }
    console.log("post 요청발송 DTO->", menuRoleDTO);
    request.post("/menu-role", menuRoleDTO)
      .then(() => {
        dispatch(changeRefresh());
        setSelectedRoleGroup({});
      });
  };

  // TODO: 메뉴단건 검색이 트리구조와 얽혀서 생기는 문제가 꽤나 복잡해 보이므로, 메뉴검색기능은 삭제할 예정.
  // const onClickSearchBtn = (searchMenuName) => {
  //   console.log(searchMenuName);
  // };

  return (
    <MenuRoleWrapper>
      <Header>
        {roleGroupNo}번 권한그룹이 선택되었습니다.<br />
        사용자메뉴 / 담당자메뉴<br />
        <Button onClick={onClickMenuRoleSaveBtn}>저장버튼</Button>
      </Header>
      <Content>
        <MenuRoleDiv>
          <MenuRoleSearchBox gnbList={gnbList} onChangeSelectBox={onChangeSelectBox} selectValue={selectValue} setSelectValue={setSelectValue} />
          <MenuRoleList lnbList={lnbList} setMenuRoleDTO={setMenuRoleDTO} menuRoleDTO={menuRoleDTO} />
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
