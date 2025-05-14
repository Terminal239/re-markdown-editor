import { db } from "../config/dexie";
import { Node, SidebarAction } from "../types/types";
import { getDocumentInstance, getFolderInstance } from "./helper";
import { resetEditing, resetSelectedNode, setEditing, setSelectedNode } from "./state";

const getNodes = async (parentId?: number) => {
  const nodes = await db.nodes.filter((file) => file.parentId === parentId).toArray();
  return nodes;
};

const createNode = async (type: Node["type"], id?: number) => {
  await db.transaction("rw", db.nodes, db.appState, async () => {
    let node: Node;
    switch (type) {
      case "FILE":
        node = getDocumentInstance(id);
        break;
      case "FOLDER":
        node = getFolderInstance(id);
        break;
    }
    await db.nodes.add(node);

    if (type === "FILE") await setEditing(node);
    await setSelectedNode(node);
  });
};

const updateNode = async (node: Node) => {
  await db.nodes.update(node.id, { ...node, updatedAt: new Date() });
};

const deleteHelper = async (id: number, type: Node["type"]) => {
  await db.transaction("rw", db.nodes, async () => {
    if (type === "FOLDER") await db.nodes.where("parentId").equals(id).delete();
    await db.nodes.delete(id);
  });
};

const deleteNode = async ({ node }: SidebarAction) => {
  await db.transaction("rw", db.nodes, db.appState, async () => {
    await deleteHelper(node.id, node.type);

    const editing = await db.appState.get("editing");
    if (node.id === editing?.value?.id) await resetEditing();

    await resetSelectedNode();
  });
};

export { createNode, deleteNode, getNodes, updateNode };
