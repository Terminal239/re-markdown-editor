interface AppStateEntry {
  key: string; // Primary key
  value: any;
}

interface Node {
  id: number;
  name: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  type: "FILE" | "FOLDER";
  parentId?: number;
}

interface SidebarAction {
  node: Node;
  action: "RENAME" | "DELETE" | undefined;
}

export { AppStateEntry, Node, SidebarAction };
