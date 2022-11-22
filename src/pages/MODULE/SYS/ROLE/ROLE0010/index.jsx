import React, { useEffect, useState } from "react";
import "./style.css";
import SearchBox from "@pages/MODULE/SYS/ROLE/ROLE0010/components/SearchBox";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COMPANY,
  GET_GNB_LIST,
  GET_ROLE_GROUP,
} from "@reducer/roleGroupSlice";
import UserMenu from "@pages/MODULE/SYS/ROLE/ROLE0010/components/UserMenu";
import useModal from "@hooks/useModal";
import Button from "@components/Button";

const initUserMenu = {
  roleGroupNo: 0,
  visible: false,
};

function Index() {
  const { isLoading, refresh } = useSelector((state) => state.roleGroup);
  const dispatch = useDispatch();
  const [userMenu, setUserMenu] = useState({ ...initUserMenu });
  const { openModal } = useModal();
  const data = { menucode: "ROLE0010", menuname: "권한그룹 설정" };
  const handleOnModal = () => {
    openModal({ type: "ROLE0010", props: data });
  };

  useEffect(() => {
    dispatch(GET_COMPANY());
    dispatch(GET_ROLE_GROUP());
    setUserMenu({ ...initUserMenu });
  }, [refresh]);

  const showUserMenu = (roleGroupNo) => {
    dispatch(GET_GNB_LIST());
    userMenu.roleGroupNo = roleGroupNo;
    userMenu.visible = true;
    setUserMenu({ ...userMenu });
  };

  return (
    <div className="mainDiv">
      {isLoading && <>로딩중...</>}
      <div className="container">
        <SearchBox />
        <RoleGroupList showUserMenu={showUserMenu} />
        <Button type="button" onClick={handleOnModal}>ROLE0010 모달 띄우기</Button>
      </div>
      <div className="menuRole-container">
        <UserMenu roleGroupNo={userMenu.roleGroupNo} />
      </div>
    </div>
  );
}

export default Index;
