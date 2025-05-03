interface Document {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "DOCUMENT";
  parentId?: number;
}

interface Folder {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  type: "FOLDER";
  parentId?: number;
}

type FileTree = Document | Folder;

export { Document, FileTree, Folder };
