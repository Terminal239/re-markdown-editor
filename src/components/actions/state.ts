import { db } from "../../config/dexie";

const setSidebarRenameItem = async (id: number) => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: id });
};

const resetSidebarRenameItem = async () => {
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: -1 });
};

export { resetSidebarRenameItem, setSidebarRenameItem };
