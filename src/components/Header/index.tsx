import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconDocument, IconFloppyDisk, IconMenu, IconTrash, IconXMark } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";

type Props = {};

const Header = (props: Props) => {
  const { editing } = useAppState();

  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
        updatedAt: new Date(),
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
      document: {
        ...editing,
        updatedAt: new Date(),
      },
    });
  };

  const toggleDeleting = () => {
    setIsDeleting((prev) => !prev);
  };

  useEffect(() => {
    setDocumentName(editing.name);
  }, [editing.name]);

  const handleToggleSidebar = () => {
    uiDispatch({
      type: "toggle-sidebar",
    });
  };

  return (
    <>
      <header className="pr-4 flex items-center gap-4">
        <button className="size-[60px] text-white font-bold flex items-center justify-center bg-blue-700 hover:bg-blue-500" onClick={handleToggleSidebar}>
          {isSidebarOpen ? <IconXMark /> : <IconMenu />}
        </button>
        <span className="uppercase tracking-[8px] font-bold">Markdown</span>
        <div className="flex items-center gap-2 border-l pl-4">
          <IconDocument />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">Document Name</span>
            <span onClick={toggleEditing} className="cursor-pointer font-bold">
              {isEditing ? (
                <input
                  className="outline-none border-b-1 h-4 rounded-sm bg-gray-100 p-1 w-[120px]"
                  type="text"
                  onKeyDown={(event) => event.key === "Enter" && toggleEditing()}
                  onChange={handleDocumentNameChange}
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
        <button onClick={toggleDeleting} className="ml-auto text-white hover:bg-red-200 hover:text-red-500 rounded bg-red-400 size-[36px] flex items-center justify-center">
          <IconTrash />
        </button>
        <button onClick={handleSaveDocument} className=" bg-teal-700 hover:bg-teal-500 pl-2 pr-4 h-[36px] font-bold text-white rounded flex items-center gap-1">
          <IconFloppyDisk />
          Save Document
        </button>
      </header>
      {isDeleting && createPortal(<DeleteModal toggleModal={toggleDeleting} />, document.getElementById("portal")!)}
    </>
  );
};

export default Header;
