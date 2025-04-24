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

export const documentReducer = (state: State, action: StateAction): State => {
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
    case "save":
      return {
        ...state,
        editing: action.document,
        documents: state.documents.map((document) => (document.id === action.document.id ? action.document : document)),
      };
    case "delete":
      if (state.documents.length === 1)
        return {
          ...state,
          editing: action.document,
          documents: [action.document],
        };
      else
        return {
          ...state,
          editing: action.document,
          documents: state.documents.filter((document) => document.id !== state.editing.id),
        };
    case "edit":
      return {
        ...state,
        editing: {
          ...action.document,
          updatedAt: new Date(),
        },
      };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
