import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconDocument, IconFloppyDisk, IconMenu, IconRotate, IconTrash, IconXMark } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";

type Props = {};

const Header = (props: Props) => {
  const { editing } = useAppState();

  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [documentName, setDocumentName] = useState(editing.name);
  const timeoutRef = useRef<number | undefined>(undefined);
  const dispatch = useAppDispatch();

  const handleDocumentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(event.target.value);
  };

  const toggleEditing = () => {
    if (isEditing) handleRenameDocument();

    setIsEditing((prev) => !prev);
  };

  const toggleDeleting = () => {
    setIsDeleting((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    uiDispatch({
      type: "toggle-sidebar",
    });
  };

  const handleSaveDocument = () => {
    setIsSaving(true);

    dispatch({
      type: "save",
    });

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleSaveDocument();
    }, 30000);
  };

  const handleRenameDocument = () => {
    dispatch({
      type: "rename",
      document: {
        ...editing,
        name: documentName,
        updatedAt: new Date(),
      },
    });
  };

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      handleSaveDocument();
    }
  });

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    setDocumentName(editing.name);
  }, [editing.name]);

  return (
    <>
      <header className="md:pr-4 flex items-center md:gap-4">
        <button className="size-[40px] md:size-[60px] text-white font-bold flex items-center justify-center bg-gray-700 hover:bg-gray-500" onClick={handleToggleSidebar}>
          {isSidebarOpen ? <IconXMark /> : <IconMenu />}
        </button>
        <span className="hidden md:inline uppercase tracking-[8px] font-bold">Markdown</span>
        <div className="flex items-center gap-2 md:border-l md:pl-4">
          <IconDocument className="hidden md:block" />
          <div className="flex flex-col">
            <span className="text-[12px] -mb-1 text-gray-700 hidden md:inline">Document Name</span>
            <span onClick={toggleEditing} className="max-md:ml-2 text-sm md:text-base cursor-pointer font-medium md:font-bold">
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
        <button onClick={toggleDeleting} className="ml-auto text-white hover:bg-gray-200 hover:text-gray-500 md:rounded bg-gray-400 size-[40px] flex items-center justify-center">
          <IconTrash />
        </button>
        <button onClick={handleSaveDocument} className=" bg-gray-700 md:min-w-[180px] px-2 md:pr-3 md:pl-2 text-center hover:bg-gray-500 justify-center size-[40px] font-bold text-white md:rounded flex items-center gap-1">
          {isSaving ? (
            <>
              <IconRotate className="animate-spin" />
              <span className="hidden md:block">Saving</span>
            </>
          ) : (
            <>
              <IconFloppyDisk />
              <span className="hidden md:block">Save Document</span>
            </>
          )}
        </button>
      </header>
      {isDeleting && createPortal(<DeleteModal toggleModal={toggleDeleting} />, document.getElementById("portal")!)}
    </>
  );
};

export default Header;
