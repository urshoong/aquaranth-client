import React from "react";

function DeptModifyComponent() {
  return (
    <div>
      <div className="all">
        <div className="top">
          <span>
            부서관리
            <button type="button">일괄 등록</button>
            <button>추가</button>
          </span>
        </div>
        <div className="firstTwo">
          <div className="secondOne">
            회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/임시' 유형을 선택하여 등록할 수 있습니다.
          </div>
          <div className="secondTwo">
            <div className="secondTwoContainer1">
              <select name="company" className="secondTwoSelect">
                <option>회사선택</option>
                <option value="회사1">회사1</option>
                <option value="회사1">회사2</option>
                <option value="회사1">회사3</option>
              </select>
              <div>
                <input className="secondTwoInput" placeholder="코드/사업장/부서명을 입력하세요." type="text" />
                <button>㉾</button>
              </div>
            </div>
            <div className="secondTwoContainer2">
              <div className="selectTwoDetail">
                <div className="info">
                  상세정보
                </div>
                <div className="infoBtn">
                  <button>저장</button>
                  <button>삭제</button>
                </div>
              </div>
              <div className="basicInfo">
                <span className="basicInfo1">
                  기본 정보
                </span>
                <span>
                  | 부서 정보
                </span>
              </div>
            </div>
          </div>
          <div className="secondThree">
            <div className="secondThreeContainer1">
              <div className="tree">
                <p>조직도</p>
              </div>
            </div>
            <div className="secondThreeContainer2">
              <div className="deptData">
                <div className="deptDataLeft">
                  <div className="leftItem">회사</div>
                  <div className="leftItem">상위부서번호</div>
                  <div className="leftItem">부서코드</div>
                  <div className="leftItem">부서명</div>
                  <div className="leftItem">부서약칭</div>
                  <div className="leftItem">부서주소</div>
                  <div className="leftItem">사용여부</div>
                  <div className="leftItem">삭제여부</div>
                  <div className="leftItem">등록일</div>
                  <div className="leftItem">수정일</div>
                </div>
                <div className="deptDataRight">
                  <div className="rightItem">
                    <input type="text" />
                  </div>
                  <div className="rightItem">
                    <input type="text" />
                  </div>
                  <div className="rightItem">
                    <input type="text" />
                  </div>
                  <div className="rightItem">
                    <input type="text" />
                  </div>
                  <div className="rightItem">
                    <input type="text" />
                  </div>
                  <div className="rightItem">
                    <input type="email" />
                  </div>
                  <div className="rightItem">
                    <input type="checkbox" />
                  </div>
                  <div className="rightItem">
                    <input type="checkbox" />
                  </div>
                  <div className="rightItem">
                    <input type="date" />
                  </div>
                  <div className="rightItem">
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeptModifyComponent;
