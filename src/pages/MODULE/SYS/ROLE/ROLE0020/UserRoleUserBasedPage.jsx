import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import RoleGroupContent from "@pages/MODULE/SYS/ROLE/ROLE0020/components/RoleGroupContent";
import UserListContent2 from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserListContent2";

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

const getCompanyList = async () => {
  const { data } = await request.get("/userrole/companyList");
  return data;
};

const getUserList = async ({ page, size, orgaNo, keyword1, keyword2 }) => {
  const { data } = await request.get(`/userrole/findUserListByOrgaNo?page=${page}&size=${size}&orgaNo=${orgaNo}&keyword1=${keyword1}&keyword2=${keyword2}`);
  return data;
};

const getGroupList = async ({ page, size, orgaNo }) => {
  const { data } = await request.get(`/userrole/findRoleGroupByUser?page=${page}&size=${size}&orgaNo=${orgaNo}`);
  return data;
};

const removeUserRole = async (removeData) => {
  const { data } = await request.post("/userrole/removeOrgaRoleByAllRole", removeData);
  return data;
};

const UserRoleUserBasedPage = () => {
  const [company, setCompany] = useState([]);
  const [userList, setUserList] = useState([]);
  const [ulSearch, setUlSearch] = useState(initUlSearch);
  const [ulResponse, setUlResponse] = useState({});
  const [roleGroup, setRoleGroup] = useState([]);
  const [rgSearch, setRgSearch] = useState(initRgSearch);
  const [rgResponse, setRgResponse] = useState({});

  const searchClickHandler = () => {
    const orgaNo = document.querySelector(".companySelect");
    const keyword1 = document.querySelector(".keyword1");
    const keyword2 = document.querySelector(".keyword2");

    ulSearch.orgaNo = orgaNo.value;
    ulSearch.keyword1 = keyword1.value;
    ulSearch.keyword2 = keyword2.value;

    setUlSearch({ ...ulSearch });

    getUserList(ulSearch).then((data) => {
      const { dtoList } = data;
      setUserList([]);
      setUlResponse(data);
      setUserList(dtoList); // 페이징 적용하여 RoleGroupList 받아오는 방식

      setUlSearch({ ...ulSearch });
    });

    const userListContainer = document.querySelector(".innerContentContainer");
    userListContainer.scrollTop = 0;
  };

  const userSearchClickHandler = () => {
    getGroupList(rgSearch).then((data) => {
      const { dtoList } = data;
      setRoleGroup([]);
      setRoleGroup(dtoList);
      setRgResponse(data);
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

    rgSearch.orgaNo = target.dataset?.orgaNo;

    setRgSearch({ ...rgSearch });

    userSearchClickHandler();
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

  const orgaRoleRemove = (e) => {
    // TODO : 권한 삭제기능 구현해야됨. > 상위부서에 부여된 권한은 삭제 불가능하게 하고, 경고창 출력
    const elements = document.querySelectorAll(".groupContent.active");

    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return {
        orgaNo: element.dataset?.orgaNo,
        roleGroupNo: element.dataset?.roleGroupNo,
        targetOrgaNo: ulSearch.orgaNo,
      };
    });

    if (!arr || arr.length === 0) {
      alert("선택된 권한그룹이 없습니다.");
      return;
    }

    removeUserRole(arr).then((data) => {
      const { state, message } = data;
      alert(message);
    });
  };

  const userListSizeSelectChangeHandler = (e) => {
    ulSearch.page = 1;
    ulSearch.size = e.target.value;
    e.target.defaultValue = e.target.value;
    setUlSearch({ ...ulSearch });
    searchClickHandler();
  };

  const userListPageClickHandler = (e) => {
    ulSearch.page = e.target.dataset?.page;
    setUlSearch({ ...ulSearch });
    searchClickHandler();
  };

  const roleGroupSizeSelectChangeHandler = (e) => {
    ulSearch.page = 1;
    ulSearch.size = e.target.value;
    e.target.defaultValue = e.target.value;
    setUlSearch({ ...ulSearch });
    userSearchClickHandler();
  };

  const roleGroupPageClickHandler = (e) => {
    ulSearch.page = e.target.dataset?.page;
    setUlSearch({ ...ulSearch });
    userSearchClickHandler();
  };

  useEffect(() => {
    // TODO : 로그인한 사용자의 회사 코드로처리해야함
    getCompanyList().then((data) => {
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
        <div className="selectWrap userList">
          <span className="searchLabel">회사</span>
          <select className="companySelect">
            {company?.map(({
              companyNo, companyName, orgaNo,
            }) => <option key={companyNo} value={orgaNo}>{ companyName }</option>)}
          </select>
        </div>
        <div>
          <span className="searchLabel">이름/ID</span>
          <input type="text" className="innerSearchInput keyword1" />
        </div>
        <div>
          <span className="searchLabel">권한명</span>
          <input type="text" className="innerSearchInput keyword2" />
        </div>
        <div className="searchWrap userList">
          <button type="button" className="btn" onClick={orgaRoleRemove}>&nbsp;권한삭제&nbsp;</button>
          <button type="button" className="btn innerSearchBtn" onClick={searchClickHandler}>🔍</button>
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
                <select value={ulSearch.size} className="pageBtn pageSizeSelect" onChange={userListSizeSelectChangeHandler}>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
                <div className="pageSummary">
                  <span>총</span>
                  <span>{ulResponse?.total}</span>
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
            {/* <div className="groupSortWrap">
              <select>
                <option>필터</option>
                <option>필터2</option>
                <option>필터3</option>
              </select>
            </div> */}
          </div>
          <div className="leftSection userList section2">
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
                displayChekcbox=""
              />
            ))}
          </div>
          <div className="leftSection footer">
            {/* TODO : paging 처리해야됨 */}
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
      </div>
    </div>
  );
};

export default UserRoleUserBasedPage;
