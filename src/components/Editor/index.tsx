import "@fontsource-variable/source-code-pro";
import { useEffect, useRef, useState } from "react";
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

  const [draft, setDraft] = useState(editing.content);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(editing.content);
  }, [editing.content]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      dispatch({
        type: "edit",
        document: { ...editing, content: draft },
      });
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [draft, dispatch]);

  const handleEditing = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setDraft(event.target.value);
  };

  const toggleEditor = () => {
    uiDispatch({ type: "toggle-editor" });
  };

  if (!isEditorExpanded) {
    return null;
  }

  return (
    <div className="flex-1 border-r border-gray-500/40 flex flex-col overflow-hidden min-h-0">
      <PaneHeader title="Markdown" isExpanded={isEditorExpanded} onToggleClick={toggleEditor} toggleButtonClassName="ml-auto md:hidden" />
      <div className="p-1 size-full">
        <ScrollSyncPane>
          <textarea style={{ fontFamily: "Source Code Pro Variable, monospace" }} value={draft} className="text-sm p-3 size-full overflow-y-auto focus:outline-2 focus:outline-black resize-none block" onChange={handleEditing} />
        </ScrollSyncPane>
      </div>
    </div>
  );
};

export default Editor;
