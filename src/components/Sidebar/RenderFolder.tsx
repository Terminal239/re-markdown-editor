import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { Folder } from "../../config/dexie";
import { validateName } from "../../lib/utils";
import { saveFolder, selectFolder } from "../actions/folders";
import { resetSidebarRenameItem } from "../actions/state";
import useActiveFile from "../hooks/use-active-file";
import useActiveFolder from "../hooks/use-active-folder";
import useSidebarEditing from "../hooks/use-sidebar-editing";
import { IconChevronRight, IconFolder, IconFolderOpen } from "../Icons";
import RenderFileTree from "./RenderFileTree";

type RenderFolderProps = {
  folder: Folder;
};

const RenderFolder = ({ folder }: RenderFolderProps) => {
  const [folderName, setFolderName] = useState(folder.name);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFile = useActiveFile();
  const activeFolder = useActiveFolder();
  const sidebarEditing = useSidebarEditing();

  const toggleExpansion = async () => {
    await selectFolder(folder.id);
    setIsExpanded((prev) => !prev);
  };

  const handleFolderRename = async () => {
    if (folderName !== undefined && validateName(folderName)) await saveFolder({ ...folder, name: folderName });
    else return;

    await resetSidebarRenameItem();
  };

  useEffect(() => {
    if (activeFile?.parentId === folder.id) setIsExpanded(true);
  }, [activeFile, folder]);

  useEffect(() => {
    if (activeFolder?.parentId === folder.id) setIsExpanded(true);
  }, [activeFolder, folder]);

  return (
    <>
      <div onClick={toggleExpansion} data-file-type={folder.type} key={folder.id} className={clsx("file-tree-entry-outer-container", activeFolder?.id === folder.id && "file-tree-entry--selected")}>
        {isExpanded ? <IconFolderOpen /> : <IconFolder />}
        <div className="file-tree-entry-inner-container">
          <div className="file-tree-entry-text ml-0.5">
            {folder.id === sidebarEditing ? (
              <input
                type="text"
                className={clsx("bg-white text-black pl-1 w-[14ch]", !validateName(folderName) && " outline-red-400 ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFolderRename()}
                onBlur={handleFolderRename}
                autoFocus
              />
            ) : (
              <span className="file-tree-entry-text">{folder.name}</span>
            )}
          </div>
          <IconChevronRight className={clsx("ml-auto transition transform-gpu duration-75", isExpanded && "rotate-90")} />
        </div>
      </div>
      {isExpanded && <RenderFileTree parentId={folder.id} />}
    </>
  );
};

export default memo(RenderFolder);
