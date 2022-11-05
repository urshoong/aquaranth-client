import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../utils/axiosUtil";
import EmpInformation from "../../components/emp/EmpInformation";
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

  const history = useHistory();

  const clickEmpList = (empNo) => {
    empRead(empNo).then((data) => {
      console.log(data);
      setEmpInfo(data);
    });
    console.log(empNo);
  };

  const clickEmpAdd = () => {
    history.push("/emp/insert");
  };


  useEffect(() => {
    empList().then((data) => {
      setEmps(data);
    });
  }, []);

  return (
    <EmpInformation
      emps={emps}
      clickEmpList={clickEmpList}
      empInfo={empInfo}
      clickEmpAdd={clickEmpAdd}
    />
  );
}

export default EmpInformationPage;
