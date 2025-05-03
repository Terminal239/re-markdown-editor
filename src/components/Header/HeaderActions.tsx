import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Document } from "../../config/dexie";
import { saveDocument } from "../actions/files";
import { IconFileArrowDown, IconFloppyDisk, IconRotate } from "../Icons";
import Button from "../Reusable/Button";

type Props = {
  activeFile: Document;
};

const HeaderActions = ({ activeFile }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleSaveDocument = useCallback(async () => {
    setIsSaving(true);
    if (!activeFile) return;
    await saveDocument(activeFile);

    toast.success("Document saved!", {
      duration: 4000,
      icon: <IconFloppyDisk />,
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(handleSaveDocument, 30000);

    setIsSaving(false);
  }, [activeFile]);

  const handleDocumentExport = () => {
    const file = new Blob([activeFile?.content ?? ""], { type: "text/markdown" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = `${activeFile?.name ?? ""}.md`;
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
  }, [handleSaveDocument]);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return (
    <div className="ml-auto flex items-center">
      <Button
        tooltipMessage="Export Document"
        onClick={handleDocumentExport}
        icon={IconFileArrowDown}
        label="Export"
        className="h-[40px] bg-slate-700 px-2 lg:pr-3 lg:pl-2"
      />
      <Button
        tooltipMessage="Save Document"
        onClick={handleSaveDocument}
        icon={isSaving ? IconRotate : IconFloppyDisk}
        label={isSaving ? "Saving" : "Save Document"}
        loading={isSaving}
        className="h-[40px] bg-gray-700 px-2 lg:min-w-[180px] lg:pr-3 lg:pl-2"
      />
    </div>
  );
};

export default HeaderActions;
