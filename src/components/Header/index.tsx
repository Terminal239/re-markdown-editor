import React, { useState } from "react";
import { useAppDispatch, useAppState } from "../../context/AppContext";

type Props = {
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ sidebarExpanded, setSidebarExpanded }: Props) => {
  const { editing } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const [documentName, setDocumentName] = useState(editing.name);
  const dispatch = useAppDispatch();

  const handleDocumentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(event.target.value);
  };

  const saveDocumentName = () => {
    dispatch({
      type: "save",
      document: {
        ...editing,
        name: documentName,
      },
    });
  };

  const toggleEditing = () => {
    if (isEditing) saveDocumentName();

    setIsEditing((prev) => !prev);
  };

  const handleSaveDocument = () => {
    dispatch({
      type: "save",
      document: editing,
    });
  };

  return (
    <header className="px-4 py-2 bg-gray-200 flex items-center gap-4">
      <button className="h-9 w-9 text-white font-bold bg-blue-700 hover:bg-blue-500 rounded" onClick={() => setSidebarExpanded((prev) => !prev)}>
        {sidebarExpanded ? "X" : "O"}
      </button>

      <span>Markdown Editor</span>

      <div className="flex flex-col">
        <span>Document Name</span>
        <span onClick={toggleEditing} className="cursor-pointer">
          {isEditing ? (
            <input
              type="text"
              onChange={handleDocumentNameChange}
              value={documentName}
              onBlur={toggleEditing} // optional: save when input loses focus
              autoFocus
            />
          ) : (
            documentName
          )}
          .md
        </span>
      </div>

      <button onClick={handleSaveDocument} className="ml-auto bg-teal-700 hover:bg-teal-500 px-4 py-2 font-bold text-white rounded">
        Save Document
      </button>
    </header>
  );
};

export default Header;
