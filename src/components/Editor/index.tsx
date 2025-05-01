import "@fontsource-variable/source-code-pro";
import { ScrollSyncPane } from "react-scroll-sync";
import { saveDocument } from "../../config/dexie";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import PaneHeader from "../Reusable/PaneHeader";
import useActiveFile from "../hooks/use-active-file";

const Editor = () => {
  const editing = useActiveFile();

  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleEditing = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    await saveDocument({ ...editing, content: event.target.value });
  };

  const toggleEditor = () => {
    uiDispatch({ type: "toggle-editor" });
  };

  if (!isEditorExpanded) {
    return null;
  }

  return (
    <div className="flex-1 lg:border-r border-gray-500/40 flex flex-col overflow-hidden min-h-0">
      <PaneHeader title="Markdown" isExpanded={isEditorExpanded} onToggleClick={toggleEditor} toggleButtonClassName="lg:hidden" />
      <div className="p-1 size-full">
        <ScrollSyncPane>
          <textarea style={{ fontFamily: "Source Code Pro Variable, monospace" }} value={editing?.content} className="text-sm p-3 size-full overflow-y-auto focus:outline-2 focus:outline-black resize-none block" onChange={handleEditing} />
        </ScrollSyncPane>
      </div>
    </div>
  );
};

export default Editor;
