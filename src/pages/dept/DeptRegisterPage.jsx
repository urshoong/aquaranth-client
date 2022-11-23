import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DeptRegisterComponent from "@components/dept/DeptRegisterComponent";


function DeptRegisterPage(props) {
  return (
    <div>
      <h1>register page test</h1>
      <DeptRegisterComponent />
    </div>
  );
}

export default DeptRegisterPage;
