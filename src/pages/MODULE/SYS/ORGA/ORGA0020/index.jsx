import React from "react";
import DeptMain from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptMain";
import useModal from "@hooks/useModal";
import {
  EmpInformationBtn,
  ModuleInnerMainContentWrapper,
  ModuleInnerTitle,
  ModuleInnerTitleBtnDiv,
  ModuleInnerTitleWrapper,
  ModuleInnerWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function Index() {
  const data = { menucode: "ORGA0020", menuname: "부서 관리" };
  const { openModal } = useModal();

  const handleOnModal = () => {
    openModal({ type: "ORGA0020", props: data });
  };


  return (
    <ModuleInnerWrapper>
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>부서관리</ModuleInnerTitle>
        <ModuleInnerTitleBtnDiv>
          <EmpInformationBtn type="button" onClick={handleOnModal}>추가</EmpInformationBtn>
        </ModuleInnerTitleBtnDiv>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <DeptMain />
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>
  );
}

export default Index;
