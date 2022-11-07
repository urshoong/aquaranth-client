import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import styled, {css} from "styled-components";
import GnbMenu from "@components/layout/sidebar/GnbMenu";


const Sidebar = () => {
  const [gnbMenuList, setGnbMenuList] = useState([]);

  useEffect(() => {
    request.get("/menu/all").then(({ data }) => {
      setGnbMenuList(data);
    });
  }, []);

  return (
    <SidebarWrapper>
      {gnbMenuList.map((menu) => <GnbMenu key={menu.menuNo} menu={menu} />)}
    </SidebarWrapper>
  );
};


const SidebarWrapper = styled.div`
  ${() => css`
      background-color: ${(props) => props.theme.color.sidebar};
      position: fixed;
      width: 100px;
      height: 100vh;
      top: 0;
      z-index: 9999;`}
`;


export default Sidebar;
