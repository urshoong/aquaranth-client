import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import request from "@utils/axiosUtil";
import { ReactQueryDevtools } from "react-query/devtools";

const Index = () => {
  const { state, data, error, isFetching } = useQuery("menu", async () => {
    const response = await request("/menu/list");
    return response.data;
  });
  return (
    <div>
      <ReactQueryDevtools initialIsOpen />
      {data?.map((item) => <div>{item.menuCode}</div>)}
    </div>
  );
};

export default Index;

