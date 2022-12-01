import request from "@utils/axiosUtil";

const AUTH_URL = "/menu/auth";

const NORMAL_URL = "/menu";

/**
 * 리액트 모듈용
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_INIT_ROUTES = async () => {
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
 * 권한이 있는 유저가 들어갈 수 있는 메뉴 리스트
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_USER_MENULIST = async (menu, keyword) => {
  let url = `${NORMAL_URL}/list?`;

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
 * 한건 이상 메뉴 조회
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_MENULIST = async (menu, keyword) => {
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


export const GET_TREE_MENULIST = async (menuNo) => {
  let url = `${AUTH_URL}/tree/list?`;

  if (menuNo !== "gnb") {
    url += (`menuNo=${menuNo}`);
  } else {
    url += ("gnb=true");
  }

  return request.get(`${url}`);
};

/**
 * 트리에서 받은 메뉴번호를 이용하여 메뉴를 상세조회 합니다.
 * @param query
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_MENU_DETAIL = async (query) => {
  let url = `${AUTH_URL}/detail?`;

  if (typeof query === "number") {
    url += (`menuNo=${query}`);
  }

  if (typeof query === "string") {
    url += (`menuCode=${query}`);
  }
  return request.get(`${url}`);
};

export const DELETE_MENU = async (query) => {
  let url = `${AUTH_URL}/delete?`;

  if (typeof query === "number") {
    url += (`menuNo=${query}`);
  }

  if (typeof query === "string") {
    url += (`menuCode=${query}`);
  }
  return request.delete(`${url}`);
};
