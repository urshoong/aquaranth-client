import React, {useEffect, useState} from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import request from "@utils/axiosUtil";
import { useDispatch } from "react-redux";
import { changeRefresh } from "../../../../../../../store/reducer/roleGroupSlice";
import insert from "../../../../ORGA/ORGA0030/pages/Insert";

const initDTO = {
  companyNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

const ROLE0010Modal = (props) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [insertDTO, setInsertDTO] = useState({ ...initDTO });
  const [companyList, setCompanyList] = useState([]);
  const { companyNo } = insertDTO;

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    request.get("/company/list")
      .then(({ data }) => setCompanyList(data));
  }, []);

  const onClickSaveBtn = async () => {
    if (insertDTO.companyNo === "" || insertDTO.roleGroupName === "") {
      alert("입력되지 않은 값이 있습니다.");
      return;
    }

    await request.post("/role-group", insertDTO)
      .then(({ data }) => {
        dispatch(changeRefresh());
        setInsertDTO({ ...initDTO });
        closeModal();
        console.log("권한그룹 추가가 완료되었습니다. 추가된 권한그룹 -> ", data);
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
      <ModalContent>
        <div>
          회사명 :
          <select onChange={(e) => onChangeSelectBoxEvent(e.target.value)} value={companyNo}>
            {companyList.map((company) => <option key={company.companyNo} value={company.companyNo}>{company.companyName}</option>)}
          </select>
        </div>
        <div>
          권한그룹명 :
          <Input name="roleGroupName" type="text" onChange={(e) => roleGroupChangeEvent(e)} />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClickSaveBtn}>저장</Button>
        <Button onClick={handleCloseModal}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ROLE0010Modal;

const Button = styled.button`
  border: blue solid 1px;
  width: 100px;
  height: 70px;
`;


const Input = styled.input`
  border: black 1px solid;
`;

const ModalContent = styled.div`
  border: red solid 1px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 200px;
`;

const ModalFooter = styled.div`
  border: red solid 1px;
  height: 150px;
`;
