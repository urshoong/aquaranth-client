import React, { useState } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";

export const AddModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

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
          <AddModalBtn
            type="button"
            onClick={() => setModal(true)}
          >+ 추가
          </AddModalBtn>
        </div>
      </div>
    </div>
  );
}

export default RoleGroupList;
