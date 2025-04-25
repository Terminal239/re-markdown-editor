import clsx from "clsx";
import { formatDistance } from "date-fns";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { createDocument, Document } from "../../reducer/document";
import { IconDocument, IconDownload, IconPlus, IconTrash } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";
import Button from "../Reusable/Button";

type Props = {};

const Sidebar = (props: Props) => {
  const { editing, documents } = useAppState();
  const dispatch = useAppDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date) => formatDistance(date, new Date(), { addSuffix: true });

  const handleCreateNewDocument = () => {
    const newDoc = createDocument();
    dispatch({
      type: "create",
      document: newDoc,
    });

    toast.success("Document created.", {
      description: `New doc: ${newDoc.name}`,
      icon: <IconDocument />, // custom icon
      action: {
        label: "Open",
        onClick: () =>
          dispatch({
            type: "select-document",
            document: newDoc,
          }),
      },
      duration: 5000,
      onAutoClose: () => console.log("Create toast auto‐closed"),
      onDismiss: () => console.log("Create toast dismissed"),
    });
  };

  const handleItemClick = (document: Document) => {
    dispatch({
      type: "select-document",
      document,
    });
  };

  const handleExportAllDocuments = async () => {
    const zip = new JSZip();

    for (const document of documents) {
      zip.file(`${document.name}.md`, document.content, {
        date: new Date(document.updatedAt),
      });
    }

    const file = await zip.generateAsync({ type: "blob" });
    saveAs(file, "exported-documents.zip");
  };

  const toggleDeleting = () => setIsDeleting((prev) => !prev);

  return (
    <>
      <aside className="min-w-[256px] bg-gray-50 flex flex-col">
        <div className="flex *:flex-1">
          <Button tooltipMessage="Create Document" onClick={handleCreateNewDocument} icon={IconPlus} className="bg-gray-700 size-[40px]" />
          <Button tooltipMessage="Delete Document" onClick={toggleDeleting} icon={IconTrash} className="bg-slate-500 h-[40px]" />
          <Button tooltipMessage="Export All Documents" onClick={handleExportAllDocuments} icon={IconDownload} className="bg-neutral-500 h-[40px]" />
        </div>
        <div className="md:p-4 overflow-y-auto flex-1">
          {documents
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((document) => (
              <div key={document.id} className="mb-2 flex items-center text-gray-700 gap-2 last-of-type:mb-0 max-md:pl-2 md:-ml-1">
                <IconDocument />
                <div className="flex flex-col">
                  <div onClick={() => handleItemClick(document)} className={clsx("flex items-center gap-2 font-medium hover:underline w-fit cursor-pointer -mb-1", editing.id === document.id && "text-gray-400")}>
                    <span>{document.name}.md</span>
                    {editing.id === document.id && <div className="size-[8px] rounded-full bg-gray-400"></div>}
                  </div>
                  <span className="text-[12px]">{formatDate(document.updatedAt)}</span>
                </div>
              </div>
            ))}
        </div>
      </aside>
      {isDeleting && createPortal(<DeleteModal toggleModal={toggleDeleting} />, document.getElementById("portal")!)}
    </>
  );
};

export default Sidebar;
