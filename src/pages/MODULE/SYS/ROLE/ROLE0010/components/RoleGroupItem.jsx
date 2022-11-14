import React, { useState } from "react";
import RoleGroupModModal from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupModModal";

function RoleGroupItem({ roleGroup, loginUserCompany, refreshPage }) {
  const [modModal, setModModal] = useState(false);
  const { roleGroupName } = roleGroup;

  return (
    <div className="comListDiv">
      <div>{roleGroupName}</div>
      <button className="button" type="button" onClick={() => setModModal(true)}>수정/삭제</button>
      <div className="modModal-check">
        {
          modModal === true ? (
            <RoleGroupModModal
              loginUserCompany={loginUserCompany}
              setModModal={setModModal}
              roleGroup={roleGroup}
              refreshPage={refreshPage}
            />
          ) : null
        }
      </div>
    </div>
  );
}

export default RoleGroupItem;
