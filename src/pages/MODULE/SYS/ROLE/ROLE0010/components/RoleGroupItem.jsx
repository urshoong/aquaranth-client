import React from "react";
import {RoleGroupItemWrapper} from "./RoleGroupList";

function RoleGroupItem({ roleGroup }) {
  const {roleGroupName} = roleGroup;

  return (
    <RoleGroupItemWrapper>
      {roleGroupName}
    </RoleGroupItemWrapper>
  );
}

export default RoleGroupItem;
