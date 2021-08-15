import React, { useState } from "react";
import { SvgDropdown } from "../../assets/svg";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import "./Select.scss";

export const Select: React.FC<ISelect> = ({ error, placeholder }) => {
  const [isShowBody, setIsShowBody] = useState(false);
  return (
    <div className="select">
      <div
        className="select__header"
        onClick={() => setIsShowBody(!isShowBody)}
      >
        <p>{placeholder}</p>
        <SvgDropdown />
      </div>
      {isShowBody && (
        <div className="select__body">
          {[12, 12, 1, 2, 1, 12, 3].map((item, i) => {
            return (
              <div key={i} className="select__item">
                Option 1
              </div>
            );
          })}
        </div>
      )}
      <ErrorMessage error={error} />
    </div>
  );
};
