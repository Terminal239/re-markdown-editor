import { Node } from "../types/types";

const getDocumentInstance = (parentId?: number): Node => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "FILE",
});

const getFolderInstance = (parentId?: number): Node => ({
  id: +(Math.random() * 10000000).toFixed(0),
  name: "untitled",
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: parentId ? parentId : -1,
  type: "FOLDER",
});

export { getDocumentInstance, getFolderInstance };
