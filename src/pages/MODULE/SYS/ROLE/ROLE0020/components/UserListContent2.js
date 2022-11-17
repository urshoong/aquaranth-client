import React from "react";

const UserListContent2 = ({
  className, orgaNo, companyName, deptName, empRank, empName, username, userListClickHandler,
}) => {
  return (
    <div key={orgaNo} className={className} data-orga-no={orgaNo} onClick={userListClickHandler} aria-hidden="true">
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{companyName}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{deptName}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{empRank}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{empName}({username})</span></div>
    </div>
  );
};

export default UserListContent2;
