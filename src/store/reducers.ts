import { createContext } from "react";
import { Action, ActionKind } from "./actions";

type State = {
  value: number;
};

export const initialCounterState: State = {
  value: 0,
};

export const CounterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialCounterState,
  dispatch: () => undefined,
});

export function counterReducer(state: State, action: Action): State {
  const { type, payload } = action;

  // First, we figure out what action
  // has been fired:
  switch (type) {
    // Then, for each action
    // we describe an according state update.
    // For example, for increasing action
    // we add the number from payload
    // to the current value:
    case ActionKind.Increase:
      return {
        ...state,
        value: state.value + action.payload,
      };

    // For decreasing action,
    // we subtract the payload number
    // from the current value:
    case ActionKind.Decrease:
      return {
        ...state,
        value: state.value - action.payload,
      };

    // If the action is unknown
    // we return the current state:
    default:
      return state;
  }
}
