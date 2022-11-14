import React, { useEffect, useState } from "react";
// import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import request from "@utils/axiosUtil";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";

const getCompanyList = async (companyNo) => {
  const { data } = await request.get(`/userrole/companyList/${companyNo}`);
  return data;
};

const getGroupList = async (companyNo, roleGroupSearch) => {
  const { data } = await request.get(`/userrole/roleGroupList?companyNo=${companyNo}&roleGroupSearch=${roleGroupSearch}`);
  return data;
};

const getUserList = async ({ companyNo, roleGroupNo, userListSearch }) => {
  const { data } = await request.get(`/userrole/roleGroupUserList?companyNo=${companyNo}&roleGroupNo=${roleGroupNo}&userListSearch=${userListSearch}`);
  return data;
};

const stringToNumber = (value) => {
  let result;
  if (typeof value === "number") result = value;
  if (typeof value === "string") result = parseInt(value, 10);
  return result;
};

const initSearchCondition = {
  companyNo: 0,
  roleGroupNo: 0,
  userListSearch: "",
};

const UserRoleRoleGroupBasedPage = (props) => {
  const [company, setCompany] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);
  const [searchCondition, setSearchCondition] = useState(initSearchCondition);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // 로그인한 사용자의 회사 코드를 입력받아서 처리해야함
    getCompanyList(1).then((data) => {
      setCompany(data);
    });
  }, []);

  const searchClickHandler = () => {
    const selectedCompany = document.querySelector(".companySelect");
    const searchInput = document.querySelector(".searchInput");
    getGroupList(selectedCompany.value, searchInput.value).then((data) => {
      // roleGroupList에서 active 해제해주기 위하여 처리
      setRoleGroup([]);
      setRoleGroup(data);
      // 초기화
      setSearchCondition({ ...initSearchCondition });
      setUserList([]);
    });
  };

  const userSearchClickHandler = () => {
    getUserList(searchCondition).then((data) => {
      setUserList([]);
      setUserList(data);
    });
  };

  const changeSearchConditionHandler = (prop, value) => {
    searchCondition[prop] = value;
    setSearchCondition({ ...searchCondition });
  };

  const roleGroupClickHandler = (e, companyNo, roleGroupNo) => {
    e.stopPropagation();
    const target = e.target.tagName === "DIV" ? e.target : e.target.parentElement;
    const groupContentList = document.querySelectorAll(".groupContent");
    groupContentList.forEach((groupContent) => groupContent.classList.remove("active"));
    target.classList.add("active");

    // const companyNo = stringToNumber(target.dataset?.companyNo);
    // const roleGroupNo = stringToNumber(target.dataset?.roleGroupNo);
    changeSearchConditionHandler("companyNo", companyNo);
    changeSearchConditionHandler("roleGroupNo", roleGroupNo);

    userSearchClickHandler();
  };

  return (
    <>
      <div className="section roleGroup left">
        <div className="leftSection header">
          <div className="selectWrap">
            <select className="companySelect">
              {company?.map(({
                companyNo, companyName,
              }) => <option key={companyNo} value={companyNo}>{ companyName }</option>)}
            </select>
          </div>
          <div className="searchWrap">
            <input type="text" className="searchInput" placeholder="권한명을 검색하세요." />
            <button type="button" className="btn searchBtn" onClick={searchClickHandler}>🔍</button>
          </div>
        </div>
        <div className="leftSection section1">
          <div className="groupCountWrap">
            <span>그룹 : </span>
            <span>{roleGroup.length}</span>
            <span>개</span>
          </div>
          <div className="groupSortWrap">
            <select>
              <option>필터</option>
              <option>필터2</option>
              <option>필터3</option>
            </select>
          </div>
        </div>
        <div className="leftSection section2">
          <div style={{ maxHeight: "100%", overflowY: "auto" }}>
            {roleGroup?.map(({
              roleGroupNo, roleGroupName, companyName, companyNo,
            }) => (
              <RoleGroupContent
                className="groupContent"
                companyNo={companyNo}
                companyName={companyName}
                roleGroupNo={roleGroupNo}
                roleGroupName={roleGroupName}
                roleGroupClickHandler={roleGroupClickHandler}
              />
            ))}
          </div>
        </div>
        <div className="leftSection footer">
          <div className="paginationWrap">
            <ul className="pagination">
              <li className="pageBtn prev">«</li>
              <li className="pageBtn prev">‹</li>
              <li className="pageBtn page">1</li>
              <li className="pageBtn next">›</li>
              <li className="pageBtn next">»</li>
              <select className="pageBtn pageSizeSelect">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </ul>
          </div>
        </div>
      </div>
      <div className="section roleGroup right">
        <div className="innerTitleWrap">
          <span className="innerTitle">• 사용자 선택</span>
          <button type="button" className="btn orgaBtn">👨‍👨‍👦</button>
        </div>
        <div className="innerInformationWrap">
          <span>௹</span>
          <span>선택한 권한을 사용할 사용자를 선택하세요.</span>
        </div>
        <div className="innerSearchWrap">
          <input type="text" className="innerSearchInput" name="userListSearch" onChange={(e) => { changeSearchConditionHandler(e.target.name, e.target.value); }} placeholder="부서 / 직급 / 이름 / ID 를 검색 하세요" />
          <button type="button" className="btn innerSearchBtn" onClick={() => { userSearchClickHandler(); }}>🔍</button>
        </div>
        <div className="innerContent">
          <div className="contentContainer">
            <div className="contentRow header">
              <div><input type="checkbox" className="userCheckAll"/></div>
              <div><span>조직정보</span></div>
              <div><span>직급</span></div>
              <div><span>이름(ID)</span></div>
            </div>
            {userList?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => (
              <div className="contentRow" key={orgaNo}>
                <div><input type="checkbox" /></div>
                <div><span>{orgaInfo}</span></div>
                <div><span>{empRank}</span></div>
                <div><span>{empName}{username ? `(${username})` : ""}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="innerPaginationWrap">
          <div className="paginationWrap">
            <ul className="pagination">
              <li className="pageBtn prev">«</li>
              <li className="pageBtn prev">‹</li>
              <li className="pageBtn page">1</li>
              <li className="pageBtn next">›</li>
              <li className="pageBtn next">»</li>
              <select className="pageBtn pageSizeSelect">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoleRoleGroupBasedPage;
