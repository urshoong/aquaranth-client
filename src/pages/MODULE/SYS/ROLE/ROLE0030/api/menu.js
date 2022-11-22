import request from "@utils/axiosUtil";

export const GET_ROUTES = async () => {
  return request.get("/menu");
};

export const PUT_UPDATE_MENU = async (updateMenuDto) => {
  return request.put("/menu/update", updateMenuDto);
};
