import clsx from "clsx";
import { memo } from "react";
import useFiles from "../../hooks/use-files";
import { isFile, isFolder } from "../../lib/guard";
import { Node } from "../../types/types";
import Menu from "../Reusable/Menu";
import RenderDocument from "./RenderDocument";
import RenderFolder from "./RenderFolder";

type RenderFileTreeProps = {
  parentId?: number;
};

const arrangeFileTree = (a: Node, b: Node): number => {
  if (a.type === b.type) return a.name.localeCompare(b.name);
  return a.type === "FOLDER" ? -1 : 1;
};

const RenderFileTree = ({ parentId }: RenderFileTreeProps) => {
  const fileTree = useFiles({ parentId });

  return (
    <div
      className={clsx(
        "flex flex-col overflow-y-auto",
        fileTree.length !== 0 && parentId !== -1 && "border-l border-gray-500/50 md:ml-3",
      )}
    >
      {fileTree.sort(arrangeFileTree).map((node) => {
        if (isFile(node))
          return (
            <Menu key={node.id} node={node}>
              <RenderDocument document={node} />
            </Menu>
          );
        if (isFolder(node))
          return (
            <Menu key={node.id} node={node}>
              <RenderFolder key={node.id} folder={node} />
            </Menu>
          );
        else return <></>;
      })}
    </div>
  );
};

export default memo(RenderFileTree);
