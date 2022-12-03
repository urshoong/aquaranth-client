import request from "@utils/axiosUtil";
import { menuQueryString } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";

const NORMAL_URL = "/menu";

/**
 * 메뉴를 복수건 조회합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 * @author 김민준
 */
export const GET_MENULIST = async (query, keyword) => {
  const queryUrl = `${NORMAL_URL}?`;

  const queryString = menuQueryString(queryUrl, query, keyword);

  return request.get(`${queryString}`);
};
/**
 * 클라이언트 앱 초기화용 메소드입니다.
 * 메뉴에 맞는 모듈 경로와 메뉴번호를 반환합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 * @author 김민준
 */
export const GET_INIT_ROUTES = async () => {
  return request.get(`${NORMAL_URL}/init`);
};
