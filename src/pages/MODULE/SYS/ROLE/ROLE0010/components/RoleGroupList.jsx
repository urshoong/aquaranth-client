import React from "react";
import styled from "styled-components";
import RoleGroupAddModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";
import RoleGroupModModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupModModal";
import { ModalContainer } from "@pages/MODULE/SYS/ROLE/ROLE0010";
import SearchBox from "./SearchBox";

export const AddModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

function RoleGroupList({
  roleGroupList,
  loginUserCompany,
  addModal,
  setAddModal,
  modModal,
  setModModal,
  refreshPage,
  onClickDelBtn,
  addRoleGroup,
}) {
  return (
    <ModalContainer>
      <SearchBox loginUserCompany={loginUserCompany} />
      <div className="comList">
        {roleGroupList?.map(({
          roleGroupNo,
          roleGroupName,
        }) => (
          <div key={roleGroupNo} className="comListDiv" onClick={() => setModModal(true)}>
            <div>{roleGroupName}</div>
            {
              modModal === true ? (
                <RoleGroupModModal
                  loginUserCompany={loginUserCompany}
                  setModModal={setModModal}
                  onClickDelBtn={onClickDelBtn}
                />
              ) : null
            }
          </div>
        ))}
        <div className="listRegisterDiv">
          <AddModalBtn
            type="button"
            onClick={() => setAddModal(true)}
          >+ 추가
          </AddModalBtn>
        </div>
      </div>
      {
        addModal === true ? (
          <RoleGroupAddModal
            addRoleGroup={addRoleGroup}
            loginUserCompany={loginUserCompany}
            setAddModal={setAddModal}
            refreshPage={refreshPage}
          />
        ) : null
      }


    </ModalContainer>
  );
}

export default RoleGroupList;
