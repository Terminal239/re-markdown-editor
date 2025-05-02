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
  const activeFolderId = id ? id : (await db.appState.get("activeFolderId"))?.value;

  const documentId = await db.files.add(getDocumentInstance(activeFolderId));
  await db.appState.update("activeFileId", { key: "activeFileId", value: documentId });
  await db.appState.update("sidebarRenameId", { key: "sidebarRenameId", value: documentId });
};

const saveDocument = async (document: Document) => {
  await db.files.update(document.id, { ...document, updatedAt: new Date() });
};

const selectDocument = async (id: number) => {
  await db.appState.update("activeFileId", { key: "activeFileId", value: id });
};

const deleteDocument = async (id: number) => {
  await db.files.delete(id);

  const documents = await db.files.toArray();
  const folders = await db.folders.toArray();

  if (documents.length === 0 && folders.length === 0) createDocument();
  else if (documents.length !== 0) selectDocument(documents[0].id);
  else selectDocument(-1);
};

export { createDocument, deleteDocument, getDocumentInstance, saveDocument, selectDocument };
