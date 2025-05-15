import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { resetSelectedNode, setSelectedNode } from "../../actions/state";
import useSelectedNode from "../../hooks/use-selected-node";
import useSidebarAction from "../../hooks/use-sidebar-action-node";
import { Node } from "../../types/types";
import { IconChevronRight, IconFolder, IconFolderOpen } from "../Icons";
import EditableNameInput from "../Reusable/EditableNameInput";
import FileTreeEntryLayout from "../Reusable/FileTreeEntryLayout";
import RenderFileTree from "./RenderFileTree";

type RenderFolderProps = {
  folder: Node;
};

const RenderFolder = ({ folder }: RenderFolderProps) => {
  const sidebarAction = useSidebarAction();
  const selectedNode = useSelectedNode();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = folder.id === sidebarAction?.node.id;
  const isEditing = folder.id === sidebarAction?.node.id && sidebarAction?.action === "RENAME";

  const toggleExpansion = async () => {
    console.log(isEditing);
    if (!isEditing) {
      await setSelectedNode(folder);
      setIsExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedNode?.parentId === folder.id) setIsExpanded(true);
  }, [selectedNode, folder.id]);

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
            node={folder}
            isEditing={isEditing}
            onCancel={resetSelectedNode}
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
