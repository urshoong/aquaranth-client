import React, { useEffect, useState } from "react";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent";
import useModal from "@hooks/useModal";
import Swal from "sweetalert2";

import {
  getCompanyList,
  getGroupListByRole,
  getUserListByRole,
  insertOrgaRole,
  removeOrgaRole,
} from "./api/UserRole";

// 권한그룹기준 - 권한그룹 조회 조건
const initRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
};

// 권한그룹기준 - 조직 조회 조건
const initUlSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  roleGroupNo: 0,
  keyword1: "",
};

// 권한그룹기준 - 회사 부서 사용자 선택 팝업 기본 정보 조건
const initUserRoleModal = {
  menucode: "ROLE0020",
  menuname: "회사 부서 사용자 선택",
  companyNo: 0,
  changeOrgaList: null,
};

const UserRoleRoleGroupBasedPage = () => {
  const [company, setCompany] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);
  const [rgSearch, setRgSearch] = useState(initRgSearch);
  const [rgResponse, setRgResponse] = useState({});
  const [userList, setUserList] = useState([]);
  const [ulSearch, setUlSearch] = useState(initUlSearch);
  const [ulResponse, setUlResponse] = useState({});
  const [orgaList, setOrgaList] = useState([]);
  const [userRoleModal, setUserRoleModal] = useState(initUserRoleModal);

  const { openModal } = useModal();

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

    console.log("권한그룹기준 -권한그룹 목록 조회 조건", rgSearch);

    if (rgSearch.orgaNo === 0) {
      Swal.fire({ title: "회사를 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    getGroupListByRole(rgSearch).then((data) => {
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
    console.log("권한그룹기준 -조직 목록 조회 조건", ulSearch);

    getUserListByRole(ulSearch).then((data) => {
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
    setUserRoleModal({ ...userRoleModal, companyNo: orgaNo, orgaNo, roleGroupNo });

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

  // 회사 부서 사원 선택 팝업 버튼 클릭 핸들러
  const orgaBtnClickHandler = () => {
    if (ulSearch.orgaNo === 0 || ulSearch.roleGroupNo === 0) {
      Swal.fire({ title: "권한그룹을 선택해주세요", icon: "error" }).then((r) => r);
      return;
    }

    openModal({ type: "ROLE0020", props: userRoleModal });

    userSearchClickHandler();
  };

  const changeOrgaList = (arr) => {
    setOrgaList(arr);

    const inputData = {};
    inputData.orgaNo = ulSearch.orgaNo;
    inputData.roleGroupNo = ulSearch.roleGroupNo;
    inputData.orgaNoList = arr;

    if (inputData.orgaNoList?.length < 1) return;

    insertOrgaRole(inputData).then(() => {
      userSearchClickHandler();
    });
  };

  const orgaRoleRemove = () => {
    if (ulSearch.orgaNo === 0 || ulSearch.roleGroupNo === 0) {
      Swal.fire({ title: "권한그룹을 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    const elements = document.querySelectorAll(".contentContainer .contentRow:not(.header)");
    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return element.dataset?.orgaNo;
    });

    if (arr.length === 0) {
      Swal.fire({ title: "선택된 조직정보가 없습니다.", icon: "error" }).then((r) => r);
      return;
    }

    const removeData = {
      orgaNo: ulSearch.orgaNo,
      roleGroupNo: ulSearch.roleGroupNo,
      removeOrgaRoleList: arr,
    };

    removeOrgaRole(removeData).then(() => {
      Swal.fire({ title: "권한그룹이 삭제되었습니다.", icon: "success" }).then((r) => r);
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

  const companySelectChangeHandler = (e) => {
    searchClickHandler();
  };

  useEffect(() => {
    setUserRoleModal({ ...userRoleModal, changeOrgaList });
    getCompanyList().then((data) => {
      setCompany(data);
      searchClickHandler();
    });
  }, []);

  return (
    <>
      <div className="section roleGroup left">
        <div className="leftSection header">
          <div className="selectWrap">
            <select className="companySelect" onChange={companySelectChangeHandler}>
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
