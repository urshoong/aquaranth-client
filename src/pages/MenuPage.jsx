import React, {useEffect} from "react";
import request from "@utils/axiosUtil";

const MenuPage = () => {

  useEffect(() => {
    request.get("/menu")
      .then((res) => {
        console.log(res.data)})
  },[])

  return (
    <div>
      Menu
    </div>
  )
}

export default MenuPage;
