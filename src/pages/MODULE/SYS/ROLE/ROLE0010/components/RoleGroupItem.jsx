import React, { useState } from "react";
import RoleGroupModModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupModModal";

function RoleGroupItem({ roleGroup }) {
  const { roleGroupName } = roleGroup;
  const [modModal, setModModal] = useState(false);

  return (
    <div className="comListDiv">
      <div>{roleGroupName}</div>
      <button className="button" type="button" onClick={() => setModModal(true)}>수정/삭제</button>
      <div className="modModal-check">
        {
          modModal === true ? <RoleGroupModModal setModModal={setModModal} roleGroup={roleGroup} /> : null
        }
      </div>
    </div>
  );
}

export default RoleGroupItem;
