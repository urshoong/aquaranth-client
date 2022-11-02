import React, { useState } from "react";

function RoleGroupList(props) {
  const [filter, setFilter] = useState([]);
  const [groupCount, setGroupCount] = useState(0);
  const [roles, setRoles] = useState([]);


  return (
    <div>
      {/* list header */}
      <div className="flex-container">
        <div>그룹: {groupCount}개</div>
        &nbsp;&nbsp;&nbsp;필터 : <select>
          <option>이름순</option>
          <option>최신순</option>
          <option>오래된순</option>
        </select>
      </div>
      {/* list */}
      <div className="group-list">
        {roles.map((item) => <div>dd</div>)}
      </div>
      {/* list footer */}
      <div className="footer">
        <button className="button">추가</button>
        <div>paging</div>
      </div>
    </div>
  );
}

export default RoleGroupList;
