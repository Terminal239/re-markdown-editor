import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { saveFolder, selectFolder } from "../../actions/folders";
import { resetSidebarRenameId } from "../../actions/state";
import useActiveFile from "../../hooks/use-active-file";
import useActiveFolder from "../../hooks/use-active-folder";
import useSidebarEditing from "../../hooks/use-sidebar-editing";
import { validateName } from "../../lib/utils";
import { Folder } from "../../types/types";
import { IconChevronRight, IconFolder, IconFolderOpen } from "../Icons";
import EditableNameInput from "../Reusable/EditableNameInput";
import FileTreeEntryLayout from "../Reusable/FileTreeEntryLayout";
import RenderFileTree from "./RenderFileTree";

type RenderFolderProps = {
  folder: Folder;
};

const RenderFolder = ({ folder }: RenderFolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeFile = useActiveFile();
  const activeFolder = useActiveFolder();
  const sidebarEditingId = useSidebarEditing();
  const isEditing = folder.id === sidebarEditingId;
  const isActive = activeFolder?.id === folder.id;

  const toggleExpansion = async () => {
    if (!isEditing) {
      await selectFolder(folder.id);
      setIsExpanded((prev) => !prev);
    }
  };

  const handleFolderSave = async (newName: string) => {
    await saveFolder({ ...folder, name: newName });
  };

  useEffect(() => {
    if (activeFile?.parentId === folder.id) setIsExpanded(true);
  }, [activeFile, folder.id]);

  useEffect(() => {
    if (activeFolder?.parentId === folder.id) setIsExpanded(true);
  }, [activeFolder, folder.id]);

  return (
    <>
      <FileTreeEntryLayout
        icon={isExpanded ? <IconFolderOpen /> : <IconFolder />}
        onClick={toggleExpansion}
        isActive={isActive}
        dataType={folder.type}
        activeClassName="file-tree-entry--selected"
      >
        <div className="flex w-full items-center">
          <EditableNameInput
            key={folder.id}
            isEditing={isEditing}
            initialValue={folder.name}
            onSave={handleFolderSave}
            onCancel={resetSidebarRenameId}
            validateFn={validateName}
            textClassName="file-tree-entry-text"
          />
          <IconChevronRight
            className={clsx(
              "ml-auto transform-gpu transition duration-75",
              isExpanded && "rotate-90",
            )}
          />
        </div>
      </FileTreeEntryLayout>
      {isExpanded && <RenderFileTree parentId={folder.id} />}
    </>
  );
};

export default memo(RenderFolder);
