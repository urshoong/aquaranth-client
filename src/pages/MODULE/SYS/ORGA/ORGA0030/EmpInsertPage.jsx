import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import request from "@utils/axiosUtil";
import EmpInsert from "@components/emp/EmpInsert";

const empRegister = async (emp) => {
  const { data } = await request.post("/emp/register", emp);
  return data;
};

const initState = {
  empProfile: "",
  empName: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
};

function EmpInsertPage(props) {
  const [empValue, setEmpValue] = useState(initState);

  const history = useHistory();

  const chengeEmpInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    empValue[name] = value;
    setEmpValue({ ...empValue });
    console.log(empValue);
  };

  const clickEmpAdd = () => {
    empRegister(empValue).then(() => {
      setEmpValue(empValue);
      history.replace("/emp/information");
    });
  };

  const clickMoveEmpListPage = () => {
    history.replace("/emp/information");
  };

  return (
    <EmpInsert
      chengeEmpInput={chengeEmpInput}
      clickEmpAdd={clickEmpAdd}
      clickMoveEmpListPage={clickMoveEmpListPage}
    />
  );
}

export default EmpInsertPage;
