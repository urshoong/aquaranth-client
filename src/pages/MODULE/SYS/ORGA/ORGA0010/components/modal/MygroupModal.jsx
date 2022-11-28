import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import { getMygroupList, registerFavorite } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";


const MygroupModal = ({ orgaNo }) => {
  const { closeModal } = useModal();
  const [myList, setMyList] = useState([]);
  const [favoriteInfo, setFavoriteInfo] = useState({ mygroupNo: 0 });

  const handleCloseModal = () => {
    closeModal();
  };

  // 로그인한 사원의 마이그룹 리스트 출력
  useEffect(() => {
    getMygroupList().then((list) => {
      console.log("마이그룹 리스트 : ", list);
      setMyList(list);
      console.log(orgaNo);
      setFavoriteInfo({ orgaNo });
    });
  }, [orgaNo]);

  // 마이그룹 선택할 handler
  const changeMygroup = (e) => {
    const { name, value } = e.target;
    favoriteInfo[name] = value;
    setFavoriteInfo({ ...favoriteInfo });
  };

  // 마이그룹에 추가할 handler
  const clickFavorite = () => {
    registerFavorite(favoriteInfo).then(() => {
      getMygroupList().then((list) => {
        setMyList(list);
      });
    });
  };

  console.log(favoriteInfo);
  return (
    <Modal
      onClose={handleCloseModal}
      title="My"
    >
      {myList.map(({ mygroupNo, mygroupName, countEmp }) => (
        <MygroupList key={mygroupNo}>
          <input type="radio" name="mygroupNo" value={mygroupNo} onChange={(e) => { changeMygroup(e); }} />{ mygroupName }({ countEmp })
          <InsertBtn type="submit" onClick={clickFavorite}>추가</InsertBtn>
        </MygroupList>
      ))}
    </Modal>
  );
};

// 마이그룹 리스트
const MygroupList = styled.div`
  font-size: 1rem;
  padding: 0.5em 0.5em;
`;

// 마이그룹 추가 버튼
const InsertBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: 0.5em;
`;


export default MygroupModal;
