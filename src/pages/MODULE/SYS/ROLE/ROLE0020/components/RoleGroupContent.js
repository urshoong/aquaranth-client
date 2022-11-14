import React from "react";

const RoleGroupContent = ({
  className, roleGroupNo, roleGroupClickHandler, companyName, companyNo, roleGroupName,
}) => (
  <div className={className} key={roleGroupNo} onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true"/* data-company-no={companyNo} data-role-group-no={roleGroupNo} */>
    <span onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true">{companyName}</span>
    <span onClick={(e) => { roleGroupClickHandler(e, companyNo, roleGroupNo); }} aria-hidden="true">{roleGroupName}</span>
  </div>
);

export default RoleGroupContent;
