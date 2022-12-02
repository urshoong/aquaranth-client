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
        {orgaNo
          && (
            <EmpProfilItem>
              <EmpProilImg
                src={profileUrl.indexOf("null") > -1 ? "" : profileUrl}
                alt="프로필 이미지"
                size="150"
              />
              <p style={{ marginTop: "1em" }}>{empName}/{empRank}</p>
              <p style={{ marginTop: "1em" }}>{username}</p>
            </EmpProfilItem>
          )}
      </EmpProfil>
      <EmpDetail>
        <EmpDetailItem>
          <EmpDetailTitle>
            소속부서
          </EmpDetailTitle>
          <EmpItemSpan>
            {path}
          </EmpItemSpan>
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            전화번호
          </EmpDetailTitle>
          <EmpItemSpan>
            {empPhone}
          </EmpItemSpan>
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            이메일
          </EmpDetailTitle>
          <EmpItemSpan>
            {email}
          </EmpItemSpan>
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
  position: relative;
`;

const EmpDetail = styled.div`
  border-top: 2px solid #6c6c6c;
`;

const EmpProfilItem = styled.div`
  width: 100%;
  height: 100%;
`;

const EmpProilImg = styled.div`
  border-radius: 70%;
  margin: 1.5em auto 0em auto;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-color: ${(props) => props.src || "#46A3FB"};
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

const EmpItemSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MygroupBtn = styled.button`
  margin-right: 0.5em;
  margin-top: 0.5em;
  border: 1px solid darkgray;
  padding: 0.5em 0.5em 0.5em 0.5em;
  position: absolute;
  right: 0;
  top: 0;
`;

export default OrgatreeEmpDetail;
