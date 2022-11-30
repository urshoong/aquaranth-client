import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeRefresh } from "@reducer/roleGroupSlice";
import {
  Section,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import MenuRoleSearchBox from "./MenuRoleSearchBox";
import MenuRoleList from "./MenuRoleList";
import request from "../../../../../../utils/axiosUtil";

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
        menuRoleDTO.menuRoles = [];
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
    console.log("post 요청발송 DTO->", menuRoleDTO.menuRoles);
    request.post("/menu-role", menuRoleDTO)
      .then(() => {
        dispatch(changeRefresh());
        setSelectedRoleGroup({});
      });
  };

  return (
    <Section className="roleGroup right">
      {/* TODO: 사용자/담당자 메뉴 구분 안할거면 지우자 */}
      {/* <InnerTabWrapper> */}
      {/*   <InnerTabSpan>사용자메뉴</InnerTabSpan> */}
      {/*   <InnerTabSpan>담당자메뉴</InnerTabSpan> */}
      {/*   <Button onClick={onClickMenuRoleSaveBtn}>저장버튼</Button> */}
      {/* </InnerTabWrapper> */}
      <div>
        <div>
          <div>[{roleGroupName}({roleGroupNo})] 권한그룹의 메뉴권한 정보입니다.</div>
          <MenuRoleSearchBox
            gnbList={gnbList}
            onChangeSelectBox={onChangeSelectBox}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            onClickMenuRoleSaveBtn={onClickMenuRoleSaveBtn}
          />
          <MenuRoleList
            lnbList={lnbList}
            setMenuRoleDTO={setMenuRoleDTO}
            menuRoleDTO={menuRoleDTO}
          />
        </div>
      </div>
    </Section>
  );
}

export default MenuRoleContainer;
