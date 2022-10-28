import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "@utils/axiosUtil";
import { SET_TIME } from "@reducer/indexSlice";

const IndexPage = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.index);

  useEffect(() => {
    request.get("/time").then((res) => {
      dispatch(SET_TIME(res.data));
    });
  }, [dispatch]);
  return (
    <div>
      {time.time}
    </div>
  );
};

export default IndexPage;
