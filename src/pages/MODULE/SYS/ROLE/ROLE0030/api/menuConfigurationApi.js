import request from "@utils/axiosUtil";

const CONFIGURATION_URL = "/menu/config";

/**
 * 메뉴 공통 쿼리스트링을 반환합니다.
 * @param url
 * @param query
 * @param keyword
 * @return {*}
 * @author 김민준
 */
export const menuQueryString = (url, query, keyword) => {
  let queryString = url;

  if (query !== false && typeof query === "number") {
    queryString += (`menuNo=${query}`);
  }

  if (query !== false && typeof query === "string") {
    queryString += (`menuCode=${query}`);
  }

  if (keyword) {
    queryString += (`&keyword=${keyword}`);
  }
  return queryString;
};


/**
 * 메뉴를 단건 조회합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_CONFIG_MENU = async (menu, keyword) => {
  const queryUrl = `${CONFIGURATION_URL}?`;

  const query = menuQueryString(queryUrl, menu, keyword);

  return request.get(`${query}`);
};

/**
 * 메뉴를 복수건 조회합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_CONFIG_MENULIST = async (menu, keyword) => {
  const queryUrl = `${CONFIGURATION_URL}/list?`;

  const query = menuQueryString(queryUrl, menu, keyword);

  return request.get(`${query}`);
};


export const GET_CONFIG_TREE_MENULIST = async (menu, keyword) => {
  const queryUrl = `${CONFIGURATION_URL}/list/under?`;

  const query = menuQueryString(queryUrl, menu, keyword);

  return request.get(`${query}`);
};

/**
 * 메뉴를 상세조회 합니다.
 * @param query
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const GET_CONFIG_MENUDETAIL = async (query) => {
  let url = `${CONFIGURATION_URL}/detail?`;

  if (typeof query === "number") {
    url += (`menuNo=${query}`);
  }

  if (typeof query === "string") {
    url += (`menuCode=${query}`);
  }
  return request.get(`${url}`);
};

/**
 * 메뉴를 정보를 업데이트 합니다.
 * @param updateMenuDto
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const PUT_CONFIG_MENU = async (updateMenuDto) => {
  return request.put(`${CONFIGURATION_URL}/update`, updateMenuDto);
};

/**
 * 메뉴 아이콘을 업데이트 합니다.
 * @param updateMenuDto
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const PUT_CONFIG_MENUICON = async (updateMenuDto) => {
  return request.put(`${CONFIGURATION_URL}/update/icon`, updateMenuDto);
};

/**
 * 메뉴를 삭제합니다.
 * @param query
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const DELETE_CONFIG_MENU = async (query) => {
  let url = `${CONFIGURATION_URL}/delete?`;

  if (typeof query === "number") {
    url += (`menuNo=${query}`);
  }

  if (typeof query === "string") {
    url += (`menuCode=${query}`);
  }
  return request.delete(`${url}`);
};
