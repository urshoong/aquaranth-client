import request, { setToken } from "@utils/axiosUtil";
import { REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, removeCookie } from "@utils/cookieUtil";

export const GET_ROUTES = async () => {
  return request.get("/menu/list");
};

export const GET_MENU_LIST = async (menu, keyword) => {
  let url = "/menu/list?";

  if (typeof menu === "number") {
    url += (`menuNo=${menu}`);
  }

  if (typeof menu === "string") {
    url += (`menuCode=${menu}`);
  }

  if (keyword) {
    url += (`&keyword=${keyword}`);
  }

  return request.get(url);
};

export const PUT_UPDATE_MENU = async (updateMenuDto) => {
  return request.put("/menu/update", updateMenuDto);
};

export const PUT_UPDATE_MENUICON = async (updateMenuDto) => {
  return request.put("/menu/updateicon", updateMenuDto);
};

export const CHECK_LOGIN = async () => {
  await request.get(TOKEN_REFRESH_PATH, { headers: {
    Authorization: `Bearer ${getCookie(REFRESH_TOKEN)}`,
  } }).then((res) => {
    setToken(res.data);
  }).catch(() => {
    removeCookie(REFRESH_TOKEN);
  });
};

export const POST_LOGIN = async (loginFormData) => {
  return request.post("/login", loginFormData);
};
