import request from "@utils/axiosUtil";

const AUTH_URL = "/menu/auth";

const NORMAL_URL = "/menu";

/**
 * 리액트 모듈용
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const INIT_ROUTES = async () => {
  return request.get(`${NORMAL_URL}/init`);
};

/**
 * 레디스에 저장된 메뉴리스트
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_CACHED_ROUTES = async () => {
  return request.get(`${NORMAL_URL}/cache/list`);
};

/**
 * 한건 이상 메뉴 조회
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_MENU_LIST = async (menu, keyword) => {
  let url = `${AUTH_URL}/list?`;

  if (typeof menu === "number") {
    url += (`menuNo=${menu}`);
  }

  if (typeof menu === "string") {
    url += (`menuCode=${menu}`);
  }

  if (keyword) {
    url += (`&keyword=${keyword}`);
  }

  return request.get(`${url}`);
};

/**
 * 단건 메뉴 조회
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_MENU = async (menu, keyword) => {
  let url = `${AUTH_URL}?`;

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
  return request.put(`${AUTH_URL}/update`, updateMenuDto);
};

export const PUT_UPDATE_MENUICON = async (updateMenuDto) => {
  return request.put(`${AUTH_URL}/updateicon`, updateMenuDto);
};
