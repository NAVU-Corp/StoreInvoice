import React from "react";
import { SvgArrowLeft, SvgArrowRight } from "../../../../assets/svg";
import "./Pagination.scss";

export const Pagination = () => {
  return (
    <div className="pagination">
      <div className="pagination__btn">
        <SvgArrowLeft />
      </div>
      {Array.from(Array(5).keys()).map((_, i) => {
        return (
          <div key={i} className="pagination__btn">
            {i + 1}
          </div>
        );
      })}
      <div className="pagination__btn">
        <SvgArrowRight />
      </div>
    </div>
  );
};
