import React from "react";
import { FullLayout } from "@components/Util";
import { CenterGrid } from "@components/Grid";
import { Link } from "react-router-dom";


const Error = ({ error, resetErrorBoundary }) => {
  return (
    <FullLayout>
      {error.name}
      <CenterGrid>
        페이지를 찾을 수 없습니다.
        {/* {error.message} */}
        <Link to="/" onClick={resetErrorBoundary}>뒤로가기</Link>
      </CenterGrid>
    </FullLayout>
  );
};


export default Error;
