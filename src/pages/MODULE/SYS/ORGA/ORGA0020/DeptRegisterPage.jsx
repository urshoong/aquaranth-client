import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DeptRegisterComponent from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptRegisterComponent";


function DeptRegisterPage(props) {
  return (
    <div>
      <h1>register page test</h1>
      <DeptRegisterComponent />
    </div>
  );
}

export default DeptRegisterPage;
