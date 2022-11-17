import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import UserListContent2 from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent2";

const initSearchCondition = {
  orgaNo: 0,
  searchEmp: "",
  searchRole: "",
};

const getCompanyList = async (companyNo) => {
  const { data } = await request.get(`/userrole/companyList/${companyNo}`);
  return data;
};

const getUserList = async ({ orgaNo, searchEmp, searchRole }) => {
  const { data } = await request.get(`/userrole/findUserListByOrgaNo?orgaNo=${orgaNo}&searchEmp=${searchEmp}&searchRole=${searchRole}`);
  return data;
};

const getGroupList = async (orgaNo) => {
  const { data } = await request.get(`/userrole/findByRoleGroupByUser/${orgaNo}`);
  return data;
};

const UserRoleUserBasedPage = (props) => {
  const [company, setCompany] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);
  const [searchCondition, setSearchCondition] = useState(initSearchCondition);

  const searchClickHandler = () => {
    const selectedCompany = document.querySelector(".companySelect");
    const searchEmp = document.querySelector(".searchEmp");
    const searchRole = document.querySelector(".searchRole");

    searchCondition.orgaNo = selectedCompany.value;
    searchCondition.searchEmp = searchEmp.value;
    searchCondition.searchRole = searchRole.value;

    setSearchCondition({ ...searchCondition });

    getUserList(searchCondition).then((data) => {
      setUserList([]);
      setUserList(data);
    });

    const userListContainer = document.querySelector(".innerContentContainer");
    userListContainer.scrollTop = 0;
  };

  const userListClickHandler = (e) => {
    e.stopPropagation();
    let { target } = e;
    while (!target.classList.contains("contentRow2")) {
      target = target.parentElement;
    }
    document.querySelector(".contentRow.contentRow2.active")?.classList.remove("active");
    target.classList.add("active");

    const orgaNo = target.dataset?.orgaNo;
    console.log("orgaNo", orgaNo);

    getGroupList(orgaNo).then((data) => {
      console.log("Data", data);
      setRoleGroup(data);
    });
  };

  const roleGroupClickHandler = (e) => {

  }

  useEffect(() => {
    // 로그인한 사용자의 회사 코드를 입력받아서 처리해야함
    getCompanyList(1).then((data) => {
      setCompany(data);
      searchClickHandler();
    });
  }, []);

  return (
    <div className="innerWrap">
      <div className="innerInformationWrap">
        <span>௹</span>
        <div>
          <span>선택한 권한을 사용할 사용자를 선택하세요.</span>
          <span>회사/부서 권한이 부여되어 있는 권한그룹은 권한해제가 불가합니다.</span>
        </div>
      </div>
      <div className="innerSearchWrap userList">
        <div className="selectWrap userList" name="selectWrap">
          <span className="searchLabel">회사</span>
          <select className="companySelect">
            {company?.map(({
              companyNo, companyName, orgaNo,
            }) => <option key={companyNo} value={orgaNo}>{ companyName }</option>)}
          </select>
        </div>
        <div>
          <span className="searchLabel">이름/ID</span>
          <input type="text" className="innerSearchInput searchEmp" />
        </div>
        <div>
          <span className="searchLabel">권한명</span>
          <input type="text" className="innerSearchInput searchRole" />
        </div>
        <div className="searchWrap userList">
          <button type="button" className="btn innerSearchBtn" onClick={() => { searchClickHandler(); }}>🔍</button>
        </div>
      </div>
      <div className="innerContent userList">
        <div className="section userList left">
          <div className="contentContainer userList">
            <div className="contentRow contentRow2 header">
              <div><span>회사명</span></div>
              <div><span>부서명</span></div>
              <div><span>직급</span></div>
              <div><span>이름(ID)</span></div>
            </div>
            <div className="innerContentContainer">
              {userList?.map(({ orgaNo, companyName, deptName, empRank, empName, username }) => (
                <UserListContent2
                  className="contentRow contentRow2"
                  key={orgaNo}
                  orgaNo={orgaNo}
                  companyName={companyName}
                  deptName={deptName}
                  empRank={empRank}
                  empName={empName}
                  username={username}
                  userListClickHandler={userListClickHandler}
                />
              ))}
            </div>
          </div>
          <div className="innerPaginationWrap">
            {/* TODO : 페이징 처리해야됨 */}
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
                <div className="pageSummary">
                  <span>총</span>
                  <span>{userList?.length}</span>
                  <span>개</span>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="section userList right">
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
          <div className="leftSection userList section2">
            {roleGroup?.map(({
              roleGroupNo, roleGroupName, companyName, companyNo,
            }) => (
              <RoleGroupContent
                className="groupContent"
                key={roleGroupNo}
                companyNo={companyNo}
                companyName={companyName}
                roleGroupNo={roleGroupNo}
                roleGroupName={roleGroupName}
                roleGroupClickHandler={roleGroupClickHandler}
                displayChekcbox=""
              />
            ))}
          </div>y;.yyyy
          <div className="leftSection footer">
            {/* TODO : paging 처리해야됨 */}
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
      </div>
    </div>
  );
};

export default UserRoleUserBasedPage;
