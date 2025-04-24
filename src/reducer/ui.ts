// ui-context.tsx

import { saveToLocalStorage } from "../utils/localStorage";

export interface UIState {
  isSidebarOpen: boolean;
  isEditorExpanded: boolean;
}

export type UIAction = { type: "toggle-sidebar" } | { type: "toggle-editor" };

export const initialUIState: UIState = {
  isSidebarOpen: false,
  isEditorExpanded: true,
};

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "toggle-sidebar": {
      const newState: UIState = { ...state, isSidebarOpen: !state.isSidebarOpen };
      saveToLocalStorage<UIState>("uiState", newState);
      return newState;
    }
    case "toggle-editor": {
      const newState: UIState = { ...state, isEditorExpanded: !state.isEditorExpanded };
      saveToLocalStorage<UIState>("uiState", newState);
      return newState;
    }
    default:
      return state;
  }
};
