import React, { useEffect, useState } from "react";
import "./group.css";
import request from "@utils/axiosUtil";

const getOrgaTree = async () => {
  const { data } = await request.get("/company/tree");

  return data;
};

const Group = () => {
  const [show, setShow] = useState(false);
  const [tree, setTree] = useState([]);

  const displayClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    getOrgaTree().then((data) => {
      setTree(data);
      console.log(data);
    })
  }, []);


  return (
    <div className="outsideDiv">
      <div className="displayDiv">
        <button className="displayBt" type="submit" name="orgaDisplayBt" value="true" onClick={displayClick}>조직도</button>
      </div>

      {show && (
        <div className="orgaMainDiv">
          <div className="orgaTreeSpanDiv">
            <span className="orgaTree">조직도</span>
          </div>
          <div className="orgaGroupSpanDiv">
            <span className="allGroup">전체그룹</span>
            <span className="myGroup">MY그룹</span>
          </div>
          <div className="searchGroupDiv">
            <select className="searchSelect">
              <option value="all">전체</option>
              <option value="company">회사</option>
              <option value="dept">부서</option>
              <option value="emp">사원</option>
            </select>
            <input className="searchInput" placeholder="검색어를 입력해주세요." />
            <button className="searchBt" type="submit">🔍</button>
          </div>
          <div className="orgaTreeEmpInfoDiv">
            <div className="orgaTreeDiv" />
            <div className="orgaEmpDiv" />
            <div className="orgaEmpInfoDiv" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
