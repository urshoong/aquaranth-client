import React from "react";

const RoleGroupContent = ({
  className, roleGroupNo, roleGroupClickHandler, companyName, companyNo, roleGroupName, displayChekcbox
}) => (
  <div className={className} key={roleGroupNo} onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true">
    <input type="checkbox" style={{ display: displayChekcbox }} />
    <div>
      <span onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true">{companyName}</span>
      <span onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true">{roleGroupName}</span>
    </div>
  </div>
);

export default RoleGroupContent;
