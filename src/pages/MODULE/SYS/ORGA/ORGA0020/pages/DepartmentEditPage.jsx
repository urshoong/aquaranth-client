import React, { useState } from "react";
import DepartmentTreeComp from "@pages/MODULE/SYS/ORGA/ORGA0020/components/depttree/DepartmentTreeComp";

const DepartmentEditPage = ({
  selectDepartment,
  setSelectDepartment,
  setRefresh,
  companyList,
  selectCompany,
  setSelectCompany,
  inputChangeHandler,
  radioBtnHandler,
  modClickHandler,
  clickAddBtn,
  setViewSelect,
  viewSelect,
  handleOnModal,
  clickDept,
  handleSelectDepartment,
}) => {
  /**
   * 부서 정보 데이터 상태를 관리합니다.
   */
  const [deptInfo, setDeptInfo] = useState({});

  return (
    <div className="all">
      <div className="top">
        <span>
          부서관리
        </span>
      </div>
      <div className="firstTwo">
        <div className="secondOne">
          회사별 조직도(부서)를 등록할 수 있습니다.
        </div>
        <div className="secondTwo">
          <div className="secondTwoContainer1">
            <select
              name="company"
              className="secondTwoSelect"
              onChange={(e) => {
                setSelectCompany(e.target.value);
              }}
            >
              <option>회사선택</option>
              {companyList.map((item) => (
                <option
                  key={item.companyNo}
                  value={item.companyNo}
                >
                  {item.companyName}
                </option>
              ))}
            </select>
            <div>
              <input className="secondTwoInput" placeholder="부서코드/부서명을 입력하세요." type="text" />
              <button type="button">검색</button>
            </div>
          </div>
          <div className="secondTwoContainer2">
            <div className="selectTwoDetail">
              <div className="info">
                상세정보

              </div>
              <div className="infoBtn">
                {/* <button type="button">저장</button> */}
                {/* <button type="button">삭제</button> */}
              </div>
            </div>
            <div className="basicInfo">
              <span className="basicInfo1">
                기본 정보
              </span>
            </div>
          </div>
        </div>
        <div className="secondThree">
          <div className="secondThreeContainer1">
            <div className="tree">
              <DepartmentTreeComp
                companyNo={selectCompany}
                clickDept={clickDept}
                setDeptInfo={setDeptInfo}
                selectDepartment={selectDepartment}
                setSelectDepartment={setSelectDepartment}
              />
            </div>
          </div>
          <div className="secondThreeContainer2">
            <div className="deptData">
              <div className="deptDataLeft">
                <div className="leftItem">부서번호</div>
                <div className="leftItem">부서명</div>
                <div className="leftItem">부서 약칭</div>
                <div className="leftItem">사용 여부</div>
                <div className="leftItem">등록자명</div>
              </div>
              <div className="deptDataRight">
                <div className="rightItem">
                  <input
                    type="text"
                    value={selectDepartment.deptNo}
                    name="deptNo"
                    onChange={(e) => inputChangeHandler(e)}
                    readOnly
                  />
                </div>
                <div className="rightItem">
                  <input
                    type="text"
                    value={selectDepartment.deptName}
                    name="deptName"
                    onChange={(e) => inputChangeHandler(e)}
                  />
                </div>
                <div className="rightItem">
                  <input
                    type="text"
                    value={selectDepartment.deptDesc}
                    name="deptDesc"
                    onChange={(e) => inputChangeHandler(e)}
                  />
                </div>
                <div className="rightItem"> {selectDepartment.mainflag}
                  <input
                    type="radio"
                    name="use"
                    value="true"
                    // checked={value === true}
                    onChange={radioBtnHandler}
                  />사용
                  <input
                    type="radio"
                    name="use"
                    value="false"
                    // checked={value === false}
                    onChange={radioBtnHandler}
                  />미사용
                </div>
                <div className="rightItem">
                  <input
                    type="text"
                    name="regUser"
                    value={selectDepartment.regUser}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="button" onClick={modClickHandler}>수정</button>
              <button type="button" onClick={handleOnModal}>추가</button>
              {/* <div className="btnWrapper"> */}
              {/*   <button type="button" onClick={() => { setViewSelect(false); }}>추가</button> */}
              {/*   <button type="button" onClick={() => { setViewSelect(true); }}>돌아오기</button> */}
              {/*   <div className="componentWrapper"> */}
              {/*     { viewSelect ? <DepartmentComp /> : <DepartmentRegisterComp /> } */}
              {/*   </div> */}
              {/* </div> */}
            </div>
            {/* 컴포넌트 갈아끼우기? */}
            {/* <div> */}
            {/*   <div className="btnWrapper"> */}
            {/*     <button type="button" onClick={() => { setViewSelect(false); }}>추가</button> */}
            {/*     <button type="button" onClick={() => { setViewSelect(true); }}>돌아오기</button> */}
            {/*   </div> */}
            {/*   <div className="componentWrapper"> */}
            {/*     { viewSelect ? <DepartmentRegisterComp /> : <DepartmentComp /> } */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEditPage;
