import React, { useState } from "react";
import EmpOrgaInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpOrgaInformation";
import request from "@utils/axiosUtil";

const empOrgaList = async (empNo) => {
  const { data } = await request.get(`/readOrga/${empNo}`);
  return data;
};

const index = () => {
  const [orga, setOrga] = useState();

  const clickEmpList = () => {
    empOrgaList().then((data) => {
      console.log(data);
      setOrga(data);
    });
  };

  return (
    <div>
      <EmpOrgaInformation />
    </div>
  );
};

export default index;
