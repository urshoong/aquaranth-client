import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import EmpInsert from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpInsert";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";

const empRegister = async (emp) => {
  const { data } = await request.post("/emp/register", emp);
  return data;
};

// 앞에 index에서 썼는데 또 받아와서 써도 상관없나? 그것도 username만을 위해서 ㅇ0ㅇ?
const empList = async () => {
  const { data } = await request.get("/emp/information");
  return data;
};

const companyList = async () => {
  const { data } = await request.get("/company/list");
  console.log(data);
  return data;
};

const initState = {
  deptNo: "",
  empRank: "",
  empProfile: "",
  empName: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
};

function index(props) {
  const [empValue, setEmpValue] = useState(initState);
  const [company, setCompany] = useState([]);

  const history = useHistory();

  useEffect(() => {
    companyList().then((data) => {
      setCompany(data);
    });
  }, []);

  const chengeEmpInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    empValue[name] = value;
    setEmpValue({ ...empValue });
    console.log(empValue);
  };

  /// //////////////
  const idCheck = () => {

  };
  /// //////////////

  const clickEmpAdd = () => {
    empRegister(empValue).then(() => {
      setEmpValue(empValue);
      history.replace("/SYS/ORGA/ORGA0030");
    });
  };

  const clickMoveEmpListPage = () => {
    history.replace("/SYS/ORGA/ORGA0030");
  };

  return (
    <EmpInsert
      company={company}
      chengeEmpInput={chengeEmpInput}
      clickEmpAdd={clickEmpAdd}
      clickMoveEmpListPage={clickMoveEmpListPage}
      idCheck={idCheck}
    />
  );
}

export default index;
