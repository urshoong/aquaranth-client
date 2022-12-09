import React, { useContext } from "react";
import { CenterGrid, Divider } from "@components/Grid";
import { InnerWrapper, Wrapper } from "@pages/MODULE/SYS";

const Unselected = ({ handleOnMenuInsertModal }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        메뉴를 선택하세요
        <button type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Unselected;
