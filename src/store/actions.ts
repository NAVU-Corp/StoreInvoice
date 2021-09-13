export enum ActionKind {
  SAVE_DATA_COMPANY = "SAVE_DATA_COMPANY",
  DELETE_DATA_COMPANY = "DELETE_DATA_COMPANY",
  SAVE_STEP_FILTER = "SAVE_STEP_FILTER",
}

export type Action = {
  type: ActionKind;
  payload: IResCompany | IResStepFilter;
};

export const doSaveCompanyData = (data: IResCompany): Action => {
  return {
    type: ActionKind.SAVE_DATA_COMPANY,
    payload: data,
  };
};

export const doSaveStepFilter = (data: IResStepFilter): Action => {
  return {
    type: ActionKind.SAVE_STEP_FILTER,
    payload: data,
  };
};