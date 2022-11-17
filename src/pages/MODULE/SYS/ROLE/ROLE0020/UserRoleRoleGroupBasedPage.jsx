import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent";

const getCompanyList = async (orgaNo) => {
  const { data } = await request.get(`/userrole/companyList/${orgaNo}`);
  return data;
};

const getGroupList = async (orgaNo, roleGroupSearch) => {
  const { data } = await request.get(`/userrole/roleGroupList?orgaNo=${orgaNo}&roleGroupSearch=${roleGroupSearch}`);
  return data;
};

const getUserList = async ({ companyNo, roleGroupNo, userListSearch }) => {
  const { data } = await request.get(`/userrole/roleGroupUserList?companyNo=${companyNo}&roleGroupNo=${roleGroupNo}&userListSearch=${userListSearch}`);
  return data;
};

const insertOrgaRole = async (inputData) => {
  const { data } = await request.post("/userrole/insertOrgaRole", inputData);
  return data;
};

const removeOrgaRole = async (removeData) => {
  const { data } = await request.post("/userrole/removeOrgaRole", removeData);
  return data;
};

const initSearchCondition = {
  companyNo: 0,
  roleGroupNo: 0,
  userListSearch: "",
};

const dummyCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const userListDummy = [
  { orgaNo: dummyCount[0], orgaInfo: `회사${dummyCount[0]}>부서${dummyCount[0]}`, empRank: "사원", empName: `사원${dummyCount[0]}`, username: `user${dummyCount[0]}` },
  { orgaNo: dummyCount[1], orgaInfo: `회사${dummyCount[1]}>부서${dummyCount[1]}`, empRank: "사원", empName: `사원${dummyCount[1]}`, username: `user${dummyCount[1]}` },
  { orgaNo: dummyCount[2], orgaInfo: `회사${dummyCount[2]}>부서${dummyCount[2]}`, empRank: "사원", empName: `사원${dummyCount[2]}`, username: `user${dummyCount[2]}` },
  { orgaNo: dummyCount[3], orgaInfo: `회사${dummyCount[3]}>부서${dummyCount[3]}`, empRank: "사원", empName: `사원${dummyCount[3]}`, username: `user${dummyCount[3]}` },
  { orgaNo: dummyCount[4], orgaInfo: `회사${dummyCount[4]}>부서${dummyCount[4]}`, empRank: "사원", empName: `사원${dummyCount[4]}`, username: `user${dummyCount[4]}` },
  { orgaNo: dummyCount[5], orgaInfo: `회사${dummyCount[5]}>부서${dummyCount[5]}`, empRank: "사원", empName: `사원${dummyCount[5]}`, username: `user${dummyCount[5]}` },
  { orgaNo: dummyCount[6], orgaInfo: `회사${dummyCount[6]}>부서${dummyCount[6]}`, empRank: "사원", empName: `사원${dummyCount[6]}`, username: `user${dummyCount[6]}` },
  { orgaNo: dummyCount[7], orgaInfo: `회사${dummyCount[7]}>부서${dummyCount[7]}`, empRank: "사원", empName: `사원${dummyCount[7]}`, username: `user${dummyCount[7]}` },
  { orgaNo: dummyCount[8], orgaInfo: `회사${dummyCount[8]}>부서${dummyCount[8]}`, empRank: "사원", empName: `사원${dummyCount[8]}`, username: `user${dummyCount[8]}` },
  { orgaNo: dummyCount[9], orgaInfo: `회사${dummyCount[9]}>부서${dummyCount[9]}`, empRank: "사원", empName: `사원${dummyCount[9]}`, username: `user${dummyCount[9]}` },
];

