import request from "@utils/axiosUtil";
import { menuQueryString } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import { MENU_API_PATH } from "@constants/common";

/**
 * 메뉴를 복수건 조회합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 * @author 김민준
 */
export const GET_MENULIST = async (query, keyword) => {
  const queryUrl = `${MENU_API_PATH}?`;

  const queryString = menuQueryString(queryUrl, query, keyword);

  return request.get(`${queryString}`);
};


export const GET_LOGIN_USER_INFORMATION = async () => {
  return request.get("/empinfo");
};
