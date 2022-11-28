import request from "@utils/axiosUtil";

/**
 * 바로 밑의 하위 부서를 조회합니다.
 * @param companyNo
 * @param depth
 * @param upperDeptNo
 * @returns {Promise<any>}
 */
export const getTree = async (companyNo, depth, upperDeptNo) => {
  const { data } = await request.get(`/dept2/findTree/${companyNo}/${depth}/${upperDeptNo}`);
  return data;
};

/**
 * 회사 리스트를 조회합니다.
 * @returns {Promise<any>}
 */
export const findCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

/**
 * 부서정보를 수정합니다.
 * @param deptNo
 * @returns {Promise<any>}
 */
export const modifyDept = async (deptDTO) => {
  console.dir(deptDTO);
  const { data } = await request.put(`/dept2/${deptDTO.deptNo}`, deptDTO);
  return data;
};

/**
 * 부서를 삭제합니다.
 * @param deptNo
 * @returns {Promise<any>}
 */
export const deleteDept = async (deptNo) => {
  const { data } = await request.delete(`dept2/${deptNo}`);
  return data;
};

/**
 * 부서를 등록합니다.
 */
export const registerDept = async (deptDTO) => {
  const { data } = await request.post("dept2", deptDTO);
  return data;
};
