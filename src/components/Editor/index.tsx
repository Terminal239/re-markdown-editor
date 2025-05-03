import "@fontsource-variable/source-code-pro";
import { ScrollSyncPane } from "react-scroll-sync";
import { saveDocument } from "../../actions/files";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import useActiveFile from "../../hooks/use-active-file";
import PaneHeader from "../Reusable/PaneHeader";

const Editor = () => {
  const activeFile = useActiveFile();

  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleContentChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeFile === null) return;

    event.preventDefault();
    await saveDocument({ ...activeFile, content: event.target.value });
  };

  const toggleEditor = () => uiDispatch({ type: "toggle-editor" });

  if (!isEditorExpanded) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-gray-500/40 lg:border-r">
      <PaneHeader
        title="Markdown"
        isExpanded={isEditorExpanded}
        onToggleClick={toggleEditor}
        toggleButtonClassName="lg:hidden"
      />
      <div className="size-full p-1">
        <ScrollSyncPane>
          <textarea
            style={{ fontFamily: "Source Code Pro Variable, monospace" }}
            value={activeFile?.content}
            className="block size-full resize-none overflow-y-auto p-3 text-sm focus:outline-2 focus:outline-black"
            onChange={handleContentChange}
          />
        </ScrollSyncPane>
      </div>
    </div>
  );
};

export default Editor;
