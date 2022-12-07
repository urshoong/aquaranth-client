import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import useModal from "@hooks/useModal";
import { removeCookie } from "@utils/cookieUtil";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from "@constants/common";
import axios from "axios";

/**
 * 어플리케이션 메인 아이콘과, 로그인 정보를 표시하는 헤더입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const MainHeader = () => {
  const { openModal } = useModal();
  const handleOnChangeCompanyModal = () => {
    openModal({
      type: "ORGA0030",
      props: "",
    });
  };
  const handleOnOrganizationChartModal = () => {
    openModal({
      type: "ORGA0010",
      props: {
        menucode: "ORGA0010",
        menuname: "회사 관리",
      },
    });
  };

  const history = useHistory();

  const handleLogout = async () => {
    await axios.get(`${API_URL}/logout`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
    } }).then(() => {
      sessionStorage.clear();
      removeCookie(REFRESH_TOKEN);
      history.push("/");
      location.reload();
    });
  };

  return (
    <MainHeaderWrapper>
      <Link to="/">Aquaranth10</Link>
      <div>
        <button type="button" onClick={handleOnChangeCompanyModal}>🐹</button>
        <button type="button" onClick={handleOnOrganizationChartModal}>🏰</button>
        <button type="button" onClick={handleLogout}>로그아웃</button>
      </div>
    </MainHeaderWrapper>
  );
};

const MainHeaderWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${theme.color.white};
    height: 50px;
  `}
`;

export default MainHeader;
