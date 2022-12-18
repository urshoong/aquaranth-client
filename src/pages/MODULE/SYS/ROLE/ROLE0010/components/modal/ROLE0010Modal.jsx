import React, { useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  RoleGroupModalBody,
  RoleGroupModalBtn,
  RoleGroupModalContent,
  RoleGroupModalFooter,
  RoleGroupModalHeader,
  RoleGroupModalInput,
  RoleGroupModalSelect,
} from "@pages/MODULE/SYS/ROLE/ROLE0010/uicontainer/rolegroup";
import { changeRefresh } from "../../../../../../../store/reducer/roleGroupSlice";

const initDTO = {
  companyNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

const ROLE0010Modal = ({ companyList }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [insertDTO, setInsertDTO] = useState({ ...initDTO });
  const { companyNo } = insertDTO;

  const handleCloseModal = () => {
    closeModal();
  };

  const onClickSaveBtn = async () => {
    if (insertDTO.companyNo === "" || insertDTO.roleGroupName === "") {
      // alert("입력되지 않은 값이 있습니다.");
      await Swal.fire({
        title: "입력되지 않은 값이 있습니다.",
        icon: "error",
      });
      return;
    }

    await request.post("/role-group", insertDTO)
      .then(({ data }) => {
        Swal.fire("권한그룹 추가가 완료되었습니다.", "", "success").then();
        console.log("추가된 권한그룹", data);
        dispatch(changeRefresh());
        setInsertDTO({ ...initDTO });
        closeModal();
      });
  };

  const roleGroupChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "roleGroupName" || name === "companyNo") {
      insertDTO[name] = value;
    }
    setInsertDTO({ ...insertDTO });
  };

  const onChangeSelectBoxEvent = (selectedCompanyNo) => {
    insertDTO.companyNo = selectedCompanyNo;
    setInsertDTO({ ...insertDTO });
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="권한 그룹 추가"
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
          <RoleGroupModalInput name="roleGroupName" type="text" onChange={(e) => roleGroupChangeEvent(e)} />
        </RoleGroupModalBody>
      </RoleGroupModalContent>
      <RoleGroupModalFooter>
        <RoleGroupModalBtn onClick={onClickSaveBtn}>저장</RoleGroupModalBtn>
        <RoleGroupModalBtn onClick={handleCloseModal}>취소</RoleGroupModalBtn>
      </RoleGroupModalFooter>
    </Modal>
  );
};

export default ROLE0010Modal;
