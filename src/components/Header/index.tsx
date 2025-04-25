import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconDocument, IconFloppyDisk, IconMenu, IconRotate, IconTrash, IconXMark } from "../Icons";
import DeleteModal from "../Modal/DeleteModal";

const Header = () => {
  const { editing } = useAppState();
  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();
  const dispatch = useAppDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [documentName, setDocumentName] = useState(editing.name);
  const timeoutRef = useRef<number>(null);

  // Handle document renaming
  const handleRenameDocument = () => {
    dispatch({
      type: "rename",
      document: { ...editing, name: documentName, updatedAt: new Date() },
    });
    toast.success("Document renamed.", {
      description: `New name: ${documentName}`,
      action: {
        label: "Undo",
        onClick: () => dispatch({ type: "rename", document: { ...editing, name: editing.name, updatedAt: new Date() } }),
      },
      duration: 5000,
      onAutoClose: () => console.log("Rename toast auto-closed"),
      onDismiss: () => console.log("Rename toast manually dismissed"),
    });
  };

  // Handle save action with auto-save and toast details
  const handleSaveDocument = () => {
    setIsSaving(true);
    dispatch({ type: "save" });

    setTimeout(() => {
      setIsSaving(false);
      const timestamp = new Date().toLocaleTimeString();
      toast.success("Document saved.", {
        description: `Saved at ${timestamp}`,
        duration: 4000,
        icon: <IconFloppyDisk />, // custom icon
        onAutoClose: () => console.log("Save toast closed after timeout"),
        onDismiss: () => console.log("Save toast dismissed by user"),
      });
    }, 1000);

    // Schedule next auto-save in 30 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      handleSaveDocument();
    }, 30000);
  };

  // Keyboard shortcut: Ctrl+S for save
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSaveDocument();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Sync local name with global editing state
  useEffect(() => {
    setDocumentName(editing.name);
  }, [editing.name]);

  // Toggles
  const toggleEditing = () => {
    if (isEditing) handleRenameDocument();
    setIsEditing((prev) => !prev);
  };
  const toggleDeleting = () => setIsDeleting((prev) => !prev);
  const handleToggleSidebar = () => uiDispatch({ type: "toggle-sidebar" });

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
        <button onClick={toggleDeleting} className="ml-auto text-white hover:bg-gray-200 hover:text-gray-500 md:rounded bg-gray-400 size-[40px] flex items-center justify-center">
          <IconTrash />
        </button>
        <button onClick={handleSaveDocument} className="bg-gray-700 md:min-w-[180px] px-2 md:pr-3 md:pl-2 text-center hover:bg-gray-500 justify-center size-[40px] font-bold text-white md:rounded flex items-center gap-1">
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
