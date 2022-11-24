import React, { useEffect, useState } from "react";
import useModal from "@hooks/useModal";
import Button from "@components/Button";
import TreeLayout from "@components/tree/TreeLayout";
import { Divider, GridWrapper, Span } from "@components/Grid";
import { GET_ROUTES, PUT_UPDATE_MENU } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import styled, { css } from "styled-components";
import { BreakLine } from "@components/Util";
import FormInput from "@components/form/FormInput";
import { useForm } from "react-hook-form";

const Index = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSelectedMenu({ ...selectedMenu, [name]: value });
    console.log(selectedMenu);
  };

  const { openModal } = useModal();

  const { handleSubmit, control, formState: { errors } } = useForm();

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
      <Divider span="2">
        <MenuFormWrapper>
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
        </MenuFormWrapper>
      </Divider>
      <Divider span="10">
        <MenuFormWrapper>
          <TitleWrapper>
            메뉴 상세
          </TitleWrapper>
          <BreakLine />
          <FormInput
            placeholder="메뉴번호"
            name="menuNo"
            control={control}
            defaultValue="123"
          />
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
            메뉴정렬값 : {selectedMenu.menuOrder}
          </Divider>
          <Divider>
            <img src={selectedMenu.iconUrl} />
          </Divider>
          <Button type="button" onClick={handleOnModal}>사진 수정하기</Button>
          <Button type="button" onClick={handleOnUpdate}>메뉴 수정</Button>
        </MenuFormWrapper>
      </Divider>
    </GridWrapper>
  );
};

const MenuFormWrapper = styled.form`
  ${({ theme }) => {
    return css`
      ${Span}
      ${theme.shadow.shadowLg};
      border: 1px solid ${theme.color.grayA100};;
      border-radius: 0.1rem;
      padding: 1rem;
    }
    `;
  }}
`;

const TitleWrapper = styled.div`
  ${({ theme }) => {
    return css`
      ${theme.typo.heading2()}
      display: flex;
      justify-content: space-between;
      color: ${theme.color.gray900};
      align-items: center;
    `;
  }}
`;

export default Index;

