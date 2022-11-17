import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import { Divider, GridWrapper } from "@components/Grid";
import TreeLayout from "@components/tree/TreeLayout";

const Index = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const getData = async () => {
    await request.get("/menu").then((res) => {
      setMenuList(res.data);
      console.log(res.data)
    });
  };

  useEffect(() => {
    getData();
  }, []);
  /**
   * TODO : 가져온 객체의 정보를 사용할것인지, 객체를 누를때 마다 메뉴 상세정보 API로 받아올 것인지?
   */
  return (
    <>
      <GridWrapper columns="4">
        <TreeLayout
          apiList={menuList}
          rootValue={null}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          upperColumn="upperMenuNo"
          matchColumn="menuNo"
          columnName="menuName"
          initCollapsed
        />
      </GridWrapper>
      <GridWrapper columns="12">
        <Divider span="1">
          메뉴번호 : {selectedMenu.menuNo}
        </Divider>
        <Divider>
          메뉴코드 : {selectedMenu.menuCode}
        </Divider>
        <Divider>
          메뉴이름 : {selectedMenu.menuName}
        </Divider>
        <Divider>
          상위메뉴번호 : {selectedMenu.upperMenuNo}
        </Divider>
        <Divider>
          메뉴사용여부 : {selectedMenu.menuUse?"사용":"사용안함"}
        </Divider>
        <Divider>
          메뉴사진 : {selectedMenu.uuid}
        </Divider>


      </GridWrapper>
    </>
  );
};

export default Index;
