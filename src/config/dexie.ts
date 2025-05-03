import Dexie, { EntityTable, Table } from "dexie";
import { getDocumentInstance } from "../components/actions/files";

interface Document {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "DOCUMENT";
  parentId?: number;
}

interface Folder {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  type: "FOLDER";
  parentId?: number;
}

type FileTree = Document | Folder;

interface AppStateEntry {
  key: string; // Primary key
  value: any;
}

class AppDatabase extends Dexie {
  files!: EntityTable<Document, "id">;
  folders!: EntityTable<Folder, "id">;
  appState!: Table<AppStateEntry, string>;

  constructor() {
    super("_db");
    this.version(1).stores({
      files: "++id, name, content, createdAt, updatedAt, parentId, type",
      folders: "++id, name, createdAt, updatedAt, parentId, type",
      appState: "key",
    });
  }
}

const db = new AppDatabase();
db.on("populate", async () => {
  const document = getDocumentInstance();
  await db.files.add(document);
  await db.appState.add({ key: "activeFileId", value: document.id });
  await db.appState.add({ key: "activeFolderId", value: -1 });
  await db.appState.add({ key: "sidebarRenameId", value: -1 });
  await db.appState.add({
    key: "sidebarDeleteId",
    value: {
      type: "NULL",
      id: -1,
    },
  });
});

export { db };
export type { AppStateEntry, Document, FileTree, Folder };
