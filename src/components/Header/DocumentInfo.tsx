import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateNode } from "../../actions/nodes";
import { Node } from "../../types/types";
import { IconDocument } from "../Icons";

type Props = {
  editing: Node;
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

    await updateNode({ ...editing, name: documentName });

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
    setDocumentName(editing?.name ?? "");
  }, [editing?.name]);

  return (
    <div className="ml-8 flex items-center gap-2 md:ml-0 lg:border-l lg:pl-4">
      <IconDocument className="hidden lg:block" />
      <div className="ml-4 flex flex-col lg:ml-0">
        <span className="-mb-1 hidden text-[12px] text-gray-700 lg:inline">Document Name</span>
        <span onClick={toggleEditing} className="cursor-pointer text-base font-bold max-lg:ml-2">
          {isEditing ? (
            <input
              className="h-4 w-[120px] border-b border-b-black bg-white p-1 outline-none"
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
