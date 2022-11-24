import React from "react";
import request from "../../../../../../utils/axiosUtil";
import { validate } from "@babel/core/lib/config/validation/options";

// 해당 정렬에 맞는 회사 일부정보 리스트 요청
const getSortCompany = async (companySort) => {
  const { data } = await request.get(`/company/sort/${companySort}`);

  return data;
}

// 총 회사 건 수 component
function CompanyCount({ list, setList }) {

  // 정렬한 회사 정보 리스트를 불러올 handler
  const changeCompanySort = (e) => {
    const { value } = e.target
    console.log("정렬값 : ", value);
    getSortCompany(value).then((data) => {
      console.log("정렬된 회사 리스트 : ", data);
      setList(data);
    });
  };

  return (
    <div className="CompanySortDiv">
      <div>
        <span>회사</span>
        <span className="companyCountSpan">{list.length}</span>
        <span>건</span>
      </div>
      <div>
        <select onChange={(e) => { changeCompanySort(e); }}>
          <option>정렬</option>
          <option value="companyNo">회사번호</option>
          <option value="companyName">회사명</option>
          <option value="ownerName">대표자명</option>
          <option value="companyUse">사용여부</option>
        </select>
      </div>
    </div>
  );
}

export default CompanyCount;
