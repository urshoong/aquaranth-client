import React, { useEffect, useState } from "react";
import styled from "styled-components";
import request from "@utils/axiosUtil";
import { useDispatch, useSelector } from "react-redux";
import { changeRefresh } from "@reducer/roleGroupSlice";

// style div
export const ModalBackdrop = styled.div`
  //width: 100%;
  //height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;

const initRoleGroupDTO = {
  roleGroupName: "",
  roleGroupUse: true,
};

function RoleGroupAddModal({ setAddModal }) {
  const dispatch = useDispatch();
  const { companyName } = useSelector((state) => state.roleGroup);
  const [roleGroupInsertReqDTO, setRoleGroupInsertReqDTO] = useState({ ...initRoleGroupDTO });
  const {
    roleGroupName,
    roleGroupUse,
  } = roleGroupInsertReqDTO;

  const roleGroupChangeEvent = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "roleGroupName" || name === "companyName") {
      roleGroupInsertReqDTO[name] = value;
    }
    if (name === "roleGroupUse") {
      roleGroupInsertReqDTO[name] = (value === "true");
    }
    setRoleGroupInsertReqDTO({ ...roleGroupInsertReqDTO });
  };
  const onClickAddBtn = async () => {
    await request.post("/role-group", roleGroupInsertReqDTO)
      .then(({ data }) => {
        console.log("권한그룹 추가가 완료되었습니다. 추가된 권한그룹 -> ", data);
        setAddModal(false);
        dispatch(changeRefresh());
      });
  };
  const onClickCancelBtn = () => {
    setRoleGroupInsertReqDTO({ ...initRoleGroupDTO });
    setAddModal(false);
  };

  return (
    <ModalView>
      <h2>** 권한그룹 등록 **</h2>
      <div className="comName">{companyName}</div>
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
        <button className="button" type="button" onClick={() => onClickCancelBtn()}>취소</button>
        <button className="button" type="button" onClick={() => onClickAddBtn()}>확인</button>
      </div>
    </ModalView>
  );
}

export default RoleGroupAddModal;
