import { ReactNode } from "react";
import { createDocument, deleteDocument } from "../actions/files";
import { createFolder, deleteFolder } from "../actions/folders";
import { resetSidebarRenameItem, setSidebarRenameItem } from "../actions/state";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";

type Props = {
  id: number;
  children: ReactNode;
  type: "DOCUMENT" | "FOLDER";
};

type ContextProps = {
  id: number;
  type: Props["type"];
};

const handleRename = async (id: number) => {
  await resetSidebarRenameItem();
  await setSidebarRenameItem(id);
};

const handleDelete = async (id: number, type: Props["type"]) => {
  if (type === "FOLDER") await deleteFolder(id);
  if (type === "DOCUMENT") await deleteDocument(id);
};

const handleNewFile = async (id: number) => {
  await createDocument(id);
};

const handleNewFolder = async (id: number) => {
  await createFolder(id);
};

const FolderContext = ({ id, type }: ContextProps) => {
  return (
    <>
      <ContextMenuItem onClick={() => handleNewFile(id)}>New File</ContextMenuItem>
      <ContextMenuItem onClick={() => handleNewFolder(id)}>New Folder</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={() => handleRename(id)}>Rename</ContextMenuItem>
      <ContextMenuItem onClick={() => handleDelete(id, type)}>Delete</ContextMenuItem>
    </>
  );
};

const DocumentContext = ({ id, type }: ContextProps) => {
  return (
    <>
      <ContextMenuItem onClick={() => handleRename(id)}>Rename</ContextMenuItem>
      <ContextMenuItem onClick={() => handleDelete(id, type)}>Delete</ContextMenuItem>
    </>
  );
};

const RenderContext = ({ id, type }: { id: number; type: Props["type"] }) => {
  switch (type) {
    case "DOCUMENT":
      return <DocumentContext id={id} type={type} />;
    case "FOLDER":
      return <FolderContext id={id} type={type} />;
    default:
      return null;
  }
};

const Menu = ({ children, type, id }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <RenderContext id={id} type={type} />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Menu;
