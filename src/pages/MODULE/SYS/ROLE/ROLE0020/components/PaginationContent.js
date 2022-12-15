import React from "react";
import {
  Option,
  PageBtn,
  PageImage,
  PageSizeSelect,
  Pagination,
  PaginationWrap,
} from "./StyledCommon";
import ARROW_FIRST from "@styles/assets/pagination/btn-arrow-first.png";
import ARROW_LAST from "@styles/assets/pagination/btn-arrow-last.png";
import ARROW_NEXT from "@styles/assets/pagination/btn-arrow-next.png";
import ARROW_PREV from "@styles/assets/pagination/btn-arrow-prev.png";

const PaginationContent = ({ response, pageClickHandler, selectChangeHandler }) => {
  return (
    <PaginationWrap>
      <Pagination>
        <PageBtn className="pageBtn prev first" data-page={response.first}><PageImage src={ARROW_FIRST} alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn prev" data-page={response.prev}><PageImage src={ARROW_PREV} alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        {
          response.start > 0
          && [...new Array((response.end - response.start + 1) < response.pageLimit
            ? response.end - response.start + 1 : response.pageLimit)]
            .map((i, idx) => (response.start + idx))
            .map((num) => <PageBtn key={num} className={`pageBtn page ${response.pageRequestDTO?.page === num ? "active" : ""}`} onClick={pageClickHandler} aria-hidden="true" data-page={num}>{num}</PageBtn>)
        }
        <PageBtn className="pageBtn next" data-page={response.next}><PageImage src={ARROW_NEXT} alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn next last" data-page={response.last}><PageImage src={ARROW_LAST} alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageSizeSelect value={response.size} onChange={selectChangeHandler}>
          <Option>10</Option>
          <Option>20</Option>
          <Option>30</Option>
        </PageSizeSelect>
      </Pagination>
    </PaginationWrap>
  );
};

export default PaginationContent;

