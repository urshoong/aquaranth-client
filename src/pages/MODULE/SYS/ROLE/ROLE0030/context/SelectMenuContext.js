import React, { createContext, useState } from "react";


const SelectMenuContext = createContext();

export const SelectMenuContextProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState();

  return (
    <SelectMenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </SelectMenuContext.Provider>
  );
};


export default SelectMenuContext;
