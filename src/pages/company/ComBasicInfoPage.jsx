import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import ComLayout from "../../components/company/ComLayout";

const companyList = async () => {
  const { data } = await request.get("/company/list");

  return data;
};
const searchCompany = async (companyUse, companyName, companyNo) => {
  const { data } = await request.get(`/company/search?companyUse=${companyUse}&companyName=${companyName}&companyNo=${companyNo}`);

  return data;
};


function ComBasicInfoPage() {
  const [comList, setComList] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setComList(data);
    });
    // searchCompany(false, "", "").then((data) => {
    //   console.log("data", data);
    //   setSearch(data);
    // });
  }, []);
  return (
    <ComLayout comList={comList} />
  );
}

export default ComBasicInfoPage;
