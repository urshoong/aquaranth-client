import React, { useEffect, useState } from "react";
import "./comLayout.css";
import request from "@utils/axiosUtil";
import { Link } from "react-router-dom";
import useNavigate from "../../../../../hooks/useNavigate";
import useModal from "@hooks/useModal";
import Button from "@components/Button";


const companyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const searchCompany = async (companyUse, companySearch) => {
  const { data } = await request.get(`/company/search?companyUse=${companyUse}&companySearch=${companySearch}`);

  return data;
};

const companyInformation = async (companyNo) => {
  const { data } = await request.get(`/company/information/${companyNo}`);
  return data;
};

const companyRemove = async (companyNo) => {
  await request.delete(`/company/remove/${companyNo}`);
};

const companyRegister = async (info) => {
  await request.post("/company/register", info);
};

const companyModify = async (companyNo, modify) => {
  await request.put(`/company/modify/${companyNo}`, modify);
};


const initState = {
  companyNo: 0,
  companyName: "",
  companyAddress: "",
  companyTel: "",
  ownerName: "",
  businessNumber: "",
  foundingDate: "",
  companyUse: true,
};

function Index() {
  const [search, setSearch] = useState([]);
  const [information, setInformation] = useState(initState);
  const [code, setCode] = useState("");
  const [use, setUse] = useState("true");
  const [register, setRegister] = useState(initState);
  const { companyNo, companyName, companyAddress, companyTel, ownerName, businessNumber, foundingDate, companyUse } = information;

  const navigate = useNavigate();
  useEffect(() => {
    companyList().then((data) => {
      setSearch(data);
    });
  }, []);

  const changeHandler = (e) => {
    setCode(e.target.value);
  };

  const clikcHandlerUSe = (e) => {
    setUse(e.target.value);
  };

  const clickHandler = () => {
    searchCompany(use, code).then((data) => {
      setSearch(data);
    });
  };

  const clickInformation = (num) => {
    companyInformation(num).then((data) => {
      console.log(data);
      setInformation(data);
    });
  };

  const changeBoolean = (value) => {
    let booleanValue = true;
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "false") {
        booleanValue = false;
      }
    }
    return booleanValue;
  };

  const changeRegister = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    if (name === "companyUse") {
      information[name] = changeBoolean(value);
    } else {
      information[name] = value;
    }
    setRegister({ ...information });
  };

  const clickRemove = (num) => {
    companyRemove(num).then(() => {
      setInformation(initState);
      companyList().then((data) => {
        setSearch(data);
      });
    });
  };

  const clickRegister = (info) => {
    companyRegister(info).then(() => {
      setInformation(initState);
      companyList().then((data) => {
        setSearch(data);
      });
    });
  };

  const clickRegisterBefore = () => {
    setInformation({ ...initState });
  };

  const clickModify = (num, info) => {
    companyModify(num, info).then(() => {
      companyList().then((list) => {
        setSearch(list);
      });
    });
  };

  const handleOnNavigate = () => {
    navigate.go("/group");
  };
  const { openModal } = useModal();
  const data = { menucode: "ORGA0010", menuname: "회사 관리" };
  const handleOnModal = () => {
    openModal({ type: "ORGA0010", props: data });
  };

  return (
    <>
      <Button type="button" onClick={handleOnModal}>ORGA0010 모달 띄우기</Button>
      <div className="searchDiv">
        <span className="comName">회사</span>
        <button type="button" onClick={handleOnNavigate}>GO</button>
        <input className="comNameInput" type="text" placeholder="회사코드/회사명을 입력하세요." onChange={(e) => { changeHandler(e); }} />

        <span className="comUse">사용여부</span>
        <select className="comUseSelect" onClick={(e) => { clikcHandlerUSe(e); }}>
          <option value="true">사용</option>
          <option value="false">미사용</option>
        </select>
        <button className="searchBt" type="submit" onClick={() => { clickHandler(); }}>🔍</button>
      </div>
      <div className="listInfoDiv">
        <div className="roleGroupList">
          {search?.map(({ companyNo, companyName, ownerName, companyUse }) => (
            <div key={companyNo} className="comListDiv" onClick={() => { clickInformation(companyNo); }}>
              <div>{companyNo}</div>
              <div>{ownerName}</div>
              <div>{companyName}</div>
              <div>{companyUse ? "사용" : "미사용"} </div>
            </div>
          ))}
        </div>
        <div className="comInfo">
          <div className="contentDiv">
            <span className="companyCount">회사 {search.length}건</span>
            <div className="buttonsDiv">
              <button className="registerBeforeBt" type="submit" onClick={() => { clickRegisterBefore(); }}>추가</button>
              <button className="registerBt" type="submit" onClick={() => { clickRegister(information); }}>저장</button>
              <button className="modifyBt" type="submit" onClick={() => { clickModify(companyNo, information); }}>수정</button>
              <button className="removeBt" type="submit" onClick={() => { clickRemove(companyNo); }}>삭제</button>
            </div>
          </div>
          <p className="basicFont">ㆍ기본정보</p>
          <div className="basicInformation">
            <div>
              <span>회사코드</span>
              <input className="companyNoInput" type="text" name="companyNo" value={companyNo} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>회사명</span>
              <input className="companyNameInput" type="text" name="companyName" value={companyName} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>회사주소</span>
              <input className="companyAddressInput" type="text" name="companyAddress" value={companyAddress} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>회사전화번호</span>
              <input className="companyTelInput" type="text" name="companyTel" value={companyTel} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>대표자명</span>
              <input className="ownerNameInput" type="text" name="ownerName" value={ownerName} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>사업자번호</span>
              <input className="businessNumberInput" type="text" name="businessNumber" value={businessNumber} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div>
              <span>설립일</span>
              <input className="foundingDateInput" type="date" name="foundingDate" value={foundingDate} onChange={(e) => { changeRegister(e); }} />
            </div>
            <div className="useCheckDiv">
              <span>사용여부</span>
              <div>
                <input className="companyUseInput" name="companyUse" type="radio" value="true" checked={companyUse === true} onChange={(e) => { changeRegister(e); }} />사용
                <input className="companyUseInput" name="companyUse" type="radio" value="false" checked={companyUse === false} onChange={(e) => { changeRegister(e); }} />미사용
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
