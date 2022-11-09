import React from "react";
import "./view.css";

function Index(props) {
  return (
    <div className="all">
      <div className="top">
        <span>
          부서관리
          {/*  FIXME : 버튼에 타입 추가해주세요. 아래 예시처럼*/}
          <button type="button">일괄 등록</button>
          <button>추가</button>
        </span>
      </div>


      <div className="bottom">


        <div className="info">
          회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/임시' 유형을 선택하여 등록할 수 있습니다.
        </div>


        <div className="middle">
          <div className="stage">
            <input placeholder="stage" />
            <input placeholder="코드/사업장/부서명을 입력하세요." type="text" />
          </div>
          <div className="detail">
            <span className="detail1">
              <span>
                상세정보
              </span>
              <span>
                <button>저장</button>
                <button>삭제</button>
              </span>
            </span>
          </div>
        </div>


      </div>


    </div>

  );
}

export default Index;
