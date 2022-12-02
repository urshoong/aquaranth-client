import React, { useEffect, useRef, useState } from "react";
import UserListContent2 from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserContent2";
import Swal from "sweetalert2";
import {
  getCompanyList,
  getGroupListByUser,
  getUserListByUser,
  removeUserRole,
} from "./api/UserRole";
import PaginationContent from "./components/PaginationContent";
import RoleGroupListContent from "./components/RoleGroupListContent";

const initUlSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
  keyword1: "",
  keyword2: "",
};

const initRgSearch = {
  page: 1,
  size: 10,
  orgaNo: 0,
};


const UserRoleUserBasedPage = () => {
  const [userCompany, setUserCompany] = useState([]);
  const [userUserList, setUserUserList] = useState([]);
  const [userUlSearch, setUserUlSearch] = useState(initUlSearch);
  const [userUlResponse, setUserUlResponse] = useState({});
  const [userRoleGroup, setUserRoleGroup] = useState([]);
  const [userRgSearch, setUserRgSearch] = useState(initRgSearch);
  const [userRgResponse, setUserRgResponse] = useState({});

  const refCompanySelect = useRef();
  const refUserKeyword1 = useRef();
  const refUserKeyword2 = useRef();
  const refuserList = useRef();
  const refRoleGroupList = useRef();

  const changeRoleGroupSearchHandler = (prop, value) => {
    userRgSearch[prop] = value;
    setUserRgSearch({ ...userRgSearch });
  };

  const changeUserListSearchHandler = (prop, value) => {
    userUlSearch[prop] = value;
    setUserUlSearch({ ...userUlSearch });
  };

  const userSearchClickHandler = () => {
    const orgaNo = refCompanySelect.current;
    const keyword1 = refUserKeyword1.current;
    const keyword2 = refUserKeyword2.current;

    changeUserListSearchHandler("orgaNo", orgaNo.value);
    changeUserListSearchHandler("keyword1", keyword1.value);
    changeUserListSearchHandler("keyword2", keyword2.value);

    if (orgaNo.value === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "회사가 선택되지 않았습니다.", icon: "error" }).then((r) => r);
      return;
    }

    console.log("사용자기준 - 사용자 목록 조회 조건", userUlSearch);

    getUserListByUser(userUlSearch).then((data) => {
      const { dtoList } = data;
      setUserUserList([]);
      setUserUlResponse(data);
      setUserUserList(dtoList); // 페이징 적용하여 RoleGroupList 받아오는 방식

      setUserUlSearch({ ...userUlSearch });
    });

    const userListContainer = refuserList.current;
    userListContainer.scrollTop = 0;
  };

  const roleSearchClickHandler = () => {
    if (userRgSearch.orgaNo === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "사용자가 선택되지 않았습니다.", icon: "error" }).then((r) => r);
      return;
    }

    console.log("사용자기준 - 권한그룹 목록 조회 조건", userRgSearch);

    getGroupListByUser(userRgSearch).then((data) => {
      const { dtoList } = data;
      setUserRoleGroup([]);
      setUserRoleGroup(dtoList);
      setUserRgResponse(data);
    });
  };

  const userListClickHandler = (e) => {
    e.stopPropagation();
    let { target } = e;

    while (!target.classList.contains("contentRow2")) {
      target = target.parentElement;
    }

    document.querySelector(".contentRow.contentRow2.active")?.classList.remove("active");
    target.classList.add("active");

    changeRoleGroupSearchHandler("orgaNo", target.dataset?.orgaNo);

    roleSearchClickHandler();
  };

  const roleGroupClickHandler = (e) => {
    e.stopPropagation();
    let { target } = e;
    // groupContent 하위의 모든 컨텐츠에서 클릭 이벤트가 발생할 경우 groupContent class를 찾을 때 까지 target을 부모 요소로 리턴한다
    while (!target.classList.contains("groupContent")) {
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

  const orgaRoleRemove = () => {
    const elements = document.querySelectorAll(".groupContent.active");

    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return {
        orgaNo: element.dataset?.orgaNo,
        roleGroupNo: element.dataset?.roleGroupNo,
        targetOrgaNo: userRgSearch.orgaNo,
      };
    });

    if (!arr || arr.length === 0) {
      Swal.fire({ title: "필수 정보 누락", html: "선택된 권한그룹이 없습니다.", icon: "error" }).then((r) => r);
      return;
    }

    removeUserRole(arr).then((data) => {
      const { state, title, message } = data;
      Swal.fire({ title, html: message, icon: state }).then((r) => r);
      roleSearchClickHandler();
    });
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

  const roleGroupSizeSelectChangeHandler = (e) => {
    changeRoleGroupSearchHandler("page", 1);
    changeRoleGroupSearchHandler("size", e.target.value);
    e.target.defaultValue = e.target.value;
    roleSearchClickHandler();
  };

  const roleGroupPageClickHandler = (e) => {
    changeRoleGroupSearchHandler("page", e.target.dataset?.page);
    roleSearchClickHandler();
  };

  const companySelectChangeHandler = () => {
    userSearchClickHandler();
  };

  useEffect(() => {
    getCompanyList().then((data) => {
      setUserCompany(data);
      userSearchClickHandler();
    });
  }, []);

  return (
    <div className="innerWrap">
      <div className="innerInformationWrap">
        <span>௹</span>
        <div>
          <span>선택한 사용자에 권한해제 할 권한그룹을 선택하세요.</span>
          <span>회사/부서 권한이 부여되어 있는 권한그룹은 권한해제가 불가합니다.</span>
        </div>
      </div>
      <div className="innerSearchWrap userList">
        <div className="selectWrap userList">
          <span className="searchLabel">회사</span>
          <select className="companySelect" ref={refCompanySelect} onChange={companySelectChangeHandler}>
            {userCompany?.map(({
              companyNo, companyName, orgaNo,
            }) => <option key={companyNo} value={orgaNo}>{ companyName }</option>)}
          </select>
        </div>
        <div>
          <span className="searchLabel">이름/ID</span>
          <input type="text" className="innerSearchInput keyword1" ref={refUserKeyword1} />
        </div>
        <div>
          <span className="searchLabel">권한명</span>
          <input type="text" className="innerSearchInput keyword2" ref={refUserKeyword2} />
        </div>
        <div className="searchWrap userList">
          <button type="button" className="btn" onClick={orgaRoleRemove}>&nbsp;권한삭제&nbsp;</button>
          <button type="button" className="btn innerSearchBtn" onClick={userSearchClickHandler}>🔍</button>
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
            <div className="innerContentContainer" ref={refuserList}>
              {userUserList?.map(({
                orgaNo,
                companyName,
                deptName,
                empRank,
                empName,
                username,
              }) => (
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
            <PaginationContent
              response={userUlResponse}
              pageClickHandler={userListPageClickHandler}
              selectChangeHandler={userListSizeSelectChangeHandler}
            />
          </div>
        </div>
        <div className="section userList right">
          <RoleGroupListContent
            roleGroupList={userRoleGroup}
            roleGroupClickHandler={roleGroupClickHandler}
            roleGroupResponse={userRgResponse}
            roleGroupPageClickHandler={roleGroupPageClickHandler}
            roleGroupSizeSelectChangeHandler={roleGroupSizeSelectChangeHandler}
            refRoleGroupList={refRoleGroupList}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRoleUserBasedPage;
