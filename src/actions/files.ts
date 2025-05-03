import { db } from "../config/dexie";
import { Document } from "../types/types";
import { getDocumentInstance } from "./helper";
import { setActiveFileId, setSidebarDeleteId, setSidebarRenameId } from "./state";

const createDocument = async (id?: number) => {
  await db.transaction("rw", db.files, db.appState, async () => {
    const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

    const documentId = await db.files.add(getDocumentInstance(activeFolderId));
    await setActiveFileId(documentId);
    await setSidebarRenameId(documentId);
  });
};

const saveDocument = async (document: Document) => {
  await db.files.update(document.id, { ...document, updatedAt: new Date() });
};

const selectDocument = async (id: number) => {
  await db.transaction("rw", db.appState, async () => {
    await setActiveFileId(id);
    await setSidebarDeleteId("DOCUMENT", id);
  });
};

const deleteDocument = async (id: number) => {
  await db.transaction("rw", db.files, db.appState, async () => {
    await db.files.delete(id);
    await setActiveFileId(-1);
  });
};

export { createDocument, deleteDocument, getDocumentInstance, saveDocument, selectDocument };
