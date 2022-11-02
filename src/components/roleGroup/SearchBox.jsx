import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";

const fetchData = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

function SearchBox(props) {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => setCompanyList(data));
  }, []);

  return (
    <div className="search">
      소속 회사 선택
      <select>
        {companyList.map((company) => {
          const { companyNo, companyName } = company;
          return <option key={companyNo}>{companyName}</option>;
        })}
      </select>
      <br /><input className="input" type="text" />
      <button className="button">찾기</button>
    </div>
  );
}

export default SearchBox;
