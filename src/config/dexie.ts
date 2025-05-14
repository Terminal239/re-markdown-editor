import Dexie, { EntityTable, Table } from "dexie";
import { getDocumentInstance } from "../actions/helper";
import { AppStateEntry, Node } from "../types/types";

class AppDatabase extends Dexie {
  nodes!: EntityTable<Node, "id">;
  appState!: Table<AppStateEntry, string>;

  constructor() {
    super("_db");
    this.version(1).stores({
      nodes: "++id, name, content, createdAt, updatedAt, parentId, type",
      appState: "key",
    });
  }
}

const db = new AppDatabase();

db.on("populate", async () => {
  const document = getDocumentInstance();

  await db.nodes.add(document);
  await db.appState.add({ key: "editing", value: null });
  await db.appState.add({ key: "selectedNode", value: null });
  await db.appState.add({ key: "sidebarAction", value: null });
});

export { db };
