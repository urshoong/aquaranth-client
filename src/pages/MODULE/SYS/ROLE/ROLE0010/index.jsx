import React, { useEffect, useState } from "react";
import RoleGroupContainer from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupContainer";
import { useSelector } from "react-redux";
import { ContentDiv } from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import {
  ModuleInnerMainContentWrapper,
  ModuleInnerTitle,
  ModuleInnerTitleWrapper,
  ModuleInnerWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import request from "../../../../../utils/axiosUtil";
import MenuRoleContainer from "./components/MenuRoleContainer";


const Index = () => {
  const [companyList, setCompanyList] = useState([]);
  const [selectedRoleGroup, setSelectedRoleGroup] = useState({});
  const { refresh } = useSelector((state) => state.roleGroup);

  // 최초 랜더시 모든 회사목록 가져오기(사용여부 true인 회사만)
  useEffect(() => {
    request.get("/role-group/companyListAll")
      .then(({ data }) => setCompanyList(data));
  }, []);

  // 권한그룹 아이템 클릭이벤트
  const onClickRoleGroupItem = (roleGroup) => {
    setSelectedRoleGroup(roleGroup);
  };

  return (
    <ModuleInnerWrapper>
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>권한그룹설정</ModuleInnerTitle>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <ContentDiv>
          <RoleGroupContainer
            onClickRoleGroupItem={onClickRoleGroupItem}
            refresh={refresh}
            companyList={companyList}
            selectedRoleGroup={selectedRoleGroup}
          />
          <MenuRoleContainer
            selectedRoleGroup={selectedRoleGroup}
            setSelectedRoleGroup={setSelectedRoleGroup}
          />
        </ContentDiv>
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>
  );
};

export default Index;
