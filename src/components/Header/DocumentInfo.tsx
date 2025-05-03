import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Document } from "../../config/dexie";
import { saveDocument } from "../actions/files";
import { IconDocument } from "../Icons";

type Props = {
  activeFile: Document;
};

const DocumentInfo = ({ activeFile }: Props) => {
  const [documentName, setDocumentName] = useState(activeFile?.name ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    if (isEditing) handleRenameDocument();
    setIsEditing((prev) => !prev);
  };

  const handleRenameDocument = async () => {
    if (documentName.length === 0) {
      toast.error("Document name cannot be blank", {
        duration: 5000,
      });
      setDocumentName(activeFile?.name ?? "");
      return;
    }

    await saveDocument({ ...activeFile, name: documentName });

    toast.success(
      <p>
        Document renamed to <span className="font-bold">{documentName}</span>
      </p>,
      {
        duration: 5000,
      },
    );
  };

  useEffect(() => {
    setDocumentName(activeFile?.name ?? "");
  }, [activeFile?.name]);

  return (
    <div className="flex items-center gap-2 lg:border-l lg:pl-4">
      <IconDocument className="hidden lg:block" />
      <div className="ml-4 flex flex-col lg:ml-0">
        <span className="-mb-1 hidden text-[12px] text-gray-700 lg:inline">Document Name</span>
        <span onClick={toggleEditing} className="cursor-pointer text-base font-bold max-lg:ml-2">
          {isEditing ? (
            <input
              className="h-4 w-[120px] rounded-sm border-b-1 bg-gray-100 p-1 outline-none"
              type="text"
              onKeyDown={(e) => e.key === "Enter" && toggleEditing()}
              onChange={(e) => setDocumentName(e.target.value)}
              value={documentName}
              onBlur={toggleEditing}
              autoFocus
            />
          ) : (
            documentName
          )}
          .md
        </span>
      </div>
    </div>
  );
};

export default DocumentInfo;
