import React, { useState } from "react";
import styled from "styled-components";
import RoleGroupAddModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";
import RoleGroupItem from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupItem";

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
  refreshPage,
}) {
  const [addModal, setAddModal] = useState(false);
  return (
    <div>
      <div className="roleGroupList">
        {roleGroupList?.map((roleGroup) => (
          <RoleGroupItem
            key={roleGroup.roleGroupNo}
            roleGroup={roleGroup}
            loginUserCompany={loginUserCompany}
            refreshPage={refreshPage}
          />
        ))}
      </div>
      <AddModalBtn type="button" onClick={() => setAddModal(true)}>+ 추가</AddModalBtn>
      <div className="addModal-check">
        {
          addModal === true ? (
            <RoleGroupAddModal
              loginUserCompany={loginUserCompany}
              setAddModal={setAddModal}
              refreshPage={refreshPage}
            />
          ) : null
        }
      </div>
    </div>
  );
}

export default RoleGroupList;
