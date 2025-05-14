import { Node } from "../types/types";

const isFile = (node: Node) => {
  return node.type === "FILE";
};

const isFolder = (node: Node) => {
  return node.type === "FOLDER";
};

export { isFile, isFolder };
