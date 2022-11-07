import React from "react";
import styled from "styled-components";

const Index = () => (
  <Wrapper>
    <div className="">
      메뉴사용설정
    </div>
    <div className="">
      <div className="">
        <div className="">메뉴 상세</div>
        <div className="">
          <div className="">상위메뉴
            <input type="text" />
          </div>
          <div className="">메뉴명
            <input type="text" />
          </div>
          <div className="">사용여부
            <input type="text" />
          </div>
          <div className="">정렬
            <input type="text" />
          </div>
          <div className="">아이콘 추가하기
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  color: blue;
`;

export default Index;
