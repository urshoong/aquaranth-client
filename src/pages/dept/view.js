import React from 'react';
import "./view.css"

function View(props) {
    return (
        <div className="all">




            <div className="top">
                <span>
                    부서관리
                    <button>일괄 등록</button>
                    <button>추가</button>
                </span>
            </div>









            <div className="bottom">



                <div className="info">
                    회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/임시' 유형을 선택하여 등록할 수 있습니다.
                </div>


                <div className="middle">
                    <div className="stage">
                        {/*stage*/}
                    </div>
                    <div className="detail">
                        {/*조직도*/}
                    </div>
                </div>


            </div>







        </div>

    );
}

export default View;
