import request from "@utils/axiosUtil";

export const getTreeModal = async (companyNo) => {
  const { data } = await request.get(`/dept2/list/${companyNo}`);
  return data;
};
