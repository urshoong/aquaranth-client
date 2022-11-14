import React from "react";

function MenuItem({ menu }) {
  const { menuName, menuNo } = menu;
  return (
    <div>
      <input type="checkbox" value={menuNo} />
      {menuName}
    </div>
  );
}

export default MenuItem;
