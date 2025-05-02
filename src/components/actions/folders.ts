import { db, Folder } from "../../config/dexie";

const getFolderInstance = (parentId?: number): Folder => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "FOLDER",
});

const getFolderTree = async (parentId?: number) => {
  const files = await db.files.filter((file) => file.parentId === parentId).toArray();
  const folders = await db.folders.filter((folder) => folder.parentId === parentId).toArray();

  return [...files, ...folders];
};

const createFolder = async (id?: number) => {
  const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

  const folderId = await db.folders.add(getFolderInstance(activeFolderId));
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: folderId });
};

const selectFolder = async (id: number) => {
  await db.appState.update("activeFolderId", { key: "activeFolderId", value: id });
};

const saveFolder = async (folder: Folder) => {
  await db.folders.update(folder.id, { ...folder, updatedAt: new Date() });
};

const deleteHelper = async (id: number) => {
  await db.transaction("rw", db.files, db.folders, async () => {
    const folders = await db.folders.where("parentId").equals(id).toArray();
    await Promise.all(folders.map(async (folder) => await deleteHelper(folder.id)));

    await db.files.where("parentId").equals(id).delete();
    await db.folders.delete(id);
  });
};

const deleteFolder = async (id: number) => {
  await deleteHelper(id);
  await db.appState.update("activeFolderId", { key: "activeFolderId", value: -1 });
};

export { createFolder, deleteFolder, getFolderTree, saveFolder, selectFolder };
