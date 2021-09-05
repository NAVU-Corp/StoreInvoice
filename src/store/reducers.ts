import { createContext } from "react";
import { Action, ActionKind } from "./actions";

type CompanyState = {
  companyData: IResCompany;
  filterData: IResStepFilter;
};

export const initialCompanyState: CompanyState = {
  companyData: {
    address: "",
    createdate: 0,
    district: "",
    email: "",
    fax: "",
    id: 0,
    name: "",
    phone: "",
    province: "",
    status: 10,
    taxcode: "",
    updatedate: 0,
  },
  filterData: {
    valueType: 1,
    groupMonth: 10,
    month: (new Date()).getMonth() + 1,
    year: (new Date()).getFullYear(),
    typeInvoice: 10,
  },
};

export const CompanyContext = createContext<{
  state: CompanyState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialCompanyState,
  dispatch: () => undefined,
});

export function companyReducer(
  state: CompanyState,
  action: Action
): CompanyState {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.SAVE_DATA_COMPANY:
      return {
        ...state,
        companyData: payload as IResCompany,
      };
    case ActionKind.DELETE_DATA_COMPANY:
      return {
        ...state,
        companyData: initialCompanyState.companyData,
      };
    case ActionKind.SAVE_STEP_FILTER:
      return {
        ...state,
        filterData: payload as IResStepFilter,
      };
  }
}
