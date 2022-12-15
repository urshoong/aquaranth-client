import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  RoleGroupModalBody,
  RoleGroupModalBtn,
  RoleGroupModalContent,
  RoleGroupModalFooter,
  RoleGroupModalHeader,
  RoleGroupModalInput,
  RoleGroupModalRadio,
  RoleGroupModalSelect,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import useModal from "../../../../../../../hooks/useModal";
import request from "../../../../../../../utils/axiosUtil";
import { changeRefresh } from "../../../../../../../store/reducer/roleGroupSlice";


const initDTO = {
  companyNo: 0,
  roleGroupNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

function Role0010ModModal({ roleGroup, companyList }) {
  const dispatch = useDispatch();
  const [updateDTO, setUpdateDTO] = useState({ ...initDTO });
  const { closeModal } = useModal();
  const { roleGroupName, roleGroupNo, roleGroupUse, companyNo } = updateDTO;

  useEffect(() => {
    setUpdateDTO({ ...roleGroup });
  }, [roleGroup]);

  const handleCloseModal = () => {
    closeModal();
  };

  const roleGroupChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "roleGroupName" || name === "companyNo") {
      updateDTO[name] = value;
    }
    if (name === "roleGroupUse") {
      updateDTO[name] = !roleGroupUse;
    }
    setUpdateDTO({ ...updateDTO });
  };

  const onClickDelBtn = () => {
    request.delete(`/role-group/${roleGroupNo}`)
      .then((r) => {
        Swal.fire("권한그룹 삭제가 완료되었습니다.", "", "success").then();
        dispatch(changeRefresh());
        setUpdateDTO({ ...initDTO });
        closeModal();
      });
  };

  const onClickModBtn = () => {
    request.put("/role-group", updateDTO)
      .then((r) => {
        Swal.fire("권한그룹 수정이 완료되었습니다.", "", "success").then();
        setUpdateDTO({ ...initDTO });
        closeModal();
        dispatch(changeRefresh());
      });
  };

  const onChangeSelectBoxEvent = (selectedCompanyNo) => {
    updateDTO.companyNo = selectedCompanyNo;
    setUpdateDTO({ ...updateDTO });
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="권한 그룹 수정"
    >
      <RoleGroupModalContent>
        <RoleGroupModalHeader>
          회사명 :
        </RoleGroupModalHeader>
        <RoleGroupModalBody>
          <RoleGroupModalSelect onChange={(e) => onChangeSelectBoxEvent(e.target.value)} value={companyNo}>
            {companyList.map((company) => <option key={company.companyNo} value={company.companyNo}>{company.companyName}</option>)}
          </RoleGroupModalSelect>
        </RoleGroupModalBody>
        <RoleGroupModalHeader>
          권한그룹명 :
        </RoleGroupModalHeader>
        <RoleGroupModalBody>
          <RoleGroupModalInput name="roleGroupName" value={roleGroupName} type="text" onChange={(e) => roleGroupChangeEvent(e)} />
        </RoleGroupModalBody>
        <RoleGroupModalHeader>
          사용여부 :
        </RoleGroupModalHeader>
        <RoleGroupModalBody>
          <RoleGroupModalRadio name="roleGroupUse" checked={roleGroupUse} type="radio" onChange={(e) => roleGroupChangeEvent(e)} />사용
          <RoleGroupModalRadio name="roleGroupUse" checked={!roleGroupUse} type="radio" onChange={(e) => roleGroupChangeEvent(e)} />미사용
        </RoleGroupModalBody>
      </RoleGroupModalContent>
      <RoleGroupModalFooter>
        <RoleGroupModalBtn onClick={onClickModBtn}>수정</RoleGroupModalBtn>
        <RoleGroupModalBtn onClick={onClickDelBtn}>삭제</RoleGroupModalBtn>
        <RoleGroupModalBtn onClick={handleCloseModal}>취소</RoleGroupModalBtn>
      </RoleGroupModalFooter>
    </Modal>
  );
}

export default Role0010ModModal;
