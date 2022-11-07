import React, { useState } from "react";
import SearchBox from "./SearchBox";

function RoleGroupList({
  roleGroupList,
  companyList,
  setModal,
}) {
  const [filter, setFilter] = useState([]);
  const [groupCount, setGroupCount] = useState(0);

  console.log("list componet에서 호출함 @@@@@@@@@@2", roleGroupList);


  return (
    <div>
      <SearchBox companyList={companyList} />
      <div className="comList">
        {roleGroupList?.map(({
          roleGroupNo,
          roleGroupName,
        }) => (
          <div key={roleGroupNo} className="comListDiv">
            <div>{roleGroupName}</div>
          </div>
        ))}
        <div className="listRegisterDiv">
          <button
            type="button"
            onClick={() => setModal(true)}
          >+ 추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleGroupList;
