import React, { useContext } from "react";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import {CenterGrid, Divider} from "@components/Grid";

const Unselected = () => {
  return (
    <CenterGrid>
      <Divider span="12">
        메뉴를 선택하세요
      </Divider>
    </CenterGrid>
  );
};

export default Unselected;
