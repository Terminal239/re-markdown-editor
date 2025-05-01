import Dexie, { EntityTable, Table } from "dexie";

interface Document {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "DOCUMENT";
}

interface AppStateEntry {
  key: string; // Primary key
  value: any;
}

class AppDatabase extends Dexie {
  files!: EntityTable<Document, "id">;
  appState!: Table<AppStateEntry, string>;

  constructor() {
    super("_db");
    this.version(1).stores({
      files: "++id, name, content, createdAt, updatedAt, type",
      appState: "key",
    });
  }
}

const getDocumentInstance = (): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "Untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  type: "DOCUMENT",
});

const createDocument = async () => {
  const documentId = await db.files.add(getDocumentInstance());
  await db.appState.update("activeFileId", { key: "activeFileId", value: documentId });
};

const saveDocument = async (document: Document) => {
  await db.files.update(document.id, { ...document, updatedAt: new Date() });
};

const selectDocument = async (id: number) => {
  const document = await db.files.get(id);
  await db.appState.update("activeFileId", { key: "activeFileId", value: document?.id });
};

const deleteDocument = async (id: number) => {
  await db.files.delete(id);

  const documents = await db.files.toArray();
  if (documents.length === 0) createDocument();
  else selectDocument(documents[0].id);
};

const db = new AppDatabase();
db.on("populate", async () => {
  const document = getDocumentInstance();
  await db.files.add(document);
  await db.appState.add({ key: "activeFileId", value: document.id });
});

export { createDocument, db, deleteDocument, saveDocument, selectDocument };
export type { AppStateEntry, Document };
