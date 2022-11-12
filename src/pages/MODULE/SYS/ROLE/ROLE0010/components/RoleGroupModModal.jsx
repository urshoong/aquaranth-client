import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalView,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";

const initState = {
  roleGroupNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

function RoleGroupModModal({
  loginUserCompany,
  setModModal,
  onClickDelBtn,
}) {
  const [modRoleGroup, setModRoleGroup] = useState({ ...initState });
  const {
    roleGroupNo,
    roleGroupName,
    roleGroupUse,
  } = modRoleGroup;

  const roleGroupChangeEvent = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "roleGroupName" || name === "companyName") {
      modRoleGroup[name] = value;
    }
    if (name === "roleGroupUse") {
      modRoleGroup[name] = (value === "true");
    }
    setModRoleGroup({ ...modRoleGroup });
  };

  return (
    <ModalBackdrop className="modal">
      <ModalView>
        <h2>** 권한그룹 수정 **</h2>
        <div className="comName">회사명: {loginUserCompany.companyName}</div>
        <div>
          그룹명:
          <input
            type="text"
            name="roleGroupName"
            value={roleGroupName}
            onChange={(e) => roleGroupChangeEvent(e)}
          />
        </div>
        <div>
          사용여부:
          <input
            type="radio"
            name="roleGroupUse"
            value="true"
            checked={roleGroupUse}
            onChange={(e) => roleGroupChangeEvent(e)}
          />사용
          <input
            type="radio"
            name="roleGroupUse"
            value="false"
            checked={!roleGroupUse}
            onChange={(e) => roleGroupChangeEvent(e)}
          />미사용
        </div>
        <div>
          <button
            className="button"
            type="button"
            onClick={() => {
              setModRoleGroup({ ...initState });
              setModModal(false);
            }}
          >취소
          </button>
          <button className="button" type="button" onClick={() => onClickModBtn()}>수정</button>
          <button className="button" type="button" onClick={() => onClickDelBtn(roleGroupNo)}>삭제</button>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export default RoleGroupModModal;
