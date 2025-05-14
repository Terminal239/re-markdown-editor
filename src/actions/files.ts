// import { db } from "../config/dexie";
// import { Node } from "../types/types";
// import { getDocumentInstance } from "./helper";
// import { setActiveFileId, setSidebarDeleteId, setSidebarRenameId } from "./state";

// const createDocument = async (id?: number) => {
//   await db.transaction("rw", db.nodes, db.appState, async () => {
//     const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

//     const documentId = await db.nodes.add(getDocumentInstance(activeFolderId));
//     await setActiveFileId(documentId);
//     await setSidebarRenameId(documentId);
//   });
// };

// const saveDocument = async (document: Node) => {
//   await db.nodes.update(document.id, { ...document, updatedAt: new Date() });
// };

// const selectDocument = async (id: number) => {
//   await db.transaction("rw", db.appState, async () => {
//     await setActiveFileId(id);
//     await setSidebarDeleteId("FILE", id);
//   });
// };

// const deleteDocument = async (id: number) => {
//   await db.transaction("rw", db.nodes, db.appState, async () => {
//     await db.nodes.delete(id);
//     await setActiveFileId(-1);
//   });
// };

// // export { createDocument, deleteDocument, getDocumentInstance, saveDocument, selectDocument };
