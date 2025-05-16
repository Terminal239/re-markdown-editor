import { ReactNode } from "react";

import { createNode } from "../../actions/nodes";
import { setSidebarAction } from "../../actions/state";
import { Node } from "../../types/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";

type Props = {
  node: Node;
  children: ReactNode;
};

type ContextProps = {
  node: Node;
};

const handleRename = async (node: Node) => {
  await setSidebarAction(node, "RENAME");
};

const handleDelete = async (node: Node) => {
  await setSidebarAction(node, "DELETE");
};

const handleNewNode = async (node: Node, type: Node["type"]) => {
  await createNode(type, node);
};

const FolderContext = ({ node }: ContextProps) => {
  return (
    <>
      <ContextMenuItem onClick={() => handleNewNode(node, "FILE")}>New File</ContextMenuItem>
      <ContextMenuItem onClick={() => handleNewNode(node, "FOLDER")}>New Folder</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={() => handleRename(node)}>Rename</ContextMenuItem>
      <ContextMenuItem onClick={() => handleDelete(node)}>Delete</ContextMenuItem>
    </>
  );
};

const FileContext = ({ node }: ContextProps) => {
  return (
    <>
      <ContextMenuItem onClick={() => handleRename(node)}>Rename</ContextMenuItem>
      <ContextMenuItem onClick={() => handleDelete(node)}>Delete</ContextMenuItem>
    </>
  );
};

const RenderContext = ({ node }: ContextProps) => {
  switch (node.type) {
    case "FILE":
      return <FileContext node={node} />;
    case "FOLDER":
      return <FolderContext node={node} />;
    default:
      return null;
  }
};

const Menu = ({ node, children }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <RenderContext node={node} />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Menu;
