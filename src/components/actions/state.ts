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

const deleteSidebarItem = async (item: { type: "FOLDER" | "DOCUMENT" | "NULL"; id: number }) => {
  console.log(item);
  switch (item.type) {
    case "DOCUMENT":
      deleteDocument(item.id);
      break;
    case "FOLDER":
      deleteFolder(item.id);
      break;
    case "NULL":
    default:
      return;
  }
};

export { deleteSidebarItem, resetSidebarDeleteId, resetSidebarRenameItem, setSidebarRenameItem };
