import React from "react";
import { SvgCompany } from "../../../../assets/svg";
import { BoxShadow } from "../../../../components";
import "./CompanyCard.scss";

export const CompanyCard = () => {
  return (
    <BoxShadow className="company-card">
      <SvgCompany />
      <p>Công Ty A</p>
    </BoxShadow>
  );
};
