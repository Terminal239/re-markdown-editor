import { db } from "../../config/dexie";
import { deleteDocument } from "./files";
import { deleteFolder } from "./folders";

const setSidebarRenameItem = async (id: number) => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: id });
};

const resetSidebarRenameItem = async () => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: -1 });
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

export { deleteSidebarItem, resetSidebarDeleteId, resetSidebarRenameItem, setSidebarRenameItem };
