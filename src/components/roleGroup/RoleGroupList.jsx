import React, { useState } from "react";
import SearchBox from "./SearchBox";

function RoleGroupList({ roleGroupList, companyList }) {
  const [filter, setFilter] = useState([]);
  const [groupCount, setGroupCount] = useState(0);


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
            onClick={() => {
              alert("click");
            }}
          >+ 추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleGroupList;
