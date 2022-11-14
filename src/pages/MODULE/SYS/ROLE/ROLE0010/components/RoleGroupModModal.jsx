import React, { useEffect, useState } from "react";
import {
  ModalBackdrop,
  ModalView,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupAddModal";
import request from "@utils/axiosUtil";

const initRoleGroupModDTO = {
  roleGroupNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

function RoleGroupModModal({
  loginUserCompany,
  setModModal,
  roleGroup,
  refreshPage,
}) {
  const [roleGroupModDTO, setRoleGroupModDTO] = useState({ ...initRoleGroupModDTO });
  const {
    roleGroupNo,
    roleGroupName,
    roleGroupUse,
  } = roleGroupModDTO;

  useEffect(() => {
    console.log("use Effect 실행됨");
    roleGroupModDTO.roleGroupNo = roleGroup.roleGroupNo;
    setRoleGroupModDTO({ ...roleGroupModDTO });
  }, []);

  const onClickCancelBtn = () => {
    setRoleGroupModDTO({ ...initRoleGroupModDTO });
    setModModal(false);
  };
  const onClickModBtn = async () => {
    console.log("수정하려는 권한그룹 DTO ", roleGroupModDTO);
    await request.put("/role-group", roleGroupModDTO)
      .then(() => {
        alert("권한그룹이 수정되었습니다.");
        console.log("권한그룹이 수정되었습니다.");
        setModModal(false);
        refreshPage();
      });
  };
  const onClickDelBtn = async () => {
    console.log("삭제하려는 권한그룹번호: ", roleGroupNo);
    await request.delete(`/role-group/${roleGroupNo}`)
      .then(() => {
        alert("권한그룹 삭제가 완료되었습니다.");
        console.log("권한그룹 삭제가 완료되었습니다.");
        refreshPage();
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
          <div>회사명: {loginUserCompany.companyName}</div>
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
          <button className="button" type="button" onClick={() => onClickDelBtn(roleGroupNo)}>삭제</button>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export default RoleGroupModModal;
