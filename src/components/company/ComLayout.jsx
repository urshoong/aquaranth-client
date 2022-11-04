import React, { useEffect, useState } from "react";
import "./comLayout.css";
import request from "../../utils/axiosUtil";

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

const companyRegister = async (dto) => {
  const { data } = await request.post("/company/add", dto);

  return data;
};

const companyRemove = async (companyNo) => {
  await request.delete(`/company/remove/${companyNo}`);
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

function ComLayout() {
  const [search, setSearch] = useState([]);
  const [information, setInformation] = useState("");
  const [code, setCode] = useState("");
  const [use, setUse] = useState(true);
  const [register, setRegister] = useState(initState);

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

  const clickInformation = (companyNo) => {
    companyInformation(companyNo).then((data) => {
      console.log(data);
      setInformation(data);
    });
  };

  const changeRegister = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    register[name] = value;
    setRegister({ ...register });

    console.log(register);
  };

  const clickRemove = (companyNo) => {
    companyRemove(companyNo).then(() => {
      setInformation(initState);
      companyList().then((data) => {
        setSearch(data);
      });
    });
  };

  const clickRegister = (dto) => {
    companyRegister(dto).then(() => {
      setInformation(initState);
      companyList().then((list) => {
        setSearch(list);
      });
    });
  };

  return (
    <div className="firstOutDiv">
      <div className="headLine">
        <span className="comManage">회사관리</span>
      </div>
      <div className="mainDiv">
        <div className="searchDiv">
          <span className="comName">회사</span>
          <input className="comNameInput" type="text" placeholder="회사코드/회사명을 입력하세요." onChange={(e) => { changeHandler(e); }} />
          <span className="comUse">사용여부</span>
          <select className="comUseSelect" onClick={(e) => { clikcHandlerUSe(e); }}>
            <option value="true">사용</option>
            <option value="false">미사용</option>
          </select>
          <button className="searchBt" onClick={() => { clickHandler(); }}>🔍</button>
        </div>
        <div className="listInfoDiv">
          <div className="comList">
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
                <button className="registerBt" onClick={() => { clickRegister(register); }}>추가</button>
                <button className="modifyBt">저장</button>
                <button className="removeBt" onClick={() => { clickRemove(information.companyNo); }}>삭제</button>
              </div>
            </div>
            <p className="basicFont">ㆍ기본정보</p>
            <div className="basicInformation">
              <div>
                <span>회사코드</span>
                <input className="companyNoInput" type="text" name="companyNo" value={information.companyNo} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>회사명</span>
                <input className="companyNameInput" type="text" name="companyName" value={information.companyName} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>회사주소</span>
                <input className="companyAddressInput" type="text" name="companyAddress" value={information.companyAddress} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>회사전화번호</span>
                <input className="companyTelInput" type="text" name="companyTel" value={information.companyTel} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>대표자명</span>
                <input className="ownerNameInput" type="text" name="ownerName" value={information.ownerName} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>사업자번호</span>
                <input className="businessNumberInput" type="text" name="businessNumber" value={information.businessNumber} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>설립일</span>
                <input className="foundingDateInput" type="date" name="foundingDate" value={information.foundingDate} onChange={(e) => { changeRegister(e); }} />
              </div>
              <div>
                <span>사용여부</span>
                <input className="companyUseInput" name="use" type="radio" />사용
                <input className="companyUseInput" name="use" type="radio" />미사용
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComLayout;
