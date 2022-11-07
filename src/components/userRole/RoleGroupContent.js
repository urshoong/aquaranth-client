import React from "react";

const RoleGroupContent = ({
  className, roleGroupNo, roleGroupClickHandler, companyName, roleGroupName,
}) => (
  <div className={className} key={roleGroupNo} onClick={(e) => { roleGroupClickHandler(e); }} aria-hidden="true">
    <span onClick={(e) => { roleGroupClickHandler(e); }} aria-hidden="true">{companyName}</span>
    <span onClick={(e) => { roleGroupClickHandler(e); }} aria-hidden="true">{roleGroupName}</span>
  </div>
);

export default RoleGroupContent;
