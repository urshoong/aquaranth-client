<<<<<<< HEAD
import React from "react";
import DeptRegisterComponent from "@components/dept/DeptRegisterComponent";

function DeptRegister(props) {
  return (
    <div>
      <h1>test register page</h1>
      <DeptRegisterComponent/>
=======
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DeptRegisterComponent from "@components/dept/DeptRegisterComponent";


function DeptRegisterPage(props) {
  return (
    <div>
      <h1>register page test</h1>
      <DeptRegisterComponent />
>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022
    </div>
  );
}

<<<<<<< HEAD
export default DeptRegister;
=======
export default DeptRegisterPage;
>>>>>>> d96e70de59857c0c7bcc897a53a5194692597022
