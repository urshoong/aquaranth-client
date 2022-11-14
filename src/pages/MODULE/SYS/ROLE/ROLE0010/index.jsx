import React, { useEffect, useState } from "react";
import "./style.css";
import SearchBox from "@pages/MODULE/SYS/ROLE/ROLE0010/components/SearchBox";
import RoleGroupList from "@pages/MODULE/SYS/ROLE/ROLE0010/components/RoleGroupList";
import { useDispatch, useSelector } from "react-redux";
import { GET_COMPANY, GET_ROLE_GROUP } from "@reducer/roleGroupSlice";

function Index() {
  const { isLoading, refresh } = useSelector((state) => state.roleGroup);
  const loading = isLoading && <>로딩중...</>;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_COMPANY());
    dispatch(GET_ROLE_GROUP());
  }, [refresh]);

  return (
    <div className="mainDiv">
      <div className="container">
        {loading}
        <SearchBox />
        <RoleGroupList />
      </div>
      <div className="menuRole-container" />
    </div>
  );
}

export default Index;
