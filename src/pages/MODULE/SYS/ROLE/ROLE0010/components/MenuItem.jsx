import React from "react";

function MenuItem({ menu, onChangeInputBox }) {
  const { menuName, menuNo, checked } = menu;
  return (
    <div>
      <input type="checkbox" value={menuNo} onChange={(e) => onChangeInputBox(e)} checked={checked} />
      {menuName}
    </div>
  );
}

export default MenuItem;
