import React from "react";

const RoleGroupContent = ({
  className,
  orgaRoleNo,
  roleGroupNo,
  roleGroupClickHandler,
  companyName,
  orgaNo,
  roleGroupName,
  displayCheckbox,
}) => (
  <div className={className} key={orgaRoleNo} onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true" data-orga-no={orgaNo} data-role-group-no={roleGroupNo}>
    <input type="checkbox" style={{ display: displayCheckbox }} />
    <div>
      <span onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true">{companyName}</span>
      <span onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true">{roleGroupName}</span>
    </div>
  </div>
);

export default RoleGroupContent;
