import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";

const companyList = async () => {
  const { data } = await request.get("company/comlist");

  return data;
};

function ComBasicInfo() {
  const [comList, setComList] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setComList(data);
    });
  }, []);

  console.log(comList);
  return (
    <div>
      {comList?.map(({ companyNo, companyName, ownerName }) => {
        return <li key={companyNo}>{companyNo} / {companyName} / {ownerName}</li>;
      })}
    </div>
  );
}

export default ComBasicInfo;
