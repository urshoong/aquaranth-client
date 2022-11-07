import React, { useEffect, useState } from "react";
import request from "../../utils/axiosUtil";
import "./style.css";
import RoleGroupList from "../../components/roleGroup/RoleGroupList";
import RoleGroupAddModal from "../../components/roleGroup/RoleGroupAddModal";
import { useHistory } from "react-router-dom";

const fetchCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const fetchRoleGroup = async () => {
  const { data } = await request.get("/role-group");
  return data;
};

const addRoleGroup = async (roleGroup) => {
  const { data } = await request.post("/role-group", roleGroup);
  // data.then((res) => console.log("권한그룹 추가를 완료했습니다 추가된 dto->", res));
  return data;
};


function RoleGroupPage() {
  const [companyList, setCompanyList] = useState([]);
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchRoleGroup()
      .then((data) => setRoleGroupList(data));
    fetchCompanyList()
      .then((data) => setCompanyList(data));
  }, [refresh]);

  return (
    <div className="firstOutDiv">
      <div className="headLine">
        <span className="comManage">권한그룹관리</span>
      </div>
      <div className="mainDiv">
        <div className="listInfoDiv">
          {/* 왼쪽 권한그룹 div */}
          <RoleGroupList
            roleGroupList={roleGroupList}
            companyList={companyList}
            setModal={setModal}
          />
          {/* 오른쪽 메뉴 div */}
          <div className="comInfo" />
        </div>
      </div>

      {
        modal === true ? (
          <RoleGroupAddModal
            addRoleGroup={addRoleGroup}
            companyList={companyList}
            setModal={setModal}
            refreshPage={refreshPage}
          />
        ) : null
      }

    </div>
  );
}

export default RoleGroupPage;
