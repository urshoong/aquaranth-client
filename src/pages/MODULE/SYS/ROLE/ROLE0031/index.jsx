import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import request from "@utils/axiosUtil";
import { ReactQueryDevtools } from "react-query/devtools";
import TreeLayout from "@components/tree/TreeLayout";
import styled, { css } from "styled-components";
import { Span } from "@components/Grid";
import {GET_ROUTES} from "@pages/MODULE/SYS/ROLE/ROLE0031/api/menu";

const Index = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const { state, data, error, isFetching, isLoading } = useQuery("menu", GET_ROUTES);

  if (isLoading){
    return <>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
      <div className="">LOADING</div>
    </>
  }

  if (isFetching){
    return <>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
      <div className="">FETCHDING</div>
    </>
  }

  return (
    <div>
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
      <ReactQueryDevtools initialIsOpen />
    </div>
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

export default Index;

