import React from "react";
import MenuConfigurationComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/MenuConfigurationComp";
import { SelectMenuContextProvider } from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";

const Index = () => {
  return (
    <SelectMenuContextProvider>
      <MenuConfigurationComp />
    </SelectMenuContextProvider>
  );
};


export default Index;

