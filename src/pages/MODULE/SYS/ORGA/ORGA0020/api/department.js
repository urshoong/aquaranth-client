import request from "@utils/axiosUtil";

export const getTree = async (companyNo, depth, upperDeptNo) => {
  const { data } = await request.get(`/dept2/findTree/${companyNo}/${depth}/${upperDeptNo}`);
  return data;
};

export const findCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};
