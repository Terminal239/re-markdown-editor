import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { exportDocuments } from "../../actions/export";
import { createDocument } from "../../actions/files";
import { createFolder, selectFolder } from "../../actions/folders";
import { deleteSidebarItem, resetSidebarRenameId } from "../../actions/state";
import useSidebarDeleting from "../../hooks/use-sidebar-deleting";
import { IconDownload, IconFolderPlus, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";
import RenderFileTree from "./RenderFileTree";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
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
    await resetSidebarRenameId();
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
        className={clsx(
          "absolute inset-y-0 flex w-[196px] shrink-0 flex-col bg-gray-50 transition md:static md:w-[256px]",
          className,
        )}
      >
        <div className="flex h-[40px] *:flex-1">
          <Button
            tooltipMessage="New Document"
            onClick={handleCreateNewDocument}
            icon={IconPlus}
            className="sidebar-action"
          />
          <Button
            tooltipMessage="Create Folder"
            onClick={handleCreateFolder}
            icon={IconFolderPlus}
            className="sidebar-action"
          />
          <Button
            tooltipMessage="Delete Document"
            onClick={toggleDeleting}
            icon={IconTrash}
            className="sidebar-action"
          />
          <Button
            tooltipMessage="Export All Documents"
            onClick={handleExportAllDocuments}
            icon={IconDownload}
            className="sidebar-action"
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
