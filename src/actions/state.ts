import { db } from "../config/dexie";
import { Node, SidebarAction } from "../types/types";

const setEditing = async (node: Node) => {
  await db.transaction("rw", db.appState, async () => {
    await db.appState.update("editing", { key: "editing", value: node });
    await db.appState.update("selectedNode", {
      key: "selectedNode",
      value: {
        ...node,
        isRenaming: false,
      },
    });
  });
};

const resetEditing = async () => {
  await db.appState.update("editing", { key: "editing", value: null });
};

const setSelectedNode = async (node: Node) => {
  await db.transaction("rw", db.appState, async () => {
    await db.appState.update("selectedNode", {
      key: "selectedNode",
      value: {
        ...node,
        isRenaming: false,
      },
    });
  });
};

const resetSelectedNode = async () => {
  await db.appState.update("selectedNode", {
    key: "selectedNode",
    value: null,
  });
};

const setSidebarAction = async (node: Node, action: SidebarAction["action"]) => {
  await db.transaction("rw", db.appState, async () => {
    await db.appState.update("sidebarAction", {
      key: "sidebarAction",
      value: {
        node,
        action,
      },
    });
  });
};

const resetSidebarAction = async () => {
  await db.appState.update("sidebarAction", {
    key: "sidebarAction",
    value: null,
  });
};

export {
  resetEditing,
  resetSelectedNode,
  resetSidebarAction,
  setEditing,
  setSelectedNode,
  setSidebarAction,
};
