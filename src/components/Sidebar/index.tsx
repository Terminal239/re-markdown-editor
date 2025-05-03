import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { exportDocuments } from "../../actions/export";
import { createDocument } from "../../actions/files";
import { createFolder, selectFolder } from "../../actions/folders";
import { deleteSidebarItem, resetSidebarRenameItem } from "../../actions/state";
import useSidebarDeleting from "../../hooks/use-sidebar-deleting";
import { IconDownload, IconFolderPlus, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";
import RenderFileTree from "./RenderFileTree";

const Sidebar = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const itemToDeleteState = useSidebarDeleting();

  const handleCreateNewDocument = async () => await createDocument();
  const handleCreateFolder = async () => await createFolder();

  const toggleDeleting = () => setIsDeleting((prev) => !prev);

  const handleExportAllDocuments = async () => {
    exportDocuments();
  };

  const handleSidebarClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;

    await selectFolder(-1);
    await resetSidebarRenameItem();
  };

  const handleSidebarDelete = async () => {
    await deleteSidebarItem(itemToDeleteState);

    const isFolder = itemToDeleteState.type === "FOLDER";
    const itemLabelCapital = isFolder ? "Folder" : "Document";

    toast.success(`${itemLabelCapital} deleted successfully!`, {
      duration: 5000,
    });

    setIsDeleting(false);
  };

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        e.preventDefault();
        setIsDeleting(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [itemToDeleteState]);

  return (
    <>
      <aside
        onClick={handleSidebarClick}
        id="sidebar"
        className="flex w-[196px] shrink-0 flex-col bg-gray-50 md:w-[256px]"
      >
        <div className="flex *:flex-1">
          <Button
            tooltipMessage="New Document"
            onClick={handleCreateNewDocument}
            icon={IconPlus}
            className="size-[40px] bg-gray-700"
          />
          <Button
            tooltipMessage="Create Folder"
            onClick={handleCreateFolder}
            icon={IconFolderPlus}
            className="size-[40px] bg-gray-700"
          />
          <Button
            tooltipMessage="Delete Document"
            onClick={toggleDeleting}
            icon={IconTrash}
            className="h-[40px] bg-slate-500"
          />
          <Button
            tooltipMessage="Export All Documents"
            onClick={handleExportAllDocuments}
            icon={IconDownload}
            className="h-[40px] bg-neutral-500"
          />
        </div>
        <RenderFileTree parentId={-1} />
      </aside>
      {isDeleting &&
        itemToDeleteState.type !== "NULL" &&
        createPortal(
          <DeleteModal
            type={itemToDeleteState.type}
            onClick={handleSidebarDelete}
            toggleModal={toggleDeleting}
          />,
          document.getElementById("portal")!,
        )}
    </>
  );
};

export default Sidebar;
