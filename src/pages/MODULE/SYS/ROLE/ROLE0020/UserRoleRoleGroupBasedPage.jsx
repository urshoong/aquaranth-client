import React, { useEffect, useState } from "react";
import RoleGroupContent from "@components/userRole/RoleGroupContent";
import request from "@utils/axiosUtil";

const getCompanyList = async (companyNo) => {
  const { data } = await request.get(`/userrole/companyList/${companyNo}`);
  return data;
};

const getGroupList = async (companyName, roleGroupSearch) => {
  const { data } = await request.get(`/userrole/roleGroupList?companyName=${companyName}&roleGroupSearch=${roleGroupSearch}`);
  return data;
};

const UserRoleRoleGroupBasedPage = (props) => {
  const [company, setCompany] = useState([]);
  const [roleGroup, setRoleGroup] = useState([]);

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
      setRoleGroup([]);
      setRoleGroup(data);
    });
  };

  const roleGroupClickHandler = (e) => {
    const target = e.target.tagName === "DIV" ? e.target : e.target.parentElement;
    const groupContentList = document.querySelectorAll(".groupContent");
    groupContentList.forEach((groupContent) => groupContent.classList.remove("active"));
    target.classList.add("active");
  };

  return (
    <>
      <div className="section roleGroup left">
        <div className="leftSection header">
          <div className="selectWrap">
            <select className="companySelect">
              {company?.map(({
                companyNo, companyName,
              }) => <option key={companyNo} value={companyName}>{ companyName }</option>)}
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
            roleGroupNo, roleGroupName, companyName,
          }) => (
            <RoleGroupContent
              className="groupContent"
              key={roleGroupNo}
              companyName={companyName}
              roleGroupName={roleGroupName}
              roleGroupClickHandler={roleGroupClickHandler}
            />
          ))}
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
          <input type="text" className="innerSearchInput" placeholder="부서 / 직급 / 직책 / 이름 / ID 를 검색 하세요" />
          <button type="button" className="btn innerSearchBtn">🔍</button>
        </div>
        <div className="innerContent">
          <div className="contentContainer">
            <div className="contentRow header">
              <div><input type="checkbox" /></div>
              <div><span>조직정보</span></div>
              <div><span>직급</span></div>
              <div><span>이름(ID)</span></div>
            </div>
            <div className="contentRow">
              <div><input type="checkbox" /></div>
              <div><span>DOUZONE&gt;인사팀</span></div>
              <div><span>사원</span></div>
              <div><span>정수연(user01)</span></div>
            </div>
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
