import { saveToLocalStorage } from "../utils/localStorage";

export interface Folder {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  documents: FileTree[];
  type: "FOLDER";
}

export interface Document {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "DOCUMENT";
}

export type Action =
  | { type: "CREATE_FOLDER" }
  | { type: "SELECT_DOCUMENT"; document: Document }
  | { type: "EDIT_DOCUMENT"; content: string }
  | { type: "RENAME_DOCUMENT"; name: string }
  | { type: "CREATE_DOCUMENT" }
  | { type: "DELETE_DOCUMENT" }
  | { type: "SAVE_DOCUMENT" };

export type FileTree = Document | Folder;

export interface State {
  editing: Document;
  fileStructure: FileTree[];
}

export const createDocument = (): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "Untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  type: "DOCUMENT",
});

export const createFolder = (): Folder => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "Untitled",
  createdAt: new Date(),
  updatedAt: new Date(),
  documents: [],
  type: "FOLDER",
});

const initialDocuments: Document[] = [createDocument()];

const updateDocument = (document: Document): Document => {
  const updated = {
    ...document,
    updatedAt: new Date(),
  };

  return updated;
};

const updateFileStructure = (documents: FileTree[], document: Document): FileTree[] => {
  const index = documents.findIndex((item) => item.id === document.id);
  if (index === -1) documents.concat(createDocument());
  else documents[index] = document;

  return documents;
};

export const state: State = {
  editing: initialDocuments[0],
  fileStructure: initialDocuments,
};

export const documentReducer = (state: State, action: Action): State => {
  let newEditing: Document = state.editing;
  let newDocuments: FileTree[] = state.fileStructure;

  switch (action.type) {
    case "CREATE_FOLDER":
      newDocuments = state.fileStructure.concat(createFolder());
      break;
    case "CREATE_DOCUMENT":
      newEditing = createDocument();
      newDocuments = updateFileStructure(state.fileStructure, state.editing).concat(newEditing);
      break;
    case "SELECT_DOCUMENT":
      newEditing = action.document;
      newDocuments = updateFileStructure(state.fileStructure, updateDocument(state.editing));
      break;
    case "SAVE_DOCUMENT": {
      newEditing = updateDocument(state.editing);
      newDocuments = updateFileStructure(state.fileStructure, newEditing);
      break;
    }
    case "DELETE_DOCUMENT":
      if (state.fileStructure.length === 1) {
        const newDocument: Document = createDocument();
        newDocuments = [newDocument];
        newEditing = newDocument;
      } else {
        newDocuments = state.fileStructure.filter((document) => document.id !== state.editing.id);
        newEditing = newDocuments[0] as Document;
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
      newDocuments = updateFileStructure(state.fileStructure, newEditing);
      break;
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }

  const newState: State = {
    editing: newEditing,
    fileStructure: newDocuments,
  };

  saveToLocalStorage<State>("appState", newState);
  return newState;
};
