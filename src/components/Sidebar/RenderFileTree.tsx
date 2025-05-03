import clsx from "clsx";
import { memo } from "react";
import { FileTree } from "../../config/dexie";
import useFiles from "../../hooks/use-files";
import { isDocument, isFolder } from "../../lib/guard";
import Menu from "../Reusable/Menu";
import RenderDocument from "./RenderDocument";
import RenderFolder from "./RenderFolder";

type RenderFileTreeProps = {
  parentId?: number;
};

const arrangeFileTree = (a: FileTree, b: FileTree): number => {
  if (a.type === b.type) return a.name.localeCompare(b.name);
  return a.type === "FOLDER" ? -1 : 1;
};

const RenderFileTree = ({ parentId }: RenderFileTreeProps) => {
  const fileTree = useFiles({ parentId });

  return (
    <div
      className={clsx(
        "flex flex-col overflow-y-auto",
        fileTree.length !== 0 && parentId !== -1 && "ml-3 border-l border-gray-500/50",
      )}
    >
      {fileTree.sort(arrangeFileTree).map((treeNode) => {
        if (isDocument(treeNode))
          return (
            <Menu id={treeNode.id} key={treeNode.id} type={treeNode.type}>
              <RenderDocument document={treeNode} />
            </Menu>
          );
        if (isFolder(treeNode))
          return (
            <Menu id={treeNode.id} key={treeNode.id} type={treeNode.type}>
              <RenderFolder key={treeNode.id} folder={treeNode} />
            </Menu>
          );
        else return <></>;
      })}
    </div>
  );
};

export default memo(RenderFileTree);
