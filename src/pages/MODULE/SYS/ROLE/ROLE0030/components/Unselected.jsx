import React, { useContext } from "react";
import { CenterGrid, Divider } from "@components/Grid";

const Unselected = ({ handleOnMenuInsertModal }) => {
  return (
    <CenterGrid>
      <Divider span="12">
        메뉴를 선택하세요
      </Divider>
      <Divider span="12">
        <button type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</button>
      </Divider>
    </CenterGrid>
  );
};

export default Unselected;
