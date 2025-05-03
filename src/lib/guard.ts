import { Document, FileTree, Folder } from "../types/types";

const isDocument = (node: FileTree): node is Document => {
  return node.type === "DOCUMENT";
};

const isFolder = (node: FileTree): node is Folder => {
  return node.type === "FOLDER";
};

export { isDocument, isFolder };
