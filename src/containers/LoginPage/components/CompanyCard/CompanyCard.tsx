import React from "react";
import { SvgCompany } from "../../../../assets/svg";
import { BoxShadow } from "../../../../components";
import "./CompanyCard.scss";

export const CompanyCard: React.FC<ICompanyCard> = ({
  title,
  onClick,
  isSelected,
}) => {
  return (
    <BoxShadow
      className={
        isSelected ? "company-card company-card--selected" : "company-card"
      }
      onClick={onClick}
    >
      <SvgCompany />
      <p>{title}</p>
    </BoxShadow>
  );
};
