import React from "react";
import ErrorLayout from "@components/error/ErrorLayout";
import { useHistory } from "react-router-dom";

const NotFoundError = () => {
  const history = useHistory();

  return (
    <ErrorLayout
      image=""
      messange="페이지가 존재하지 않습니다."
      buttonText="홈으로"
      onButtonClick={() => {
        history.push("/");
      }}
    />
  );
};

export default NotFoundError;
