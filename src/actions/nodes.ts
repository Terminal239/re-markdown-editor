import { db } from "../config/dexie";
import { Node, SidebarAction } from "../types/types";
import { getDocumentInstance, getFolderInstance } from "./helper";
import { resetEditing, resetSelectedNode, setEditing, setSelectedNode } from "./state";

const getNodes = async (parentId?: number) => {
  const nodes = await db.nodes.filter((file) => file.parentId === parentId).toArray();
  return nodes;
};

const createNode = async (type: Node["type"], parent: Node | null) => {
  let parentId = -1;
  if (parent !== undefined) parentId = parent?.type === "FOLDER" ? parent?.id : parentId;

  await db.transaction("rw", db.nodes, db.appState, async () => {
    let node: Node;
    switch (type) {
      case "FILE":
        node = getDocumentInstance(parentId);
        break;
      case "FOLDER":
        node = getFolderInstance(parentId);
        break;
    }

    while (true) {
      const isDuplicate = await checkForDuplicates(node);
      if (!isDuplicate) break;

      const value = node.name.charAt(node.name.length - 1);
      if (Number.isInteger(+value))
        node.name = node.name.slice(0, node.name.length - 1) + (+value + 1);
      else node.name += 1;
    }
    await db.nodes.add(node);

    if (type === "FILE") await setEditing(node);
    await setSelectedNode(node);
  });
};

const checkForDuplicates = async (node: Node) => {
  const found = await db.nodes.get({ name: node.name, type: node.type, parentId: node.parentId });
  return found !== undefined;
};

const updateNode = async (node: Node) => {
  await db.nodes.update(node.id, { ...node, updatedAt: new Date() });
};

const deleteHelper = async (id: number, type: Node["type"], editing: Node) => {
  await db.transaction("rw", db.nodes, async () => {
    if (type === "FOLDER") {
      const nodes = await db.nodes.where("parentId").equals(id).toArray();
      for (let i = 0; i < nodes.length; i++)
        if (nodes[i].type === "FOLDER") deleteHelper(nodes[i].id, "FOLDER", editing);

      await db.nodes.where("parentId").equals(id).delete();
    }

    if (id === editing?.parentId) await resetEditing();
    await db.nodes.delete(id);
  });
};

const deleteNode = async ({ node }: SidebarAction) => {
  await db.transaction("rw", db.nodes, db.appState, async () => {
    const editing = await db.appState.get("editing");
    await deleteHelper(node.id, node.type, editing?.value);

    if (node.id === editing?.value?.id) await resetEditing();
    await resetSelectedNode();
  });
};

export { checkForDuplicates, createNode, deleteNode, getNodes, updateNode };
