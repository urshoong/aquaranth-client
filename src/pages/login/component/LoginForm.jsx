import React from "react";

const LoginForm = ({ form, loginHandler }) => {
  const { register, handleSubmit } = form;
  return (
    <>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="border-1 p-2 shadow">
          <input
            {...register("username", { required: true })}
            placeholder="아이디"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="비밀번호"
            autoComplete="off"
          />
        </div>
        <input type="submit" value="로그인"/>
      </form>
    </>
  );
};

export default LoginForm;
