import { db, Document } from "../../config/dexie";

const getDocumentInstance = (parentId?: number): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "DOCUMENT",
});

const createDocument = async (id?: number) => {
  await db.transaction("rw", db.files, db.appState, async () => {
    const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

    const documentId = await db.files.add(getDocumentInstance(activeFolderId));
    await db.appState.update("activeFileId", { key: "activeFileId", value: documentId });
    await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: documentId });
  });
};

const saveDocument = async (document: Document) => {
  await db.files.update(document.id, { ...document, updatedAt: new Date() });
};

const selectDocument = async (id: number) => {
  await db.transaction("rw", db.appState, async () => {
    await db.appState.update("activeFileId", { key: "activeFileId", value: id });
    db.appState.update("sidebarDeleteId", {
      key: "sidebarDeleteId",
      value: {
        type: "DOCUMENT",
        id,
      },
    });
  });
};

const deleteDocument = async (id: number) => {
  await db.transaction("rw", db.files, db.appState, async () => {
    await db.files.delete(id);
    await db.appState.update("activeFileId", { key: "activeFileId", value: -1 });
  });
};

export { createDocument, deleteDocument, getDocumentInstance, saveDocument, selectDocument };
