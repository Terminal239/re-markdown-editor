import { db } from "../config/dexie";
import { Folder } from "../types/types";
import { getFolderInstance } from "./helper";
import {
  resetActiveFolderId,
  setActiveFolderId,
  setSidebarDeleteId,
  setSidebarRenameId,
} from "./state";

const getFolderTree = async (parentId?: number) => {
  const files = await db.files.filter((file) => file.parentId === parentId).toArray();
  const folders = await db.folders.filter((folder) => folder.parentId === parentId).toArray();

  return [...files, ...folders];
};

const createFolder = async (id?: number) => {
  await db.transaction("rw", db.folders, db.appState, async () => {
    const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

    const folderId = await db.folders.add(getFolderInstance(activeFolderId));
    await setSidebarRenameId(folderId);
    await setActiveFolderId(folderId);
  });
};

const selectFolder = async (id: number) => {
  await db.transaction("rw", db.appState, async () => {
    await setActiveFolderId(id);
    await setSidebarDeleteId("FOLDER", id);
  });
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
  await db.transaction("rw", db.folders, db.files, db.appState, async () => {
    await deleteHelper(id);
    await resetActiveFolderId();
  });
};

export { createFolder, deleteFolder, getFolderTree, saveFolder, selectFolder };
