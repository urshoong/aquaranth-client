import React, { useEffect, useRef, useState } from "react";
import UserListContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserContent";
import useModal from "@hooks/useModal";
import Swal from "sweetalert2";
import {
  getCompanyList,
  getGroupListByRole,
  getUserListByRole,
  insertOrgaRole,
  removeOrgaRole,
} from "./api/UserRole";
import PaginationContent from "./components/PaginationContent";
import RoleGroupListContent from "./components/RoleGroupListContent";

// 권한그룹기준 - 권한그룹 조회 조건
const initRoleRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
};

// 권한그룹기준 - 조직 조회 조건
const initRoleUlSearch = {
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
  const [roleCompany, setRoleCompany] = useState([]);
  const [roleRoleGroup, setRoleRoleGroup] = useState([]);
  const [roleRgSearch, setRoleRgSearch] = useState(initRoleRgSearch);
  const [roleRgResponse, setRoleRgResponse] = useState({});
  const [roleUserList, setRoleUserList] = useState([]);
  const [roleUlSearch, setRoleUlSearch] = useState(initRoleUlSearch);
  const [roleUlResponse, setRoleUlResponse] = useState({});
  const [userRoleModal, setUserRoleModal] = useState(initUserRoleModal);

  const refCompanySelect = useRef();
  const refSearchInput = useRef();
  const refRoleGroupList = useRef();
  const refUserList = useRef();

  const { openModal } = useModal();

  const changeRoleGroupSearchHandler = (prop, value) => {
    roleRgSearch[prop] = value;
    setRoleRgSearch({ ...roleRgSearch });
  };

  const changeUserListSearchHandler = (prop, value) => {
    roleUlSearch[prop] = value;
    setRoleUlSearch({ ...roleUlSearch });
  };

  const searchClickHandler = () => {
    const selectedCompany = refCompanySelect.current?.value;
    const searchInput = refSearchInput.current?.value;

    changeRoleGroupSearchHandler("orgaNo", selectedCompany);
    changeRoleGroupSearchHandler("keyword1", searchInput);

    console.log("권한그룹기준 - 권한그룹 목록 조회 조건", roleRgSearch);

    if (roleRgSearch.orgaNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택하세요.", icon: "error" }).then((r) => r);
      return;
    }

    getGroupListByRole(roleRgSearch).then((data) => {
      const { dtoList } = data;
      setRoleRoleGroup([]);
      setRoleRoleGroup(dtoList);
      setRoleRgResponse(data);
      setRoleUserList([]);

      const roleGroupContainer = refRoleGroupList.current;
      roleGroupContainer.scrollTop = 0;
    });
  };

  const userSearchClickHandler = () => {
    console.log("권한그룹기준 - 조직 목록 조회 조건", roleUlSearch);

    getUserListByRole(roleUlSearch).then((data) => {
      const { dtoList } = data;
      setRoleUserList([]);
      setRoleUserList(dtoList);
      setRoleUlResponse(data);

      const userListContainer = refUserList.current;
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
    if (roleUlSearch.orgaNo === 0 || roleUlSearch.roleGroupNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    if (userRoleModal.companyNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "회사를 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    openModal({ type: "ROLE0020", props: userRoleModal });

    userSearchClickHandler();
  };

  const changeOrgaList = (arr) => {
    const inputData = {};
    inputData.orgaNo = roleUlSearch.orgaNo;
    inputData.roleGroupNo = roleUlSearch.roleGroupNo;
    inputData.orgaNoList = arr;

    if (inputData.orgaNoList?.length < 1) return;

    insertOrgaRole(inputData).then(() => {
      userSearchClickHandler();
    });
  };

  const orgaRoleRemove = () => {
    if (roleUlSearch.orgaNo === 0 || roleUlSearch.roleGroupNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "권한그룹을 선택해주세요.", icon: "error" }).then((r) => r);
      return;
    }

    const elements = document.querySelectorAll(".contentContainer .contentRow:not(.header)");
    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return element.dataset?.orgaNo;
    });

    if (arr.length === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "선택된 조직정보가 없습니다.", icon: "error" }).then((r) => r);
      return;
    }

    const removeData = {
      orgaNo: roleUlSearch.orgaNo,
      roleGroupNo: roleUlSearch.roleGroupNo,
      removeOrgaRoleList: arr,
    };

    removeOrgaRole(removeData).then(() => {
      Swal.fire({ title: "권한그룹 삭제 완료", html: "권한그룹이 삭제되었습니다.", icon: "success" }).then((r) => r);
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
    let { target } = e;
    if (!target.classList?.contains("pageBtn")) target = target.parentElement;
    changeRoleGroupSearchHandler("page", target.dataset?.page);
    searchClickHandler();
  };

  const userListSizeSelectChangeHandler = (e) => {
    changeUserListSearchHandler("page", 1);
    changeUserListSearchHandler("size", e.target?.value);
    e.target.defaultValue = e.target.value;
    userSearchClickHandler();
  };

  const userListPageClickHandler = (e) => {
    let { target } = e;
    if (!target.classList?.contains("pageBtn")) target = target.parentElement;
    changeUserListSearchHandler("page", target.dataset?.page);
    userSearchClickHandler();
  };

  const companySelectChangeHandler = (e) => {
    setUserRoleModal({ ...userRoleModal, companyNo: e.target?.value });
    searchClickHandler();
  };

  useEffect(() => {
    setUserRoleModal({ ...userRoleModal, changeOrgaList });
    getCompanyList().then((data) => {
      setRoleCompany(data);
      searchClickHandler();
    });
  }, []);

  return (
    <>
      <div className="section roleGroup left">
        <RoleGroupListContent
          /* header props */
          company={roleCompany}
          searchClickHandler={searchClickHandler}
          companySelectChangeHandler={companySelectChangeHandler}
          refCompanySelect={refCompanySelect}
          refSearchInput={refSearchInput}
          /* list & pagination props */
          roleGroupList={roleRoleGroup}
          roleGroupClickHandler={roleGroupClickHandler}
          roleGroupResponse={roleRgResponse}
          roleGroupPageClickHandler={roleGroupPageClickHandler}
          roleGroupSizeSelectChangeHandler={roleGroupSizeSelectChangeHandler}
          refRoleGroupList={refRoleGroupList}
          displayChekcbox="none"
        />
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
            <div className="innerContentContainer" ref={refUserList}>
              {roleUserList?.map(({ orgaNo, orgaInfo, empRank, empName, username }) => (
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
          <PaginationContent
            response={roleUlResponse}
            pageClickHandler={userListPageClickHandler}
            selectChangeHandler={userListSizeSelectChangeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default UserRoleRoleGroupBasedPage;
