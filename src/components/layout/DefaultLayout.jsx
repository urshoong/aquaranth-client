import React from "react";
import Sidebar from "@components/layout/sidebar/Sidebar";
import Header from "@components/layout/header/Header";
import styled, { css } from "styled-components";

const DefaultLayout = ({ children }) => (
  <Layout>
    <Sidebar />
    <ModuleLayout>
      <Header />
      {children}
    </ModuleLayout>
  </Layout>
);

const ModuleLayout = styled.div`
  ${() => css`
      min-width: 1232px;
      position: absolute;
      overflow: auto;
      left: 100px;
    `}
`;

const Layout = styled.div`
  ${({ theme }) => {
    const { color: { white } } = theme;
    return css`
      width: 100%;
      color: ${white};
    `;
  }}
`;

export default DefaultLayout;
