import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { css } from "styled-components";
import { Span } from "@components/Grid";
import { GET_MENULIST } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";

const Index = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});

  const { state, data, error, isFetching, isLoading } = useQuery("menu", GET_MENULIST);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div>
      <MenuFormWrapper>
        {data.data.map((item) => {
          return (<div>{item.menuCode}</div>);
        })}
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

