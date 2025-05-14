import { memo } from "react";

import { updateNode } from "../../actions/nodes";
import {
  resetSelectedNode,
  resetSidebarAction,
  setEditing,
  setSelectedNode,
} from "../../actions/state";
import useEditing from "../../hooks/use-editing";
import useSidebarAction from "../../hooks/use-sidebar-action-node";
import { validateName } from "../../lib/utils";
import { Node } from "../../types/types";
import { IconDocument, IconFilePen } from "../Icons";
import EditableNameInput from "../Reusable/EditableNameInput";
import FileTreeEntryLayout from "../Reusable/FileTreeEntryLayout";

type RenderDocumentProps = {
  document: Node;
};

const RenderDocument = ({ document }: RenderDocumentProps) => {
  const editing = useEditing();
  const selectedNode = useSidebarAction();

  const isActive = document.id === editing?.id;
  const isEditing = document.id === selectedNode?.node.id && selectedNode?.action === "RENAME";

  const handleItemClick = async () => {
    await setSelectedNode(document);
    await setEditing(document);
  };

  const handleDocumentSave = async (newName: string) => {
    await updateNode({ ...document, name: newName });
    await resetSidebarAction();
  };

  return (
    <FileTreeEntryLayout
      icon={isActive ? <IconFilePen /> : <IconDocument className="!h-3.5" />}
      onClick={handleItemClick}
      isActive={isActive}
      dataType={document.type}
      activeClassName="bg-gray-200"
    >
      <EditableNameInput
        key={document.id}
        isEditing={isEditing}
        initialValue={document.name}
        onSave={handleDocumentSave}
        onCancel={resetSelectedNode}
        validateFn={validateName}
        displaySuffix=".md"
        textClassName="file-tree-entry-text"
      />
    </FileTreeEntryLayout>
  );
};

export default memo(RenderDocument);
