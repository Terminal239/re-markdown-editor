import { useState } from "react";
import { createPortal } from "react-dom";
import { exportDocuments } from "../actions/export";
import { createDocument } from "../actions/files";
import { createFolder, selectFolder } from "../actions/folders";
import { IconDownload, IconFolderPlus, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";
import RenderFileTree from "./RenderFileTree";

const Sidebar = () => {
  const [isDeleting, setIsDeleting] = useState(false);

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
  };

  return (
    <>
      <aside onClick={handleSidebarClick} id="sidebar" className="w-[196px] md:w-[256px] bg-gray-50 flex flex-col">
        <div className="flex *:flex-1">
          <Button tooltipMessage="New Document" onClick={handleCreateNewDocument} icon={IconPlus} className="bg-gray-700 size-[40px]" />
          <Button tooltipMessage="Create Folder" onClick={handleCreateFolder} icon={IconFolderPlus} className="bg-gray-700 size-[40px]" />
          <Button tooltipMessage="Delete Document" onClick={toggleDeleting} icon={IconTrash} className="bg-slate-500 h-[40px]" />
          <Button tooltipMessage="Export All Documents" onClick={handleExportAllDocuments} icon={IconDownload} className="bg-neutral-500 h-[40px]" />
        </div>
        <RenderFileTree parentId={-1} />
      </aside>
      {isDeleting && createPortal(<DeleteModal toggleModal={toggleDeleting} />, document.getElementById("portal")!)}
    </>
  );
};

export default Sidebar;
