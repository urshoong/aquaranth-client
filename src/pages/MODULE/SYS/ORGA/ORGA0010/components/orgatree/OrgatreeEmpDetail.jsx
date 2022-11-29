import React from "react";
import styled from "styled-components";
import useModal from "../../../../../../../hooks/useModal";

function OrgatreeEmpDetail({ empInfo }) {
  // 해당 사원 정보 구조분해
  const { orgaNo, empName, empRank, username, path, empPhone, email, profileUrl } = empInfo;
  const data = { menucode: "MyGroup", menuname: "마이그룹", orgaNo };
  const { openModal } = useModal();

  // 조직도 모달창을 띄워줄 handler
  const handleOnModal = () => {
    openModal({ type: "MyGroup", props: data });
  };

  return (
    <EmpInformationDiv>
      <EmpProfil>
        <MygroupBtn type="button" onClick={handleOnModal}>MY</MygroupBtn>
        <EmpProilImg
          src={profileUrl}
          alt="프로필 이미지"
          size="150"
        />
        <EmpProfilItem>{empName} {empRank}</EmpProfilItem>
        <EmpProfilItem>{username}</EmpProfilItem>
      </EmpProfil>
      <EmpDetail>
        <EmpDetailItem>
          <EmpDetailTitle>
            소속부서
          </EmpDetailTitle>
          {path}
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            전화번호
          </EmpDetailTitle>
          {empPhone}
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            이메일
          </EmpDetailTitle>
          {email}
        </EmpDetailItem>
      </EmpDetail>
    </EmpInformationDiv>
  );
}

const EmpInformationDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-row-gap: 1rem;
`;

const EmpProfil = styled.div`
  text-align: center;
  border: 1px solid darkgray;
  border-radius: 0.2rem;
  height: 15rem;
`;

const EmpDetail = styled.div`
  border-top: 2px solid #6c6c6c;
`;

const EmpProfilItem = styled.div`
  margin-top: 0.5em;
`;

const EmpProilImg = styled.img`
  border-radius: 70%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin-left: 3em;
  margin-top: 2em;
`;

const EmpDetailTitle = styled.div`
  font-size: 12px;
  border-right: 1px solid darkgray;
  text-align: center;
  padding-right: 0.5em;
`;

const EmpDetailItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 0.5em;
  border-bottom: 1px solid darkgray;
  font-size: 12px;
  height: 2rem;
  line-height: 2rem;
`;

const MygroupBtn = styled.button`
  float: right;
  margin-right: 0.5em;
  margin-top: 0.5em;
  border: 1px solid darkgray;
  padding: 0.5em 0.5em 0.5em 0.5em;
`;

export default OrgatreeEmpDetail;
