import React, { useEffect, useState } from "react";
import request from "../../utils/axiosUtil";
import EmpInformation from "../../components/emp/EmpInformation";
// TODO 정렬, 페이징

const empList = async () => {
  const { data } = await request.get("/emp/information");
  return data;
};

function EmpInformationPage() {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    empList().then((data) => {
      console.log(data);
      setEmps(data);
    });
  }, []);

  return (
    <EmpInformation emps={emps} />
  );
}

export default EmpInformationPage;
