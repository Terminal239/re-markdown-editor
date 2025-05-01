import clsx from "clsx";
import { formatDistance } from "date-fns";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useState } from "react";
import { createPortal } from "react-dom";
import { createDocument, Document, selectDocument } from "../../config/dexie";
import { IconDocument, IconDownload, IconFilePen, IconFolder, IconFolderOpen, IconFolderPlus, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";
import useActiveFile from "../hooks/use-active-file";
import useFiles from "../hooks/use-files";

type RenderDocumentProps = {
  document: Document;
};

type RenderFolderProps = {
  folder: Folder;
  setSelectedFolder: React.Dispatch<React.SetStateAction<number>>;
};

const formatDate = (date: Date) => formatDistance(date, new Date(), { addSuffix: true });

const arrangeFileTree = (a: FileTree, b: FileTree): number => {
  if (a.type === b.type) return a.name.localeCompare(b.name);

  return a.type === "FOLDER" ? -1 : 1;
};

const RenderFolder = ({ folder, setSelectedFolder }: RenderFolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    if (!isExpanded) setSelectedFolder(folder.id);
    setIsExpanded((prev) => !prev);
  };

  return (
    <div key={folder.id} className="h-[36px] pl-4 py-2 bg-amber-200 flex items-center text-gray-700 gap-1 md:gap-2 md:-ml-1">
      {isExpanded ? <IconFolderOpen /> : <IconFolder />}
      <div className="flex flex-col">
        <div onClick={toggleExpansion} className={clsx("flex items-center gap-2 font-medium hover:underline w-fit cursor-pointer -mb-1")}>
          <span className="text-sm md:text-base">{folder.name}</span>
        </div>
      </div>
    </div>
  );
};

const RenderDocument = ({ document }: RenderDocumentProps) => {
  const editing = useActiveFile();

  const handleItemClick = async (documentId: number) => {
    await selectDocument(documentId);
  };

  return (
    <div key={document.id} className="h-[42px] pl-4 py-2 flex items-center text-gray-700 gap-1 md:gap-2 md:-ml-1">
      {editing?.id === document.id ? <IconFilePen /> : <IconDocument />}
      <div className="flex flex-col">
        <div onClick={() => handleItemClick(document.id)} className={clsx("flex items-center gap-2 font-medium hover:underline w-fit cursor-pointer -mb-1", editing?.id === document.id && "text-gray-400")}>
          <span className="text-sm md:text-base max-w-[16ch] overflow-hidden text-ellipsis">{document.name}.md</span>
          {editing?.id === document.id && <div className="size-[8px] rounded-full bg-gray-400"></div>}
        </div>
        <span className="text-[12px] text-gray-500">{formatDate(document.updatedAt)}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const documents = useFiles();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateNewDocument = async () => {
    await createDocument();
  };

  const handleCreateFolder = () => {
    // dispatch({
    //   type: "CREATE_FOLDER",
    // });
  };

  const handleExportAllDocuments = async () => {
    const zip = new JSZip();
    for (const document of documents) {
      zip.file(`${document.name}-${document.id}.md`, (document as Document).content, {
        date: new Date(document.updatedAt),
      });
    }

    const file = await zip.generateAsync({ type: "blob" });
    saveAs(file, "exported-fileStructure.zip");
  };

  const toggleDeleting = () => setIsDeleting((prev) => !prev);

  return (
    <>
      <aside className="min-w-[196px] md:min-w-[256px] bg-gray-50 flex flex-col">
        <div className="flex *:flex-1">
          <Button tooltipMessage="New Document" onClick={handleCreateNewDocument} icon={IconPlus} className="bg-gray-700 size-[40px]" />
          <Button tooltipMessage="Create Folder" onClick={handleCreateFolder} icon={IconFolderPlus} className="bg-gray-700 size-[40px]" />
          <Button tooltipMessage="Delete Document" onClick={toggleDeleting} icon={IconTrash} className="bg-slate-500 h-[40px]" />
          <Button tooltipMessage="Export All Documents" onClick={handleExportAllDocuments} icon={IconDownload} className="bg-neutral-500 h-[40px]" />
        </div>
        <div className="overflow-y-auto flex-1 flex flex-col">
          {documents.map((file) => {
            if (file.type === "DOCUMENT") return <RenderDocument key={file.id} document={file} />;
            // if (file.type === "FOLDER") return <RenderFolder setSelectedFolder={setSelectedFolder} folder={file} />;
            else return <></>;
          })}
        </div>
      </aside>
      {isDeleting && createPortal(<DeleteModal toggleModal={toggleDeleting} />, document.getElementById("portal")!)}
    </>
  );
};

export default Sidebar;
