import { Document, Folder } from "../types/types";

const getDocumentInstance = (parentId?: number): Document => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "DOCUMENT",
});

const getFolderInstance = (parentId?: number): Folder => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "FOLDER",
});

export { getDocumentInstance, getFolderInstance };
