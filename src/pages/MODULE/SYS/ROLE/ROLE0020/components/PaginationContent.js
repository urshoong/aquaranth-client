import React from "react";
import styled, { css } from "styled-components";

const PaginationContent = ({ response, pageClickHandler, selectChangeHandler }) => {
  return (
    <PaginationWrap>
      <Pagination>
        <PageBtn className="pageBtn prev first" data-page={response.first}><PageImage src="/images/btn-arrow-first.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn prev" data-page={response.prev}><PageImage src="/images/btn-arrow-prev.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        {
          response.start > 0
          && [...new Array((response.end - response.start + 1) < response.pageLimit
            ? response.end - response.start + 1 : response.pageLimit)]
            .map((i, idx) => (response.start + idx))
            .map((num) => <PageBtn key={num} className={`pageBtn page ${response.pageRequestDTO?.page === num ? "active" : ""}`} onClick={pageClickHandler} aria-hidden="true" data-page={num}>{num}</PageBtn>)
        }
        <PageBtn className="pageBtn next" data-page={response.next}><PageImage src="/images/btn-arrow-next.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageBtn className="pageBtn next last" data-page={response.last}><PageImage src="/images/btn-arrow-last.png" alt="" onClick={pageClickHandler} aria-hidden="true" /></PageBtn>
        <PageSizeSelect value={response.size} onChange={selectChangeHandler}>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </PageSizeSelect>
      </Pagination>
    </PaginationWrap>
  );
};

export default PaginationContent;

export const PaginationWrap = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
`;

export const Pagination = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const PageBtn = styled.li`
  //&.pageBtn{
    height: 28px;
    width: 28px;
    line-height: 20px;
    padding: 0 5px;
    border: 2px solid #e6e6e6;
    background-color: white;
    font-size: 1.2em;
    font-weight: bold;
    margin: 2px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  //}
  &.pageBtn.page{
    border: 0;
    background-color: transparent;
    margin: 4px 5px;
  }
  &.pageBtn.page.active{
    color: #46a3fb;
    
    
  }
`;

export const PageImage = styled.img`
  padding: 0.5em;
`;

export const PageSizeSelect = styled.select`
  height: 28px;
  width: 60px;
  line-height: 20px;
  padding: 0 5px;
  border: 2px solid #e6e6e6;
  background-color: white;
  font-size: 1.3em;
  font-weight: bold;
  margin: 2px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
`;
