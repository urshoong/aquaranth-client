import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import MenuItem from "@pages/MODULE/SYS/ROLE/ROLE0010/components/MenuItem";

const fetchGNBList = async () => {
  const { data } = await request.get("/menu/gnb");
  return data;
};
const getLNBList = async (menuCode) => {
  const { data } = await request.get(`/menu/findundermenu/${menuCode}`);
  return data;
};

function UserMenu({ userMenu, test }) {
  const [gnbList, setGnbList] = useState([]);
  const [lnbList, setLnbList] = useState([]);

  useEffect(() => {
    console.log("use effect 실행됨");
    fetchGNBList()
      .then((value) => {
        setGnbList(value);
      });
  }, [userMenu]);

  const onChangeSelectBoxEvent = (e) => {
    const gnbMenuNo = e.target.value;
    getLNBList(gnbMenuNo)
      .then((value) => {
        setLnbList(value);
      });
  };
  const onClickSaveBtn = () => {

  };

  return (
    <div className="section roleGroup left">
      test : {test}
      <div className="leftSection header">
        <div className="selectWrap">
          <div>{userMenu.roleGroupNo}번 권한그룹에 추가할 메뉴권한을 체크해주세요.</div>
          <select className="companySelect" onChange={(e) => onChangeSelectBoxEvent(e)}>
            <option>메뉴선택</option>
            {gnbList.map((gnb) => (
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
        {lnbList.map((menu) => (
          <MenuItem key={menu.menuNo} menu={menu}/>
        ))}
        <button className="button" type="button" onClick={() => onClickSaveBtn()}>저장</button>
      </div>
    </div>
  );
}

export default UserMenu;
