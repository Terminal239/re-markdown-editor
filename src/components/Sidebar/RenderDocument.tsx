import { memo } from "react";
import { saveDocument, selectDocument } from "../../actions/files";
import { resetSidebarRenameId } from "../../actions/state";
import useActiveFile from "../../hooks/use-active-file";
import useSidebarEditing from "../../hooks/use-sidebar-editing";
import { validateName } from "../../lib/utils";
import { Document } from "../../types/types";
import { IconDocument, IconFilePen } from "../Icons";
import EditableNameInput from "../Reusable/EditableNameInput";
import FileTreeEntryLayout from "../Reusable/FileTreeEntryLayout";

type RenderDocumentProps = {
  document: Document;
};

const RenderDocument = ({ document }: RenderDocumentProps) => {
  const activeFile = useActiveFile();
  const sidebarEditingId = useSidebarEditing();
  const isEditing = document.id === sidebarEditingId;
  const isActive = activeFile?.id === document.id;

  const handleItemClick = async () => await selectDocument(document.id);

  const handleDocumentSave = async (newName: string) => {
    await saveDocument({ ...document, name: newName });
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
        onCancel={resetSidebarRenameId}
        validateFn={validateName}
        displaySuffix=".md"
        textClassName="file-tree-entry-text"
      />
    </FileTreeEntryLayout>
  );
};

export default memo(RenderDocument);
