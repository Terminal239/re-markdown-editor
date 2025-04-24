import { createContext, Dispatch, useContext } from "react";
import { UIAction, UIState } from "../reducer/ui";

export const UIContext = createContext<UIState | undefined>(undefined);
export const UIDispatchContext = createContext<Dispatch<UIAction> | undefined>(undefined);

export const useUIState = (): UIState => {
  const ctx = useContext(UIContext);
  if (ctx === undefined) {
    throw new Error("useUIState must be used within an <AppProvider>");
  }
  return ctx;
};

export const useUIDispatch = (): Dispatch<UIAction> => {
  const ctx = useContext(UIDispatchContext);
  if (ctx === undefined) {
    throw new Error("useUIDispatch must be used within an <AppProvider>");
  }
  return ctx;
};
