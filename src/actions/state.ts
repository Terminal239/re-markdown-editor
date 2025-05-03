import { db } from "../config/dexie";
import { deleteDocument } from "./files";
import { deleteFolder } from "./folders";

const setSidebarRenameId = async (id: number) => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: id });
};

const resetSidebarRenameId = async () => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: -1 });
};

const setSidebarDeleteId = async (type: "DOCUMENT" | "FOLDER" | "NULL", id: number) => {
  await db.appState.update("sidebarDeleteId", {
    key: "sidebarDeleteId",
    value: {
      type,
      id,
    },
  });
};

const resetSidebarDeleteId = async () => {
  await db.appState.update("sidebarDeleteId", {
    key: "sidebarDeleteId",
    value: {
      type: "NULL",
      id: -1,
    },
  });
};

const setActiveFolderId = async (id: number) => {
  await db.appState.update("activeFolderId", { key: "activeFolderId", value: id });
};

const resetActiveFolderId = async () => {
  await db.appState.update("activeFolderId", { key: "activeFolderId", value: -1 });
};

const setActiveFileId = async (id: number) => {
  await db.appState.update("activeFileId", { key: "activeFileId", value: id });
};

const deleteSidebarItem = async (itemToDelete: {
  type: "FOLDER" | "DOCUMENT" | "NULL";
  id: number;
}) => {
  console.log(itemToDelete);
  switch (itemToDelete.type) {
    case "DOCUMENT":
      deleteDocument(itemToDelete.id);
      break;
    case "FOLDER":
      deleteFolder(itemToDelete.id);
      break;
    case "NULL":
    default:
      return;
  }
};

export {
  deleteSidebarItem,
  resetActiveFolderId,
  resetSidebarDeleteId,
  resetSidebarRenameId,
  setActiveFileId,
  setActiveFolderId,
  setSidebarDeleteId,
  setSidebarRenameId,
};
