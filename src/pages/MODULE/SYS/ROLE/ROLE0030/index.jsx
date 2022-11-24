import React, { useEffect, useState } from "react";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import TreeLayout from "@components/tree/TreeLayout";
import { Divider, GridWrapper } from "@components/Grid";
import { GET_ROUTES, PUT_UPDATE_MENU } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import { Route, Switch } from "react-router-dom";

const Index = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSelectedMenu({ ...selectedMenu, [name]: value });
    console.log(selectedMenu);
  };

  const { openModal } = useModal();

  const data = { selectedMenu };

  const handleOnModal = () => {
    openModal({ type: "ROLE0030", props: data });
  };

  const handleOnUpdate = () => {
    PUT_UPDATE_MENU(selectedMenu);
  };
  //
  useEffect(() => {
    GET_ROUTES().then((res) => {
      setMenuList(res.data);
    });
  }, []);


  return (
    <GridWrapper>
      <Divider span="12">
        <TreeLayout
          apiList={menuList}
          rootValue={null}
          selectedItem={selectedMenu}
          setSelectedItem={setSelectedMenu}
          upperColumn="upperMenuNo"
          matchColumn="menuNo"
          columnName="menuName"
          initCollapsed
        />
      </Divider>
      <Divider span="1">
        메뉴번호 : {selectedMenu.menuNo}
      </Divider>
      <Divider>
        메뉴코드 : {selectedMenu.menuCode}
      </Divider>


      <Divider>
        <input
          type="text"
          name="menuName"
          id=""
          value={selectedMenu.menuName}
          onChange={handleOnChange}
        />
      </Divider>
      <Divider>
        상위메뉴번호 : {selectedMenu.upperMenuNo}
      </Divider>
      <Divider>
        메뉴사용여부 : {selectedMenu.mainFlag ? "사용" : "사용안함"}
      </Divider>
      <Divider>
        메뉴사진 : {selectedMenu.uuid}
      </Divider>
      <Button type="button" onClick={handleOnModal}>사진 수정하기</Button>
      <Button type="button" onClick={handleOnUpdate}>메뉴 수정</Button>
    </GridWrapper>


  );
};

export default Index;

