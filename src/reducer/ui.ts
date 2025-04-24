// ui-context.tsx

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
    case "toggle-sidebar":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "toggle-editor":
      return { ...state, isEditorExpanded: !state.isEditorExpanded };
    default:
      return state;
  }
};
