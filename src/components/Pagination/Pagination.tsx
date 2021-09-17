import React from "react";
import { SvgArrowLeft, SvgArrowRight } from "../../assets/svg";
import "./Pagination.scss";

export const Pagination: React.FC<IPagination> = ({
  totalPage,
  page,
  handleSelectNumber,
  onBack,
  onNext,
  isPDF,
}) => {
  const checkFocus = (i: number) => {
    if (isPDF) {
      if (i + 1 === page) {
        return "pagination__btn pagination__btn--blue";
      } else {
        return "pagination__btn";
      }
    } else {
      if (i === page) {
        return "pagination__btn pagination__btn--blue";
      } else {
        return "pagination__btn";
      }
    }
  };

  return (
    <div className="pagination">
      <div className="pagination__btn" onClick={onBack}>
        <SvgArrowLeft />
      </div>
      {Array.from(Array(totalPage).keys()).map((_, i) => {
        return (
          <div
            key={i}
            className={checkFocus(i)}
            onClick={() => {
              if (handleSelectNumber) {
                return handleSelectNumber(isPDF ? i + 1 : i);
              }
            }}
          >
            {i + 1}
          </div>
        );
      })}
      <div className="pagination__btn" onClick={onNext}>
        <SvgArrowRight />
      </div>
    </div>
  );
};
