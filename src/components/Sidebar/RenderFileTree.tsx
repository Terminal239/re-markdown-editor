import clsx from "clsx";
import { memo } from "react";
import { FileTree } from "../../config/dexie";
import { isDocument, isFolder } from "../../lib/guard";
import useFiles from "../hooks/use-files";
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
  const files = useFiles({ parentId });

  return (
    <div className={clsx("overflow-y-auto flex flex-col", files.length !== 0 && parentId !== -1 && "ml-3 border-l border-gray-500/50")}>
      {files.sort(arrangeFileTree).map((element) => {
        if (isDocument(element))
          return (
            <Menu id={element.id} key={element.id} type={element.type}>
              <RenderDocument document={element} />
            </Menu>
          );
        if (isFolder(element))
          return (
            <Menu id={element.id} key={element.id} type={element.type}>
              <RenderFolder key={element.id} folder={element} />
            </Menu>
          );
        else return <></>;
      })}
    </div>
  );
};

export default memo(RenderFileTree);
