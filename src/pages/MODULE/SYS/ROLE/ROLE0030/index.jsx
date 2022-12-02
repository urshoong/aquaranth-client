import React from "react";
import MenuConfigurationComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/MenuConfigurationComp";
import { ReactQueryDevtools } from "react-query/devtools";
import { SelectMenuContextProvider } from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";

const Index = () => {
  return (
    <SelectMenuContextProvider>
      <MenuConfigurationComp />
      <ReactQueryDevtools initialIsOpen />
    </SelectMenuContextProvider>
  );
};


export default Index;

