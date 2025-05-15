import { memo } from "react";

import { resetSelectedNode, setEditing, setSelectedNode } from "../../actions/state";
import useEditing from "../../hooks/use-editing";
import useSidebarAction from "../../hooks/use-sidebar-action-node";
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
        node={document}
        isEditing={isEditing}
        onCancel={resetSelectedNode}
        displaySuffix=".md"
        textClassName="file-tree-entry-text"
      />
    </FileTreeEntryLayout>
  );
};

export default memo(RenderDocument);
