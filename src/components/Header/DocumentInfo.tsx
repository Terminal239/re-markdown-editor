import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Document } from "../../config/dexie";
import { saveDocument } from "../actions/files";
import { IconDocument } from "../Icons";

type Props = {
  editing: Document;
};

const DocumentInfo = ({ editing }: Props) => {
  const [documentName, setDocumentName] = useState(editing?.name ?? "");
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
      setDocumentName(editing?.name ?? "");
      return;
    }

    await saveDocument({ ...editing, name: documentName });

    toast.success(
      <p>
        Document renamed to <span className="font-bold">{documentName}</span>
      </p>,
      {
        duration: 5000,
      }
    );
  };

  useEffect(() => {
    setDocumentName(editing?.name ?? "");
  }, [editing?.name]);

  return (
    <div className="flex items-center gap-2 lg:border-l lg:pl-4">
      <IconDocument className="hidden lg:block" />
      <div className="flex flex-col ml-4 lg:ml-0">
        <span className="text-[12px] -mb-1 text-gray-700 hidden lg:inline">Document Name</span>
        <span onClick={toggleEditing} className="max-lg:ml-2 text-base cursor-pointer font-bold">
          {isEditing ? (
            <input
              className="outline-none border-b-1 h-4 rounded-sm bg-gray-100 p-1 w-[120px]"
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
