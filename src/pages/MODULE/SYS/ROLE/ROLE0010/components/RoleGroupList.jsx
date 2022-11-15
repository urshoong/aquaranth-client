import React, { useState } from "react";
import styled from "styled-components";
import RoleGroupAddModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";
import RoleGroupItem from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupItem";
import { useSelector } from "react-redux";

export const AddModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

function RoleGroupList({ showUserMenu }) {
  const { roleGroupList } = useSelector((state) => state.roleGroup);
  const [addModal, setAddModal] = useState(false);

  return (
    <div>
      <div className="roleGroupList">
        {roleGroupList?.map((roleGroup) => (
          <RoleGroupItem
            key={roleGroup.roleGroupNo}
            roleGroup={roleGroup}
            showUserMenu={showUserMenu}
          />
        ))}
      </div>
      <AddModalBtn type="button" onClick={() => setAddModal(true)}>+ 추가</AddModalBtn>
      <div className="addModal-check">
        {
          addModal === true ? <RoleGroupAddModal setAddModal={setAddModal} /> : null
        }
      </div>
    </div>
  );
}

export default RoleGroupList;
