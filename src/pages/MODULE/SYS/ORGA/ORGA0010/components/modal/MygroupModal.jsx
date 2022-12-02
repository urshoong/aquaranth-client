import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import {
  getMygroupList,
  registerFavorite,
  registerMygroup,
} from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";
import Swal from "sweetalert2";


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
    if (favoriteInfo.mygroupNo === undefined || favoriteInfo.orgaNo === undefined) {
      Swal.fire("미선택", "그룹 및 사원을 선택해주세요.", "warning").then();
    } else {
      registerFavorite(favoriteInfo).then((data) => {
        if (data === 0) {
          Swal.fire("미완료", "이미 즐겨찾기된 사원입니다.", "error").then();
        } else if (data === -1) {
          Swal.fire("미완료", "로그인한 사원은 즐겨찾기 될 수 없습니다.", "error").then();
        } else {
          getMygroupList().then((list) => {
            setMyList(list);
            Swal.fire("완료", "즐겨찾기 완료했습니다.", "success").then(() => {
            });
          });
        }
        handleCloseModal();
      });
    }
  };

  // 로그인한 사원의 새 마이그룹 생성할 handler
  const clickRegisterMygroup = () => {
    registerMygroup().then(() => {
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
      z-index="9999"
    >
      <MyRegisterBtn onClick={clickRegisterMygroup}>새그룹</MyRegisterBtn>
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

// 마이그룹에 추가 버튼
const InsertBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: 0.5em;
`;

// 새 그룹 추가 버튼
const MyRegisterBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-top: 0.5em;
  float: right;
`;


export default MygroupModal;
