import React, { useEffect, useState } from "react";
import request from "../../utils/axiosUtil";
import EmpFrame from "../../components/emp/EmpFrame";
// TODO 정렬, 페이징

const empList = async () => {
  const { data } = await request.get("/emp/information");
  return data;
};

const empRead = async (empNo) => {
  const { data } = await request.get(`/emp/read/${empNo}`);
  return data;
};

const initState = {
  empNo: 0,
  empName: "",
};

function EmpInformationPage() {
  const [emps, setEmps] = useState([]);

  const [empInfo, setEmpInfo] = useState(initState);

  const empListClick = (empNo) => {
    empRead(empNo).then((data) => {
      console.log(data);
      setEmpInfo(data);
    });
    console.log(empNo);
  };


  useEffect(() => {
    empList().then((data) => {
      setEmps(data);
    });
  }, []);

  return (
    <EmpFrame emps={emps} empListClick={empListClick} empInfo={empInfo} />
  );
}

export default EmpInformationPage;