const UserRoleRoleGroupBasedPage = (props) => {
  const [company, setCompany] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);
  const [searchCondition, setSearchCondition] = useState(initSearchCondition);
  const [userList, setUserList] = useState([]);

  const searchClickHandler = () => {
    const selectedCompany = document.querySelector(".companySelect");
    const searchInput = document.querySelector(".searchInput");
    getGroupList(selectedCompany.value, searchInput.value).then((data) => {
      // roleGroupList에서 active 해제해주기 위하여 처리
      setRoleGroup([]);
      setRoleGroup(data);
      // 초기화
      // setSearchCondition({ ...initSearchCondition });
      setUserList([]);

      const roleGroupContainer = document.querySelector(".leftSection.section2");
      roleGroupContainer.scrollTop = 0;
    });
  };

  useEffect(() => {
    // TODO : 로그인한 사용자의 회사의 orga_no를 입력받아서 처리해야함
    getCompanyList(1).then((data) => {
      setCompany(data);
      searchClickHandler();
    });
  }, []);

  const userSearchClickHandler = () => {
    getUserList(searchCondition).then((data) => {
      setUserList([]);
      setUserList(data);

      const userListContainer = document.querySelector(".innerContentContainer");
      userListContainer.scrollTop = 0;
    });
  };

  const changeSearchConditionHandler = (prop, value) => {
    searchCondition[prop] = value;
    setSearchCondition({ ...searchCondition });
  };

  const roleGroupClickHandler = (e, companyNo, roleGroupNo) => {
    e.stopPropagation();
    let { target } = e;
    // groupContent 하위의 모든 컨텐츠에서 클릭 이벤트가 발생할 경우 groupContent class를 찾을 때 까지 target을 부모 요소로 리턴한다
    while (!target.classList.contains("groupContent")) {
      target = target.parentElement;
    }

    const groupContentList = document.querySelectorAll(".groupContent");
    groupContentList.forEach((groupContent) => groupContent.classList.remove("active"));
    target.classList.add("active");

    changeSearchConditionHandler("companyNo", companyNo);
    changeSearchConditionHandler("roleGroupNo", roleGroupNo);

    userSearchClickHandler();
  };

  const orgaBtnClickHandler = () => {
    if (searchCondition.companyNo === 0 || searchCondition.roleGroupNo === 0) {
      alert("권한그룹이 선택되지 않았습니다.");
      return;
    }

    const inputData = {};
    let orgaNoList = [];
    inputData.companyNo = searchCondition.companyNo;
    inputData.roleGroupNo = searchCondition.roleGroupNo;
    orgaNoList = [19, 20, 21];
    inputData.orgaNoList = orgaNoList;

    insertOrgaRole(inputData).then((data) => {
      userSearchClickHandler();
    });
  };

  const orgaRoleRemove = () => {
    const elements = document.querySelectorAll(".contentContainer>.contentRow:not(.header)");
    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return element.dataset?.orgaNo;
    });

    const removeData = {
      companyNo: searchCondition.companyNo,
      roleGroupNo: searchCondition.roleGroupNo,
      removeOrgaRoleList: arr,
    };

    removeOrgaRole(removeData).then((data) => {
      userSearchClickHandler();
    });
  };

  return (
    <>
      <div className="section roleGroup left">
        <div className="leftSection header">
          <div className="selectWrap">
            <select className="companySelect">
              {company?.map(({
                companyNo, companyName, orgaNo,
              }) => <option key={companyNo} value={orgaNo}>{ companyName }</option>)}
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
              displayChekcbox="none"
            />
          ))}
        </div>
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
      <div className="section roleGroup right">
        <div className="innerTitleWrap">
          <span className="innerTitle">사용자 선택</span>
          <div>
            <button type="button" className="btn" onClick={() => { orgaRoleRemove(); }}>&nbsp;권한삭제&nbsp;</button>
            <button type="button" className="btn orgaBtn" onClick={() => { orgaBtnClickHandler(); }}>👨‍👨‍👦</button>
          </div>
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
              <div><input type="checkbox" className="userCheckAll" /></div>
              <div><span>조직정보</span></div>
              <div><span>직급</span></div>
              <div><span>이름(ID)</span></div>
            </div>
            <div className="innerContentContainer">
              {/* {userListDummy?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => ( */}
              {userList?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => (
                <UserListContent className="contentRow" key={orgaNo} orgaNo={orgaNo} orgaInfo={orgaInfo} empRank={empRank} empName={empName} username={username} />
              ))}
            </div>
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
    </>
  );
};

export default UserRoleRoleGroupBasedPage;
