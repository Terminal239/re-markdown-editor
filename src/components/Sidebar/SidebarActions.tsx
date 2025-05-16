import { useEffect } from "react";
import { createPortal } from "react-dom";
import { exportDocuments } from "../../actions/export";
import { createNode } from "../../actions/nodes";
import { resetSidebarAction, setSidebarAction } from "../../actions/state";
import useEditing from "../../hooks/use-editing";
import useSelectedNode from "../../hooks/use-selected-node";
import useSidebarAction from "../../hooks/use-sidebar-action-node";
import { Node } from "../../types/types";
import { IconDownload, IconFolderPlus, IconPencil, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";

const SidebarActions = () => {
  const editing = useEditing();
  const sidebarAction = useSidebarAction();
  const selectedNode = useSelectedNode();

  const currentNode = selectedNode ? selectedNode : editing;

  const handleCreateNewNode = async (type: Node["type"]) => await createNode(type, selectedNode);

  const handleExportAllDocuments = async () => {
    exportDocuments();
  };

  const handleRename = async () => {
    await setSidebarAction(currentNode!, "RENAME");
  };

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (document?.activeElement?.tagName === "TEXTAREA") return;

        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [editing]);

  const handleStartDelete = async () => {
    await setSidebarAction(selectedNode ? selectedNode : editing!, "DELETE");
  };

  const closeModal = async () => {
    await resetSidebarAction();
  };

  return (
    <>
      <div className="flex h-[40px] *:flex-1">
        <Button
          tooltipMessage="New Document"
          onClick={() => handleCreateNewNode("FILE")}
          icon={IconPlus}
          className="sidebar-action"
        />
        <Button
          tooltipMessage="Create Folder"
          onClick={() => handleCreateNewNode("FOLDER")}
          icon={IconFolderPlus}
          className="sidebar-action"
        />
        <Button
          disabled={currentNode === null}
          tooltipMessage={`Rename ${currentNode?.type ?? ""}`}
          onClick={handleRename}
          icon={IconPencil}
          className="sidebar-action"
        />
        <Button
          disabled={currentNode === null}
          tooltipMessage={`Delete ${currentNode?.type ?? ""}`}
          onClick={handleStartDelete}
          icon={IconTrash}
          className="sidebar-action"
        />
        <Button
          disabled={editing === null}
          tooltipMessage="Export All Files"
          onClick={handleExportAllDocuments}
          icon={IconDownload}
          className="sidebar-action"
        />
      </div>
      {sidebarAction?.action === "DELETE" &&
        createPortal(
          <DeleteModal sidebarAction={sidebarAction} closeModal={closeModal} />,
          document.getElementById("portal")!,
        )}
    </>
  );
};

export default SidebarActions;
