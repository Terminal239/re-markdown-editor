import clsx from "clsx";
import { formatDistance } from "date-fns";
import { memo, useState } from "react";
import { Document } from "../../config/dexie";
import { validateName } from "../../lib/utils";
import { saveDocument, selectDocument } from "../actions/files";
import { resetSidebarRenameItem } from "../actions/state";
import useActiveFile from "../hooks/use-active-file";
import useSidebarEditing from "../hooks/use-sidebar-editing";
import { IconDocument, IconFilePen } from "../Icons";

type RenderDocumentProps = {
  document: Document;
};

const formatDate = (date: Date) => formatDistance(date, new Date(), { addSuffix: true });

const RenderDocument = ({ document }: RenderDocumentProps) => {
  const [filename, setFilename] = useState(document?.name);
  const editing = useActiveFile();
  const id = useSidebarEditing();

  const handleItemClick = async (documentId: number) => await selectDocument(documentId);

  const handleDocumentRename = async () => {
    if (filename !== undefined && validateName(filename)) await saveDocument({ ...document, name: filename });
    else return;

    await resetSidebarRenameItem();
  };

  return (
    <div onClick={() => handleItemClick(document.id)} data-file-type={document.type} key={document.id} className={clsx("file-tree-entry-outer-container", editing?.id === document.id && "bg-gray-200")}>
      {editing?.id === document.id ? <IconFilePen /> : <IconDocument className="!h-3.5" />}
      <div className="flex flex-col items-center">
        <div className={clsx("file-tree-entry-inner-container")}>
          {document.id === id ? (
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilename(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDocumentRename()}
              className={clsx("bg-white text-black pl-1 w-[16ch]", !validateName(filename) && " outline-red-400 ")}
              onBlur={handleDocumentRename}
              autoFocus
            />
          ) : (
            <span className="file-tree-entry-text">{document.name}.md</span>
          )}
          {editing?.id === document.id && <div className="size-[8px] rounded-full bg-gray-700"></div>}
        </div>
      </div>
    </div>
  );
};

export default memo(RenderDocument);
