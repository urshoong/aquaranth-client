import React, { useEffect, useState } from "react";
import {
  ModalBackdrop,
  ModalView,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";
import request from "@utils/axiosUtil";
import { useDispatch, useSelector } from "react-redux";
import { changeRefresh } from "@reducer/roleGroupSlice";

const initRoleGroupModDTO = {
  roleGroupNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

function RoleGroupModModal({ roleGroup, setModModal }) {
  const { companyName } = useSelector((state) => state.roleGroup);
  const dispatch = useDispatch();
  const [roleGroupModDTO, setRoleGroupModDTO] = useState({ ...initRoleGroupModDTO });
  const { roleGroupName, roleGroupUse } = roleGroupModDTO;

  const onClickCancelBtn = () => {
    setRoleGroupModDTO({ ...initRoleGroupModDTO });
    setModModal(false);
  };
  const onClickModBtn = async () => {
    roleGroupModDTO.roleGroupNo = roleGroup.roleGroupNo;
    await request.put("/role-group", roleGroupModDTO)
      .then(() => {
        console.log("권한그룹이 수정되었습니다.");
        setRoleGroupModDTO({ ...initRoleGroupModDTO });
        setModModal(false);
        dispatch(changeRefresh());
      });
  };
  const onClickDelBtn = async () => {
    await request.delete(`/role-group/${roleGroup.roleGroupNo}`)
      .then(() => {
        console.log("권한그룹 삭제가 완료되었습니다.");
        setModModal(false);
        dispatch(changeRefresh());
      });
  };
  const roleGroupChangeEvent = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "roleGroupName" || name === "companyName") {
      roleGroupModDTO[name] = value;
    }
    if (name === "roleGroupUse") {
      roleGroupModDTO[name] = (value === "true");
    }
    setRoleGroupModDTO({ ...roleGroupModDTO });
  };

  return (
    <ModalBackdrop className="modal">
      <ModalView>
        <h2>** 권한그룹 수정 **</h2>
        <div className="comName">
          <div>회사명: {companyName}</div>
          <div className="inputGroup">
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
            </div>
            <div>
              <input
                type="radio"
                name="roleGroupUse"
                value="false"
                checked={!roleGroupUse}
                onChange={(e) => roleGroupChangeEvent(e)}
              />미사용
            </div>
          </div>
        </div>
        <div className="btnGroup">
          <button className="button" type="button" onClick={() => onClickCancelBtn()}>취소</button>
          <button className="button" type="button" onClick={() => onClickModBtn()}>수정</button>
          <button className="button" type="button" onClick={() => onClickDelBtn()}>삭제</button>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export default RoleGroupModModal;
