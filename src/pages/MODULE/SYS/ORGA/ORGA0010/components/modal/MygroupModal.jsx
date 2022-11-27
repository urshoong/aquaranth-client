import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import request from "../../../../../../../utils/axiosUtil";


// 로그인한 사원의 마이그룹 리스트를 요청
const getMygroupList = async () => {
  const { data } = await request.get("/mygroup/list");

  return data;
};

const MygroupModal = () => {
  const { closeModal } = useModal();
  const [myList, setMyList] = useState([]);

  const handleCloseModal = () => {
    closeModal();
  };

  // 로그인한 사원의 마이그룹 리스트 출력
  useEffect(() => {
    getMygroupList().then((list) => {
      console.log("마이그룹 리스트 : ", list);
      setMyList(list);
    });
  });


  return (
    <Modal
      onClose={handleCloseModal}
      title="My"
    >
      <MygroupList>
        <ul>
          {myList.map(({ mygroupNo, mygroupName, countEmp }) => <li key={mygroupNo}>{mygroupName}{countEmp} </li>)}
        </ul>
      </MygroupList>
    </Modal>
  );
};

// 마이그룹 리스트
const MygroupList = styled.div`
`;

export default MygroupModal;
