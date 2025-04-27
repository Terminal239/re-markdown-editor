import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconDocument, IconFileArrowDown, IconFloppyDisk, IconMenu, IconRotate, IconXMark } from "../Icons";
import Button from "../Reusable/Button";

const Header = () => {
  const { editing } = useAppState();
  const { isSidebarOpen } = useUIState();
  const uiDispatch = useUIDispatch();
  const dispatch = useAppDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [documentName, setDocumentName] = useState(editing.name);
  const timeoutRef = useRef<number | null>(null);

  const handleRenameDocument = () => {
    if (documentName.length === 0) {
      toast.error("Document name cannot be blank", {
        duration: 5000,
      });
      setDocumentName(editing.name);
      return;
    }

    dispatch({
      type: "RENAME_DOCUMENT",
      name: documentName,
    });

    toast.success(
      <p>
        Document renamed to <span className="font-bold">{documentName}</span>
      </p>,
      {
        duration: 5000,
      }
    );
  };

  const handleSaveDocument = () => {
    setIsSaving(true);
    dispatch({ type: "SAVE_DOCUMENT" });

    toast.success("Document saved!", {
      duration: 4000,
      icon: <IconFloppyDisk />,
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(handleSaveDocument, 30000);

    setIsSaving(false);
  };

  const handleDocumentExport = () => {
    const file = new Blob([editing.content], { type: "text/markdown" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = `${editing.name}.md`;
    a.click();
  };

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

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    setDocumentName(editing.name);
  }, [editing.name]);

  const toggleEditing = () => {
    if (isEditing) handleRenameDocument();
    setIsEditing((prev) => !prev);
  };

  const handleToggleSidebar = () => uiDispatch({ type: "toggle-sidebar" });

  return (
    <>
      <header className="flex items-center lg:gap-4">
        <Button tooltipMessage="Toggle Sidebar" onClick={handleToggleSidebar} icon={isSidebarOpen ? IconXMark : IconMenu} className="size-[40px] bg-gray-700" />
        <span className="hidden lg:inline uppercase tracking-[8px] font-bold">Markdown</span>
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
        <div className="ml-auto flex items-center">
          <Button tooltipMessage="Export Document" onClick={handleDocumentExport} icon={IconFileArrowDown} label="Export" className="bg-slate-700 px-2 lg:pr-3 lg:pl-2 h-[40px]" />
          <Button
            tooltipMessage="Save Document"
            onClick={handleSaveDocument}
            icon={isSaving ? IconRotate : IconFloppyDisk}
            label={isSaving ? "Saving" : "Save Document"}
            loading={isSaving}
            className="bg-gray-700 lg:min-w-[180px] px-2 lg:pr-3 lg:pl-2 h-[40px]"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
