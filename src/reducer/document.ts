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

export type Action =
  | { type: "SELECT_DOCUMENT"; document: Document }
  | { type: "EDIT_DOCUMENT"; content: string }
  | { type: "RENAME_DOCUMENT"; name: string }
  | { type: "CREATE_DOCUMENT" }
  | { type: "DELETE_DOCUMENT" }
  | { type: "SAVE_DOCUMENT" };

export const createDocument = (): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "Untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const initialDocuments: Document[] = [createDocument()];

const updateDocument = (document: Document): Document => {
  const updated = {
    ...document,
    updatedAt: new Date(),
  };

  return updated;
};

const updateDocumentsArray = (documents: Document[], document: Document): Document[] => {
  const index = documents.findIndex((item) => item.id === document.id);
  if (index === -1) documents.concat(createDocument());
  else documents[index] = document;

  return documents;
};

export const state: State = {
  editing: initialDocuments[0],
  documents: initialDocuments,
};

export const documentReducer = (state: State, action: Action): State => {
  let newEditing: Document = state.editing;
  let newDocuments: Document[] = state.documents;

  switch (action.type) {
    case "CREATE_DOCUMENT":
      newEditing = createDocument();
      newDocuments = updateDocumentsArray(state.documents, state.editing).concat(newEditing);
      break;
    case "SELECT_DOCUMENT":
      newEditing = action.document;
      newDocuments = updateDocumentsArray(state.documents, state.editing);
      break;
    case "SAVE_DOCUMENT": {
      newEditing = updateDocument(state.editing);
      newDocuments = updateDocumentsArray(state.documents, newEditing);
      break;
    }
    case "DELETE_DOCUMENT":
      if (state.documents.length === 1) {
        const newDocument: Document = createDocument();
        newDocuments = [newDocument];
        newEditing = newDocument;
      } else {
        newDocuments = state.documents.filter((document) => document.id !== state.editing.id);
        newEditing = newDocuments[0];
      }
      break;
    case "EDIT_DOCUMENT": {
      newEditing.content = action.content;

      newEditing = updateDocument(newEditing);
      break;
    }
    case "RENAME_DOCUMENT": {
      newEditing.name = action.name;

      newEditing = updateDocument(newEditing);
      newDocuments = updateDocumentsArray(state.documents, newEditing);
      break;
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }

  const newState: State = {
    editing: newEditing,
    documents: newDocuments,
  };

  saveToLocalStorage<State>("appState", newState);
  return newState;
};
