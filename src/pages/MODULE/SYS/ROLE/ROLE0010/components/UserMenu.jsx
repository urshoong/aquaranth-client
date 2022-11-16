import React, { useEffect, useState } from "react";
import MenuItem from "@pages/MODULE/SYS/ROLE/ROLE0010/components/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { changeRefresh, GET_LNB_LIST, GET_MENU_ROLE_LIST } from "@reducer/roleGroupSlice";
import request from "@utils/axiosUtil";

const initState = {
  roleGroupNo: 0,
  moduleCode: "",
  dtoList: [],
};

function UserMenu({ roleGroupNo }) {
  const dispatch = useDispatch();
  const { GNBList, LNBList } = useSelector((state) => state.roleGroup);
  const [lnb, setLnb] = useState([]);
  const [addMenuRoleDTO, setAddMenuRoleDTO] = useState({ ...initState });

  useEffect(() => {
    setAddMenuRoleDTO({ ...initState, roleGroupNo });
    setLnb([]);
  }, [roleGroupNo]);
  useEffect(() => {
    console.log("모듈코드 상태 변경");
    if (addMenuRoleDTO.moduleCode !== "") {
      dispatch(GET_LNB_LIST({ roleGroupNo, moduleCode: addMenuRoleDTO.moduleCode }));
    }
  }, [addMenuRoleDTO.moduleCode]);
  useEffect(() => {
    setLnb(LNBList);
  }, [LNBList]);

  if (!roleGroupNo || roleGroupNo === 0) {
    return <div />;
  }

  const onChangeSelectBoxEvent = (e) => {
    const gnbMenuCode = e.target.value;
    addMenuRoleDTO.moduleCode = gnbMenuCode;
    setAddMenuRoleDTO({ ...addMenuRoleDTO, moduleCode: gnbMenuCode, menuNoList: [] });
    setLnb([]);
  };
  const onClickSaveBtn = () => {
    addMenuRoleDTO.dtoList = lnb.filter((menu) => menu.checked === true);
    request.post("/menu-role", addMenuRoleDTO)
      .then(() => {
        setAddMenuRoleDTO({ ...initState });
        dispatch(changeRefresh());
        console.log("저장이 완료되었습니다. 전달된 dto 객체--> ", addMenuRoleDTO);
      });
  };
  const onChangeInputBox = (e) => {
    const { checked, value } = e.target;
    const temp = lnb.map((menu) => (menu.menuNo == value ? { ...menu, checked } : menu));
    setLnb(temp);
  };

  return (
    <div className="section roleGroup left">
      <div className="leftSection header">
        <div className="selectWrap">
          <div>{roleGroupNo}번 권한그룹에 추가할 메뉴권한을 체크해주세요.</div>
          <select
            className="companySelect"
            onChange={(e) => onChangeSelectBoxEvent(e)}
            value={addMenuRoleDTO.moduleCode}
          >
            <option value="default">메뉴선택</option>
            {GNBList.map((gnb) => (
              <option key={gnb.menuNo} value={gnb.menuCode}>{gnb.menuName}</option>
            ))}
          </select>
        </div>
        <div className="searchWrap">
          <input type="text" className="searchInput" placeholder="메뉴이름을 입력하세요." />
          <button type="button" className="btn searchBtn">🔍</button>
        </div>
      </div>
      <div className="leftSection section2">
        {lnb.map((menu) => (
          <MenuItem key={menu.menuNo} menu={menu} onChangeInputBox={onChangeInputBox} />
        ))}
        <button className="button" type="button" onClick={() => onClickSaveBtn()}>저장</button>
      </div>
    </div>
  );
}

export default UserMenu;
