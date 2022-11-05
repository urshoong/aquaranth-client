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

const empModify = async (empInfo) => {
  const { data } = await request.put(`/emp/modify/${empInfo.empNo}`, empInfo);
  return data;
};

const initState = {
  empNo: 0,
  empName: "",
};

function EmpInformationPage() {
  const [emps, setEmps] = useState([]);

  const [empInformation, setEmpInformation] = useState(initState);

  const history = useHistory();

  const clickEmpList = (empNo) => {
    empRead(empNo).then((data) => {
      console.log(data);
      setEmpInformation(data);
    });
    console.log(empNo);
  };

  const clickEmpRegister = () => {
    history.push("/emp/insert");
  };

  const changeEmpInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    empInformation[name] = value;
    setEmpInformation({ ...empInformation });
    console.log(empInformation);
  };

  const clickEmpModify = () => {
    empModify(empInformation);
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
      empInformation={empInformation}
      clickEmpRegister={clickEmpRegister}
      changeEmpInput={changeEmpInput}
      clickEmpModify={clickEmpModify}
    />
  );
}

export default EmpInformationPage;
