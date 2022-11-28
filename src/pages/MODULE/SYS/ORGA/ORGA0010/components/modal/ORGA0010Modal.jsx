import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import CommonTreeContainer from "../orgatree/CommonTreeContainer";
import OrgatreeEmpList from "../orgatree/OrgatreeEmpList";
import OrgatreeEmpDetail from "../orgatree/OrgatreeEmpDetail";
import { getCompanyNoArr, getMygroupList, getFavoriteEmpList, deleteFavoriteEmp,
  registerMygroup, removeMygroup, modifyMygroup, getMygroupInformation } from "../../api/mygroup";


const ORGA0010Modal = () => {
  const { closeModal } = useModal();
  const [companyNoArr, setCompanyNoArr] = useState([]);
  const [myList, setMyList] = useState([]);
  const [show, setShow] = useState(); // 각 그룹을 번갈아 보여줄 상태값
  // 전체 그룹에서 쓰이는 상태값
  const [myEmpList, setMyEmpList] = useState([]); // 해당 부서에 소속된 모든 사원 정보를 담을 상태값
  const [empInfo, setEmpInfo] = useState({}); // 해당 사원 정보를 담을 상태값
  // 마이 그룹에서 쓰이는 상태값
  const [favoriteEmpList, setFavoriteEmpList] = useState([]); // 해당 마이그룹에 즐겨찾기된 모든 사원 정보를 담을 상태값
  const [favoriteEmpInfo, setFavoriteEmpInfo] = useState({}); // 즐겨찾기된 사원의 정보를 담을 상태값
  const [modifyMy, setModifyMy] = useState({}); // 수정할 마이그룹 정보를 담을 상태값
  const [modifyShow, setModifyShow] = useState(false); // 마이그룹 이름 수정칸 보여줄 상태값


  const handleCloseModal = () => {
    closeModal();
  };

  // 각 그룹 선택 시 상태값을 바꿔줄 handler
  const clickGroup = (e) => {
    const { value } = e.target;
    setShow(value);
  };

  useEffect(() => {
    getCompanyNoArr().then((list) => {
      console.log("소속된 모든 사원 정보 : ", list);
      setCompanyNoArr(list);
      setMyEmpList([]);
      setEmpInfo({});
    });
    if (show === "my") {
      getMygroupList().then((list) => {
        console.log("마이그룹 리스트 : ", list);
        setMyList(list);
        setFavoriteEmpList([]);
        setFavoriteEmpInfo({});
      });
    }
  }, [show]);

  // 마이그룹 선택 시 즐겨찾기 된 모든 사원 정보를 가져올 handler
  const clickMygroup = (mygroupNo) => {
    getFavoriteEmpList(mygroupNo).then((data) => {
      console.log("즐겨찾기된 사원 정보 : ", data);
      setFavoriteEmpList(data);
    });
  };

  // 해당 마이그룹에 즐겨찾기된 사원 삭제할 handler
  const clickFavoriteEmp = (mygroupNo, orgaNo) => {
    deleteFavoriteEmp(mygroupNo, orgaNo).then(() => {
      getFavoriteEmpList(mygroupNo).then((list) => {
        setFavoriteEmpList(list);
        setFavoriteEmpInfo({});
      });
    });
  };

  // 로그인한 사원의 새 마이그룹 생성할 handler
  const clickRegisterMygroup = () => {
    registerMygroup().then(() => {
      getMygroupList().then((list) => {
        setMyList(list);
        setFavoriteEmpList([]);
        setFavoriteEmpInfo({});
      });
    });
  };

  // 해당 마이그룹 삭제 할 handler
  const clickRemoveMygroup = (mygroupNo) => {
    removeMygroup(mygroupNo).then(() => {
      getMygroupList().then((list) => {
        setMyList(list);
        setFavoriteEmpList([]);
        setFavoriteEmpInfo({});
      });
    });
  };

  // 해당 마이그룹 이름 수정칸을 보여줄 handler
  const clickModifyShow = (mygroupNo) => {
    setModifyShow(!modifyShow);
    getMygroupInformation(mygroupNo).then((info) => {
      setModifyMy(info);
    });
  };

  // 수정되는 마이그룹 이름을 저장해 줄 handler
  const changeModifyMy = (e) => {
    const { name, value } = e.target;
    modifyMy[name] = value;
    setModifyMy({ ...modifyMy });
  };

  // 해당 마이그룹의 이름을 수정할 handler
  const clickModifyMy = () => {
    modifyMygroup(modifyMy).then(() => {
      setModifyShow(!modifyMy);
      getMygroupList().then((list) => {
        setMyList(list);
        setFavoriteEmpList([]);
        setFavoriteEmpInfo({});
      });
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="조직도"
    >
      <GroupChoose>
        <GroupChooseBtn value="all" rightBorder="1" onClick={(e) => { clickGroup(e); }}>전체그룹</GroupChooseBtn>
        <GroupChooseBtn value="my" onClick={clickGroup}>MY그룹</GroupChooseBtn>
      </GroupChoose>
      {show === "my"
        ? (
          <Orgatree>
            <MygroupList>
              <div>
                <MyRegisterSpan>ㆍMY그룹 목록</MyRegisterSpan>
                <MyRegisterBtn float="right" onClick={clickRegisterMygroup}>새그룹</MyRegisterBtn>
              </div>
              <OrgatreeItem over="auto" borderSize="1">
                {myList.map(({ mygroupNo, mygroupName, countEmp }) => (
                  <MygroupUpperDiv>
                    <MygroupItem key={mygroupNo} onClick={() => { clickMygroup(mygroupNo); }}>
                      { mygroupName }({ countEmp })
                    </MygroupItem>
                    <MyRegisterBtn margin="0.5" onClick={() => { clickModifyShow(mygroupNo); }}>수정</MyRegisterBtn>
                    <MyRegisterBtn margin="0.5" onClick={() => { clickRemoveMygroup(mygroupNo); }}>삭제</MyRegisterBtn>
                  </MygroupUpperDiv>
                ))}
                {modifyShow
                  && (
                    <ModifyMygroup>
                      ✔ <input name="mygroupName" value={modifyMy.mygroupName} onChange={(e) => { changeModifyMy(e); }} />
                      <MyRegisterBtn onClick={clickModifyMy}>완료</MyRegisterBtn>
                    </ModifyMygroup>
                  )}
              </OrgatreeItem>
            </MygroupList>
            <OrgatreeItem borderSize="1">
              <OrgatreeEmpList
                empList={favoriteEmpList}
                setEmpInfo={setFavoriteEmpInfo}
                clickFavoriteEmp={clickFavoriteEmp}
              />
            </OrgatreeItem>
            <OrgatreeItem>
              <OrgatreeEmpDetail empInfo={favoriteEmpInfo} />
            </OrgatreeItem>
          </Orgatree>
        )
        : (
          <Orgatree>
            <OrgatreeItem over="auto" borderSize="1">
              {companyNoArr.map(({ companyNo }) => (
                <CommonTreeContainer
                  key={companyNo}
                  companyNo={companyNo}
                  setEmpList={setMyEmpList}
                />
              ))}
            </OrgatreeItem>
            <OrgatreeItem borderSize="1">
              <OrgatreeEmpList empList={myEmpList} setEmpInfo={setEmpInfo} />
            </OrgatreeItem>
            <OrgatreeItem>
              <OrgatreeEmpDetail empInfo={empInfo} />
            </OrgatreeItem>
          </Orgatree>
        )}
    </Modal>
  );
};

export default ORGA0010Modal;

const GroupChoose = styled.div`
  margin-top: 1em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid black;
`;

const GroupChooseBtn = styled.button`
  font-size: 1.3em;
  color: #6c6c6c;
  padding-right: 1em;
  padding-left: 1em;
  border-right: ${(props) => props.rightBorder}px solid darkgray;
`;

const Orgatree = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  padding-top: 1em;
`;

const OrgatreeItem = styled.div`
  overflow: ${(prop) => prop.over};
  min-width: 230px;
  max-height: 30rem;
  border: ${(prop) => prop.borderSize}px solid darkgray;
`;

const MygroupList = styled.div`
  display: grid;
  grid-template-rows: 1fr 13fr;
`;

const MygroupUpperDiv = styled.div`
  display: flex;
  line-height: 2em;
  margin-top: 0.3em;
`;

const MygroupItem = styled.div`
  font-size: 1.3em;

  margin-left: 0.5em;
`;

const MyRegisterSpan = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const MyRegisterBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: ${(props) => props.margin}em;
  float: ${(props) => props.float};
`;

const ModifyMygroup = styled.div`
  margin-left: 1em;
  margin-top: 5em;
`;

