import React, { useContext, useEffect, useState } from "react";
import Button from "@components/Button";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import {
  ColumnName,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
  TitleWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style.jsx";
import styled from "styled-components";
import { GET_MENU_DETAIL } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";


const Selected = ({ handleOnIconUpdateModal, handleOnMenuInsertModal, handleOnMenuDeleteConfirmModal, handleOnUpdateMenu }) => {
  const { selectedMenu, setSelectedMenu, queryMenu, setQueryMenu } = useContext(SelectMenuContext);

  useEffect(() => {
    GET_MENU_DETAIL(selectedMenu).then((res) => {
      setQueryMenu(res.data);
    });
  }, [selectedMenu]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const origin = { ...queryMenu };
    origin[name] = value;
    setQueryMenu(origin);
  };

  return (
    <MenuFormWrapper>
      <Layout>
        <TitleWrapper>
          <Text>
            메뉴 상세
          </Text>
          <button type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</button>
        </TitleWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              상위메뉴
            </Text>
          </ColumnName>
          <InputWrapper>
            <div className="">{queryMenu?.upperMenuName || "GNB"}</div>
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              메뉴명
            </Text>
          </ColumnName>
          <InputWrapper>
            <Input
              name="menuName"
              value={queryMenu?.menuName || ""}
              onChange={handleOnChange}
            />
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              사용여부
            </Text>
          </ColumnName>
          <InputWrapper>
            <Input
              name="mainFlag"
              value={queryMenu?.mainFlag || ""}
              onChange={handleOnChange}
            />
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              정렬
            </Text>
          </ColumnName>
          <InputWrapper>
            <Input
              name="menuOrder"
              value={queryMenu?.menuOrder || ""}
              onChange={handleOnChange}
            />
            <input value={queryMenu?.menuCode || ""} hidden />
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              아이콘
            </Text>
          </ColumnName>
          <Image src={queryMenu?.iconUrl || ""} />
          <Button type="button" onClick={handleOnIconUpdateModal}>아이콘 수정하기</Button>
        </FormItemWrapper>
        <MenuButton onClick={() => { handleOnUpdateMenu(queryMenu); }}>메뉴 수정</MenuButton>
        <MenuButton onClick={handleOnMenuDeleteConfirmModal}>메뉴 삭제</MenuButton>
      </Layout>

    </MenuFormWrapper>
  );
};

const Input = styled.input`
`;


export default Selected;
