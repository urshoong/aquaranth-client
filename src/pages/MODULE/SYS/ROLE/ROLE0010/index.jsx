import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import "./style.css";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";


const fetchData = async () => {
  // const { data } = await request.get("/company/list");
  const { data } = await request.get("/role-group");
  return data;
};

function index() {
  const [companyList, setCompanyList] = useState([]);
  const [roleGroupList, setRoleGroupList] = useState([]);

  useEffect(() => {
    // fetchData()
    //   .then((data) => setCompanyList(data))
    //   .catch((reason) => alert(reason));

    fetchData()
      .then((data) => setRoleGroupList(data));
  }, []);

  return (
    <div>
      <div className="headLine">
        <span className="comManage">권한그룹관리</span>
      </div>
      <div className="mainDiv">
        <div className="listInfoDiv">
          {/* 왼쪽 권한그룹 div */}
          <RoleGroupList roleGroupList={roleGroupList} companyList={companyList} />
          {/* 오른쪽 메뉴 div */}
          <div className="comInfo" />
        </div>
      </div>

    </div>
  );
}

export default index;
