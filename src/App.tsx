import React, { useReducer } from "react";
import "./App.scss";
import { Routers } from "./routers";
import {
  CounterContext,
  counterReducer,
  initialCounterState,
} from "./store/reducers";

export const App = () => {
  const [state, dispatch] = useReducer(counterReducer, initialCounterState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Routers />
    </CounterContext.Provider>
  );
};
