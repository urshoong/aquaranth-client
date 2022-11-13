import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import request from "@utils/axiosUtil";
import EmpInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpInformation";

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

const empRemove = async (empNo) => {
  const { data } = await request.delete(`/emp/remove/${empNo}`);
  return data;
};

const initState = {
  empNo: 0,
  empName: "",
  username: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
  firstHiredDate: "",
  firstRetiredDate: "",
  empUse: "",
};


// -----------------조직 TEst----------------------------
const empOrgaList = async (empNo) => {
  const { data } = await request.get(`/emp/readOrga/${empNo}`);
  return data;
};

//---------------------------------------------

function Index() {
  // -----------------페이징----------------------------


  //---------------------------------------------

  const [emps, setEmps] = useState([]);

  const [empInformation, setEmpInformation] = useState(initState);

  const history = useHistory();

  // -----------------조직 TEst----------------------------

  const [orga, setOrga] = useState([]);

  //---------------------------------------------


  // 조직 정보를 보기 위해 버튼 클릭 시 컴포넌트를 변경하기 위한 상태를 담은 변수 선언
  const [view, setVeiw] = useState(true);

  // 기본 정보, 조직 정보 span 글자 색상 변경 ( style )
  const [basicColor, setBasicColor] = useState("black");
  const [orgaColor, setOrgaColor] = useState("black");

  // 사원 정보가 담긴 컴포넌트를 부르기 위한 함수 선언
  const clickEmp = (empNo) => {
    setBasicColor("blue");
    setOrgaColor("black");
    setVeiw(true);

    empRead(empNo).then((data) => {
      setEmpInformation(data);
    });
  };

  // 조직 정보가 담긴 컴포넌트를 부르기 위한 함수 선언
  const clickOrga = (empNo) => {
    setBasicColor("black");
    setOrgaColor("blue");
    setVeiw(false);

    empOrgaList(empNo).then((data) => {
      console.log(data);
      setOrga(data);
    });
  };

  // 추가 버튼 클릭 시, register 페이지로 이동
  const clickEmpRegister = () => {
    history.push("ORGA0030/register");
  };

  // 사원 정보 수정할 때, input의 onChange 이벤트 실행 함수
  const changeEmpInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    empInformation[name] = value;
    setEmpInformation({ ...empInformation });
    console.log(empInformation);
  };

  // 사원 정보 입력 후, 수정 버튼 클릭 실행 함수
  const clickEmpModify = () => {
    empModify(empInformation).then(() => {
      empList().then((data) => {
        setEmps(data);
      });
    });
  };

  // 사원 삭제 버튼
  const clickEmpRemove = () => {
    empRemove(empInformation.empNo).then(() => {
      empList().then((data) => {
        setEmps(data);
      });
    });
  };

  // 화면 로딩 시, 사원 목록 출력하기
  useEffect(() => {
    empList().then((data) => {
      setEmps(data);
    });
  }, []);


  //---------------------------------------------
  // 페이징

  //---------------------------------------------

  return (
    <EmpInformation
      emps={emps}
      empInformation={empInformation}
      clickEmpRegister={clickEmpRegister}
      changeEmpInput={changeEmpInput}
      clickEmpModify={clickEmpModify}
      clickEmpRemove={clickEmpRemove}
      clickEmp={clickEmp}
      clickOrga={clickOrga}
      view={view}
      basicColor={basicColor}
      orgaColor={orgaColor}
      orga={orga}
    />

  );
}

export default Index;
