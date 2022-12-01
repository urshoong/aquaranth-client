import React, { useEffect, useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled from "styled-components";
import Swal from "sweetalert2";
import CommonTreeContainer from "../orgatree/CommonTreeContainer";
import OrgatreeEmpList from "../orgatree/OrgatreeEmpList";
import OrgatreeEmpDetail from "../orgatree/OrgatreeEmpDetail";
import { getCompanyNoArr, getMygroupList, getFavoriteEmpList, deleteFavoriteEmp,
  registerMygroup, removeMygroup, modifyMygroup, getMygroupInformation } from "../../api/mygroup";


// 마이그룹 수정할 때 사용하는 초기값
const initState = {
  mygroupNo: 0,
  mygroupName: "",
};

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
  const [modifyMy, setModifyMy] = useState(initState); // 수정할 마이그룹 정보를 담을 상태값
  // 그룹 선택 시 구별하기 위한 값
  const allRef = useRef();
  const myRef = useRef();
  // 그룹 이름 수정 시 사용할 값
  const modifyRef = useRef([]);


  const handleCloseModal = () => {
    closeModal();
  };

  // 각 그룹 선택 시 상태값을 바꿔줄 handler
  const clickGroup = (e) => {
    const { value } = e.target;
    setShow(value);

    allRef.current.classList.remove("active");
    myRef.current.classList.remove("active");

    if (value === "my") {
      myRef.current.classList.add("active");
    } else {
      allRef.current.classList.add("active");
    }
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
  const clickFavoriteEmp = (e, mygroupNo, orgaNo) => {
    e.stopPropagation();
    deleteFavoriteEmp(mygroupNo, orgaNo).then(() => {
      getMygroupList().then((list) => {
        setMyList(list);
        getFavoriteEmpList(mygroupNo).then((data) => {
          setFavoriteEmpList(data);
          setFavoriteEmpInfo({});
        });
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
  const clickRemoveMygroup = (mygroupNo, mygroupName) => {
    Swal.fire({
      title: `${mygroupName} 삭제`,
      text: "해당 그룹을 삭제하시겠습니까?",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "삭제", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        Swal.fire("완료", "삭제를 완료했습니다.", "success").then(() => {
          removeMygroup(mygroupNo).then(() => {
            getMygroupList().then((list) => {
              setMyList(list);
              setFavoriteEmpList([]);
              setFavoriteEmpInfo({});
            });
          });
        });
      }
    });
  };

  // 해당 마이그룹의 이름을 수정할 handler
  const clickModifyMygroup = (mygroupNo, index) => {
    // readonly 가 true면 false로 바꾸고 focus
    if (modifyRef.current[index].readOnly) {
      modifyRef.current[index].readOnly = "";
      modifyRef.current[index].focus();
      getMygroupInformation(mygroupNo).then((info) => {
        setModifyMy(info);
      });
    // readonly 가 false면 myGroup명을 수정하고 true로 바꿈
    } else {
      modifyMygroup(modifyMy).then(() => {
        getMygroupList().then((list) => {
          Swal.fire("완료", "수정이 완료되었습니다.", "success").then(() => {
            setMyList(list);
            setFavoriteEmpList([]);
            setFavoriteEmpInfo({});
            modifyRef.current[index].readOnly = "true";
          });
        });
      });
    }
  };

  // 수정되는 마이그룹 이름을 저장해 줄 handler
  const changeModifyMygroup = (e, index) => {
    const { name, value } = e.target;
    console.log(name, value);
    // 마이그룹 리스트 map 수정을 위한 로직
    myList[index][name] = value;
    setMyList([...myList]);
    // 마이그룹 명을 수정만 하기 위해 사용되는 로직
    modifyMy[name] = value;
    setModifyMy({ ...modifyMy });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="조직도"
    >
      <GroupChoose>
        <GroupChooseBtn ref={allRef} className="active" value="all" rightBorder="1px solid darkgray" onClick={(e) => { clickGroup(e); }}>전체그룹</GroupChooseBtn>
        <GroupChooseBtn ref={myRef} value="my" onClick={clickGroup}>MY그룹</GroupChooseBtn>
      </GroupChoose>
      {show === "my"
        ? (
          <Orgatree>
            <MygroupList>
              <div>
                <MyRegisterSpan>ㆍMY그룹 목록</MyRegisterSpan>
                <MyRegisterBtn float="right" onClick={clickRegisterMygroup}>새그룹</MyRegisterBtn>
              </div>
              <OrgatreeItem over="auto" borderSize="1px solid darkgray">
                {myList.map(({ mygroupNo, mygroupName, countEmp }, index) => (
                  <MygroupUpperDiv key={mygroupNo}>
                    <MygroupItem key={mygroupNo} onClick={() => { clickMygroup(mygroupNo); }}>
                      <input
                        style={{ minWidth: "50px", maxWidth: "100px" }}
                        ref={(el) => { modifyRef.current[index] = el; }}
                        readOnly
                        className="modify"
                        name="mygroupName"
                        value={mygroupName}
                        onChange={(e) => { changeModifyMygroup(e, index); }}
                      />({countEmp})
                    </MygroupItem>
                    <MyRegisterBtn margin="0.5em" onClick={() => { clickModifyMygroup(mygroupNo, index); }}>수정</MyRegisterBtn>
                    <MyRegisterBtn margin="0.5em" onClick={() => { clickRemoveMygroup(mygroupNo, mygroupName); }}>삭제</MyRegisterBtn>
                  </MygroupUpperDiv>
                ))}
              </OrgatreeItem>
            </MygroupList>
            <OrgatreeItem className="list" borderSize="1px solid darkgray">
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
            <OrgatreeItem over="auto" borderSize="1px solid darkgray">
              {companyNoArr.map(({ companyNo }) => (
                <CommonTreeContainer
                  key={companyNo}
                  companyNo={companyNo}
                  setEmpList={setMyEmpList}
                />
              ))}
            </OrgatreeItem>
            <OrgatreeItem className="list" borderSize="1px solid darkgray">
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
  border-bottom: 1px solid black;
`;

const GroupChooseBtn = styled.button`
  font-size: 1.3em;
  color: #6c6c6c;
  padding: 0.5em 1em;
  
  border-right: ${(props) => props.rightBorder};
  &.active{
    color: #46a3fb;
    font-weight: bold;
    border-bottom: 2px solid #46a3fb;
  }
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
  border: ${(prop) => prop.borderSize};
  &:not(.list){
    max-width: 230px;
  }
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
  display: flex;
`;

const MyRegisterSpan = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const MyRegisterBtn = styled.button`
  border: 1px solid darkgray;
  padding: 0.3em 0.3em 0.3em 0.3em;
  margin-left: ${(props) => props.margin};
  float: ${(props) => props.float};
`;

const ModifyMygroup = styled.div`
  margin-left: 1em;
  margin-top: 5em;
`;

