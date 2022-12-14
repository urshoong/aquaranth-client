import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import {
  DeptMemberInformationContent,
  DeptMemberInformationContentDiv, DeptMemberInformationContentWrapper,
  DeptMemberInformationDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const getDeptMember = async (orgaNo) => {
  const { data } = await request(`/dept2/member/${orgaNo}`);
  return data;
};

function DeptMemberInfo({ deptOrgaNo }) {
  /**
   * 부서원 리스트의 상태를 관리합니다.
   */
  const [memList, setMemList] = useState([]);

  /**
   * 부서원 정보를 가져옵니다.
   */
  useEffect(() => {
    getDeptMember(deptOrgaNo).then((list) => {
      setMemList(list);
    });
  }, [deptOrgaNo]);

  return (
    <DeptMemberInformationDiv>
      <DeptMemberInformationContentDiv className="header">
        <DeptMemberInformationContent>부서</DeptMemberInformationContent>
        <DeptMemberInformationContent>직급</DeptMemberInformationContent>
        <DeptMemberInformationContent>사용자명</DeptMemberInformationContent>
        <DeptMemberInformationContent>아이디</DeptMemberInformationContent>
        <DeptMemberInformationContent>전화번호</DeptMemberInformationContent>
      </DeptMemberInformationContentDiv>
      <DeptMemberInformationContentWrapper>
        {memList.map(({ orgaNo, deptName, empRank, empName, username, empPhone }) => (
          <DeptMemberInformationContentDiv key={orgaNo}>
            <DeptMemberInformationContent>{deptName}</DeptMemberInformationContent>
            <DeptMemberInformationContent>{empRank}</DeptMemberInformationContent>
            <DeptMemberInformationContent>{empName}</DeptMemberInformationContent>
            <DeptMemberInformationContent>{username}</DeptMemberInformationContent>
            <DeptMemberInformationContent>{empPhone}</DeptMemberInformationContent>
          </DeptMemberInformationContentDiv>
        ))}
      </DeptMemberInformationContentWrapper>
    </DeptMemberInformationDiv>
  );
}

export default DeptMemberInfo;
