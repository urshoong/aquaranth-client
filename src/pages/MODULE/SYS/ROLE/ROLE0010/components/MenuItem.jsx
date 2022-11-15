import React from "react";

function MenuItem({ menu, onChangeInputBox }) {
  const { menuName, menuNo, menuCode } = menu;
  return (
    <div>
      <input type="checkbox" value={menuNo} onChange={(e) => onChangeInputBox(e)} />
      {menuName}
    </div>
  );
}

export default MenuItem;
