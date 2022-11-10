import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import redirect from "react-router-dom/es/Redirect";
import { Redirect, useHistory } from "react-router-dom";
import request from "../utils/axiosUtil";
import { setCookie } from "../utils/cookie";

// style
const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;
const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;
const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
export const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #4000c7;
`;

const initState = {
  username: "",
  password: "",
};

const login = async (loginData) => {
  const { data } = await request.post("/login", loginData);
  return data;
};


function LoginPage(props) {
  const [loginData, setLoginData] = useState({ ...initState });
  const [failModal, setFailModal] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(loginData)
      .then((res) => {
        console.log(res);
        history.push("/");
        setCookie("accessToken", "");
      })
      .catch(() => setFailModal(true));
  };

  // input tag 상태관리
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    loginData[name] = value;
    setLoginData({ ...loginData });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <Button>Enter</Button>
      </Form>
      {
        failModal === true ? (
          <ModalBackdrop>
            <ModalView>
              <button type="button" className="close-btn" onClick={() => setFailModal(false)}>&times;</button>
              <div className="desc">아이디 혹은 패스워드가 잘못되었습니다.</div>
            </ModalView>
          </ModalBackdrop>
        ) : null
      }
    </Wrapper>
  );
}

export default LoginPage;
