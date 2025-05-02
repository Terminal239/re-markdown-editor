import clsx from "clsx";
import { memo, useState } from "react";
import { Folder } from "../../config/dexie";
import { validateName } from "../../lib/utils";
import { saveFolder, selectFolder } from "../actions/folders";
import { resetSidebarRenameItem } from "../actions/state";
import useActiveFolder from "../hooks/use-active-folder";
import useSidebarEditing from "../hooks/use-sidebar-editing";
import { IconChevronRight, IconFolder, IconFolderOpen } from "../Icons";
import RenderFileTree from "./RenderFileTree";

type RenderFolderProps = {
  folder: Folder;
};

const RenderFolder = ({ folder }: RenderFolderProps) => {
  const [foldername, setFoldername] = useState(folder.name);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeFolderId = useActiveFolder();
  const id = useSidebarEditing();

  const toggleExpansion = async () => {
    await selectFolder(folder.id);
    setIsExpanded((prev) => !prev);
  };

  const handleFolderRename = async () => {
    if (foldername !== undefined && validateName(foldername)) await saveFolder({ ...folder, name: foldername });
    else return;

    await resetSidebarRenameItem();
  };

  return (
    <>
      <div onClick={toggleExpansion} data-file-type={folder.type} key={folder.id} className={clsx("file-tree-entry-outer-container", activeFolderId === folder.id && "file-tree-entry--selected")}>
        {isExpanded ? <IconFolderOpen /> : <IconFolder />}
        <div className="file-tree-entry-inner-container">
          <div className="file-tree-entry-text ml-0.5">
            {folder.id === id ? (
              <input
                type="text"
                className={clsx("bg-white text-black pl-1 w-[14ch]", !validateName(foldername) && " outline-red-400 ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFoldername(e.target.value)}
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
