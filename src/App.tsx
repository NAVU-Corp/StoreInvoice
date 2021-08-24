import React, { useReducer } from "react";
import "./App.scss";
import { Routers } from "./routers";
import {
  CompanyContext,
  companyReducer,
  initialCompanyState,
} from "./store/reducers";

export const App = () => {
  const [state, dispatch] = useReducer(companyReducer, initialCompanyState);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      <Routers />
    </CompanyContext.Provider>
  );
};
