import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent";

const getCompanyList = async (orgaNo) => {
  const { data } = await request.get("/userrole/companyList");
  return data;
};

const getGroupList = async ({ page, size, orgaNo, keyword1 }) => {
  const { data } = await request.get(`/userrole/roleGroupList?page=${page}&size=${size}&orgaNo=${orgaNo}&keyword1=${keyword1}`);
  return data;
};

const getUserList = async ({ orgaNo, roleGroupNo, keyword1 }) => {
  const { data } = await request.get(`/userrole/roleGroupUserList?orgaNo=${orgaNo}&roleGroupNo=${roleGroupNo}&keyword1=${keyword1}`);
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

const initRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
};

const initUlSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  roleGroupNo: 0,
  keyword1: "",
};

const UserRoleRoleGroupBasedPage = () => {
  const [company, setCompany] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);
  const [rgSearch, setRgSearch] = useState(initRgSearch);
  const [rgResponse, setRgResponse] = useState({});
  const [userList, setUserList] = useState([]);
  const [ulSearch, setUlSearch] = useState(initUlSearch);
  const [ulResponse, setUlResponse] = useState({});

  const changeRoleGroupSearchHandler = (prop, value) => {
    rgSearch[prop] = value;
    setRgSearch({ ...rgSearch });
  };

  const changeUserListSearchHandler = (prop, value) => {
    ulSearch[prop] = value;
    setUlSearch({ ...ulSearch });
  };

  const searchClickHandler = () => {
    const selectedCompany = document.querySelector(".companySelect");
    const searchInput = document.querySelector(".searchInput");

    changeRoleGroupSearchHandler("orgaNo", selectedCompany.value);
    changeRoleGroupSearchHandler("keyword1", searchInput.value);

    getGroupList(rgSearch).then((data) => {
      const { dtoList } = data;
      setRoleGroup([]);
      setRoleGroup(dtoList);
      setRgResponse(data);
      setUserList([]);

      const roleGroupContainer = document.querySelector(".leftSection.section2");
      roleGroupContainer.scrollTop = 0;
    });
  };

  const userSearchClickHandler = () => {
    getUserList(ulSearch).then((data) => {
      const { dtoList } = data;
      setUserList([]);
      setUserList(dtoList);
      setUlResponse(data);

      const userListContainer = document.querySelector(".innerContentContainer");
      userListContainer.scrollTop = 0;
    });
  };

  const roleGroupClickHandler = (e, orgaNo, roleGroupNo) => {
    e.stopPropagation();
    let { target } = e;
    // groupContent 하위의 모든 컨텐츠에서 클릭 이벤트가 발생할 경우 groupContent class를 찾을 때 까지 target을 부모 요소로 리턴한다
    while (!target.classList.contains("groupContent")) {
      target = target.parentElement;
    }

    const groupContentList = document.querySelectorAll(".groupContent");
    groupContentList.forEach((groupContent) => groupContent.classList.remove("active"));
    target.classList.add("active");

    changeUserListSearchHandler("orgaNo", orgaNo);
    changeUserListSearchHandler("roleGroupNo", roleGroupNo);

    userSearchClickHandler();
  };

  const userListClickHandler = (e) => {
    let { target } = e;

    while (!target.classList.contains("contentRow")) {
      target = target.parentElement;
    }

    const checkbox = target.querySelector("input[type='checkbox']");

    if (target.classList.contains("active")) {
      target.classList.remove("active");
      checkbox.checked = false;
    } else {
      target.classList.add("active");
      checkbox.checked = true;
    }
  };

  const orgaBtnClickHandler = () => {
    // TODO : 공통 조직도 팝업에서 선택한 조직(회사/부서/사원)의 orgaNo를 전달받아 권한그룹을 부여하는 기능 구현해야됨
    if (ulSearch.orgaNo === 0 || ulSearch.roleGroupNo === 0) {
      alert("권한그룹이 선택되지 않았습니다.");
      return;
    }

    const inputData = {};
    const orgaNoList = [31, 40]; // emp05 하세진 정보 고정으로 테스트
    inputData.orgaNo = ulSearch.orgaNo;
    inputData.roleGroupNo = ulSearch.roleGroupNo;
    inputData.orgaNoList = orgaNoList;

    insertOrgaRole(inputData).then(() => {
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
      orgaNo: ulSearch.orgaNo,
      roleGroupNo: ulSearch.roleGroupNo,
      removeOrgaRoleList: arr,
    };

    removeOrgaRole(removeData).then(() => {
      // TODO : sweetalert 작업해야됨
      userSearchClickHandler();
    });
  };

  const roleGroupSizeSelectChangeHandler = (e) => {
    changeRoleGroupSearchHandler("page", 1);
    changeRoleGroupSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    searchClickHandler();
  };

  const roleGroupPageClickHandler = (e) => {
    changeRoleGroupSearchHandler("page", e.target.dataset?.page);
    searchClickHandler();
  };

  const userListSizeSelectChangeHandler = (e) => {
    changeUserListSearchHandler("page", 1);
    changeUserListSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    userSearchClickHandler();
  };

  const userListPageClickHandler = (e) => {
    changeUserListSearchHandler("page", e.target.dataset?.page);
    userSearchClickHandler();
  };

  useEffect(() => {
    // TODO : 로그인한 사용자의 회사의 orga_no를 입력받아서 처리해야함
    getCompanyList(1).then((data) => {
      setCompany(data);
      searchClickHandler();
    });
  }, []);

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
          {/* TODO : 필터 넣을지 말지 차후 처리 */}
          {/* <div className="groupSortWrap">
            <select>
              <option>필터</option>
              <option>필터2</option>
              <option>필터3</option>
            </select>
          </div> */}
        </div>
        <div className="leftSection section2">
          {roleGroup?.map(({
            roleGroupNo, roleGroupName, companyName, orgaNo,
          }) => (
            <RoleGroupContent
              className="groupContent"
              key={roleGroupNo}
              orgaNo={orgaNo}
              companyName={companyName}
              roleGroupNo={roleGroupNo}
              roleGroupName={roleGroupName}
              roleGroupClickHandler={roleGroupClickHandler}
              displayChekcbox="none"
            />
          ))}
        </div>
        <div className="leftSection footer">
          <div className="paginationWrap">
            <ul className="pagination">
              <li className="pageBtn prev first" onClick={roleGroupPageClickHandler} aria-hidden="true" data-page={rgResponse.first}>«</li>
              <li className="pageBtn prev" onClick={roleGroupPageClickHandler} aria-hidden="true" data-page={rgResponse.prev}>‹</li>
              {
                rgResponse.start > 0
                && [...new Array((rgResponse.end - rgResponse.start + 1) < rgResponse.pageLimit
                  ? rgResponse.end - rgResponse.start + 1 : rgResponse.pageLimit)]
                  .map((i, idx) => (rgResponse.start + idx))
                  .map((num) => <li key={num} className={`pageBtn page ${rgResponse.pageRequestDTO?.page === num ? "active" : ""}`} onClick={roleGroupPageClickHandler} aria-hidden="true" data-page={num}>{num}</li>)
              }
              <li className="pageBtn next" onClick={roleGroupPageClickHandler} aria-hidden="true" data-page={rgResponse.next}>›</li>
              <li className="pageBtn next last" onClick={roleGroupPageClickHandler} aria-hidden="true" data-page={rgResponse.last}>»</li>
              <select value={rgResponse.size} className="pageBtn pageSizeSelect" onChange={roleGroupSizeSelectChangeHandler}>
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
            <button type="button" className="btn" onClick={orgaRoleRemove}>&nbsp;권한삭제&nbsp;</button>
            <button type="button" className="btn orgaBtn" onClick={orgaBtnClickHandler}>👨‍👨‍👦</button>
          </div>
        </div>
        <div className="innerInformationWrap">
          <span>௹</span>
          <span>선택한 권한을 사용할 사용자를 선택하세요.</span>
        </div>
        <div className="innerSearchWrap">
          <input type="text" className="innerSearchInput" name="keyword1" onChange={(e) => { changeUserListSearchHandler(e.target.name, e.target.value); }} placeholder="부서 / 직급 / 이름 / ID 를 검색 하세요" />
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
              {userList?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => (
                <UserListContent
                  className="contentRow"
                  key={orgaNo}
                  orgaNo={orgaNo}
                  orgaInfo={orgaInfo}
                  empRank={empRank}
                  empName={empName}
                  username={username}
                  onclickHandler={userListClickHandler}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="innerPaginationWrap">
          <div className="paginationWrap">
            <ul className="pagination">
              <li className="pageBtn prev first" onClick={userListPageClickHandler} aria-hidden="true" data-page={ulResponse.first}>«</li>
              <li className="pageBtn prev" onClick={userListPageClickHandler} aria-hidden="true" data-page={ulResponse.prev}>‹</li>
              {
                ulResponse.start > 0
                && [...new Array((ulResponse.end - ulResponse.start + 1) < ulResponse.pageLimit
                  ? ulResponse.end - ulResponse.start + 1 : ulResponse.pageLimit)]
                  .map((i, idx) => (ulResponse.start + idx))
                  .map((num) => <li key={num} className={`pageBtn page ${ulResponse.pageRequestDTO?.page === num ? "active" : ""}`} onClick={userListPageClickHandler} aria-hidden="true" data-page={num}>{num}</li>)
              }
              <li className="pageBtn next" onClick={userListPageClickHandler} aria-hidden="true" data-page={ulResponse.next}>›</li>
              <li className="pageBtn next last" onClick={userListPageClickHandler} aria-hidden="true" data-page={ulResponse.last}>»</li>
              <select value={ulResponse.size} className="pageBtn pageSizeSelect" onChange={userListSizeSelectChangeHandler}>
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
