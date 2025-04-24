import "@fontsource-variable/source-code-pro";
import { ScrollSyncPane } from "react-scroll-sync";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import PaneHeader from "../Reusable/PaneHeader";

type Props = {};

const Editor = (props: Props) => {
  const { editing } = useAppState();
  const dispatch = useAppDispatch();

  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();

  const handleEditing = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    dispatch({
      type: "edit",
      document: {
        ...editing,
        content: event.target.value,
      },
    });
  };

  const toggleEditor = () => {
    uiDispatch({
      type: "toggle-editor",
    });
  };

  if (!isEditorExpanded) {
    return null;
  }

  return (
    <div className="flex-1 border-r border-gray-500/40 flex flex-col overflow-hidden min-h-0">
      <PaneHeader title="Markdown" isExpanded={isEditorExpanded} onToggleClick={toggleEditor} toggleButtonClassName="ml-auto md:hidden" />
      <ScrollSyncPane>
        <textarea style={{ fontFamily: "Source Code Pro Variable, monospace" }} value={editing.content} className="text-sm p-3 size-full overflow-y-auto focus:outline-2 resize-none block" onChange={handleEditing} />
      </ScrollSyncPane>
    </div>
  );
};

export default Editor;
