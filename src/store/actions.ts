export enum ActionKind {
  Increase = "INCREASE",
  Decrease = "DECREASE",
}

export type Action = {
  type: ActionKind;
  payload: number;
};

export const increaseAction: Action = {
  type: ActionKind.Increase,
  payload: 1,
};

export const decreaseAction: Action = {
  type: ActionKind.Decrease,
  payload: 1,
};
