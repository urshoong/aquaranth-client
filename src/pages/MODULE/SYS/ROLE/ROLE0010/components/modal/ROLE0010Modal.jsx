import React, { useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import request from "@utils/axiosUtil";

const initDTO = {
  companyNo: 0,
  roleGroupName: "",
};

const ROLE0010Modal = (props) => {
  const { closeModal } = useModal();
  const [insertDTO, setInsertDTO] = useState(initDTO);

  const handleCloseModal = () => {
    closeModal();
  };

  console.log(props);

  const onClickSaveBtn = async () => {
    await request.post("/role-group", insertDTO)
      .then(({ data }) => {
        // changeRefresh();
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

  return (
    <Modal
      onClose={handleCloseModal}
      title="권한 그룹 추가"
    >
      <ModalContent>
        <div>
          회사명 :
          <select>
            <option>회사1</option>
            <option>회사2</option>
            <option>회사3</option>
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
