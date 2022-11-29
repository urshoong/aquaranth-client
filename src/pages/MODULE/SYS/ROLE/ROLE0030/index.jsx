import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import request from "@utils/axiosUtil";

const Index = () => {
  const { state, data, error, isFetching } = useQuery("menu", async () => {
    const response = await request("/menuz/list");
    return response.data;
  });
  return <div>
    {data?.map((item) => <div>{item.menuCode}</div>)}
  </div>;
};

export default Index;

