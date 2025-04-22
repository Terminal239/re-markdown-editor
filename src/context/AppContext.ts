import { createContext, Dispatch, useContext } from "react";
import { State, StateAction } from "../reducer/document";

export const StateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<Dispatch<StateAction> | undefined>(undefined);

export const useAppState = (): State => {
  const ctx = useContext(StateContext);
  if (ctx === undefined) {
    throw new Error("useAppState must be used within an <AppProvider>");
  }
  return ctx;
};

export const useAppDispatch = (): Dispatch<StateAction> => {
  const ctx = useContext(DispatchContext);
  if (ctx === undefined) {
    throw new Error("useAppDispatch must be used within an <AppProvider>");
  }
  return ctx;
};
