import React, { useState } from "react";


const initState = {
  companyName: "",
  roleGroupName: "",
  roleGroupUse: true,
};

function RoleGroupAddModal({ setModal, companyList, addRoleGroup, refreshPage }) {
  const [roleGroup, setRoleGroup] = useState({ ...initState });
  const { roleGroupUse, roleGroupName } = roleGroup;

  const roleGroupChangeEvent = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "roleGroupName" || name === "companyName") {
      roleGroup[name] = value;
    }
    if (name === "roleGroupUse") {
      roleGroup[name] = (value === "true");
    }
    setRoleGroup({ ...roleGroup });
  };

  const onClickAddBtn = () => {
    if (roleGroup.companyName === "") {
      alert("회사를 선택해 주십시오.");
      return;
    }

    addRoleGroup(roleGroup)
      .then((data) => {
        console.log(data);
        // 상위 컴포넌트의 주소창 이동 함수를 받아서 이동
        setModal(false);
        refreshPage();
      });
  };

  return (
    <div className="modal">
      <h2>** 권한그룹 등록 **</h2>

      <div>
        회사:
        <select name="companyName" onChange={(e) => roleGroupChangeEvent(e)}>
          <option>회사선택</option>
          {companyList.map((company) => {
            const {
              companyNo,
              companyName,
            } = company;
            return <option key={companyNo}>{companyName}</option>;
          })}
        </select>
      </div>

      <div className="">
        그룹명:
        <input type="text" name="roleGroupName" value={roleGroupName} onChange={(e) => roleGroupChangeEvent(e)} />
      </div>

      <div>
        사용여부:
        <input type="radio" name="roleGroupUse" value="true" checked={roleGroupUse} onChange={(e) => roleGroupChangeEvent(e)} />사용
        <input type="radio" name="roleGroupUse" value="false" checked={!roleGroupUse} onChange={(e) => roleGroupChangeEvent(e)} />미사용
      </div>

      <div>
        <button
          className="button"
          type="button"
          onClick={() => {
            setRoleGroup({ ...initState });
            setModal(false);
          }}
        >취소
        </button>
        <button className="button" type="button" onClick={() => onClickAddBtn()}>확인</button>
      </div>

    </div>
  );
}

export default RoleGroupAddModal;
