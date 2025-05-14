// import { db } from "../config/dexie";
// import { Node } from "../types/types";
// import { getFolderInstance } from "./helper";
// import {} from "./state";

// const getFolderTree = async (parentId?: number) => {
//   const nodes = await db.nodes.filter((file) => file.parentId === parentId).toArray();
//   return nodes;
// };

// const createFolder = async (id?: number) => {
//   await db.transaction("rw", db.nodes, db.appState, async () => {
//     const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

//     const folderId = await db.nodes.add(getFolderInstance(activeFolderId));
//     await setSidebarRenameId(folderId);
//     await setActiveFolderId(folderId);
//   });
// };

// const selectFolder = async (id: number) => {
//   await db.transaction("rw", db.appState, async () => {
//     await setActiveFolderId(id);
//     await setSidebarDeleteId("FOLDER", id);
//   });
// };

// const saveFolder = async (folder: Node) => {
//   await db.nodes.update(folder.id, { ...folder, updatedAt: new Date() });
// };

// const deleteHelper = async (id: number) => {
//   await db.transaction("rw", db.nodes, async () => {
//     const nodes = await db.nodes.where("parentId").equals(id).toArray();
//     await Promise.all(nodes.map(async (folder) => await deleteHelper(folder.id)));

//     await db.nodes.where("parentId").equals(id).delete();
//     await db.nodes.delete(id);
//   });
// };

// const deleteFolder = async (id: number) => {
//   await db.transaction("rw", db.nodes, db.appState, async () => {
//     await deleteHelper(id);
//     await resetActiveFolderId();
//   });
// };

// // export { createFolder, deleteFolder, getFolderTree, saveFolder, selectFolder };
