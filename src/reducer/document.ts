import { saveToLocalStorage } from "../utils/localStorage";

export interface Document {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface State {
  editing: Document;
  documents: Document[];
}

export interface StateAction {
  type: string;
  document: Document;
}

export type Action = StateAction | { type: "delete" } | { type: "save" };

export const createDocument = (): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "Untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const initialDocuments: Document[] = [createDocument()];

export const state: State = {
  editing: initialDocuments[0],
  documents: initialDocuments,
};

export const documentReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "create":
      return {
        ...state,
        editing: action.document,
        documents: state.documents.map((document) => (document.id === action.document.id ? state.editing : document)).concat(action.document),
      };
    case "select-document":
      return {
        ...state,
        documents: state.documents.map((document) => (document.id === state.editing.id ? state.editing : document)),
        editing: action.document,
      };
    case "save": {
      const updated: Document = {
        ...state.editing,
        updatedAt: new Date(),
      };
      const newState: State = {
        ...state,
        editing: updated,
        documents: state.documents.map((document) => (document.id === updated.id ? updated : document)),
      };
      saveToLocalStorage<State>("appState", newState);
      return newState;
    }
    case "delete": {
      let newState: State;
      if (state.documents.length === 1) {
        const newDocument: Document = createDocument();
        newState = {
          ...state,
          editing: newDocument,
          documents: [newDocument],
        };
      } else {
        const filtered: Document[] = state.documents.filter((document) => document.id !== state.editing.id);
        newState = {
          ...state,
          editing: filtered[0],
          documents: filtered,
        };
      }
      saveToLocalStorage<State>("appState", newState);
      return newState;
    }
    case "edit": {
      const newState: State = {
        ...state,
        editing: {
          ...action.document,
          updatedAt: new Date(),
        },
      };
      saveToLocalStorage<State>("appState", newState);
      return newState;
    }
    case "rename": {
      const newState: State = {
        ...state,
        editing: action.document,
        documents: state.documents.map((document) => (document.id === action.document.id ? action.document : document)),
      };
      saveToLocalStorage<State>("appState", newState);
      return newState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
