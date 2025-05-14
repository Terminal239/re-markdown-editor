import "@fontsource-variable/source-code-pro";
import { ScrollSyncPane } from "react-scroll-sync";
import { updateNode } from "../../actions/nodes";
import { setEditing } from "../../actions/state";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import useEditing from "../../hooks/use-editing";
import { toggleEditor } from "../../reducer/ui";
import { Node } from "../../types/types";
import PaneHeader from "../Reusable/PaneHeader";
import { useState, useEffect, useRef, useCallback } from "react";

const Editor = () => {
  const editing = useEditing();
  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();

  // LOCAL buffer for the textarea
  const [content, setContent] = useState(editing?.content || "");

  // Whenever you switch documents, reseed the buffer
  useEffect(() => {
    setContent(editing?.content || "");
  }, [editing?.id]);

  // Ref so we can optionally restore scroll
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // onEveryKeystroke: update local, then fire off save
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);

    if (!editing) return;

    // Capture scroll before we touch Dexie
    const scrollPos = textareaRef.current?.scrollTop ?? 0;

    // Fire-and-forget; if you want back‑pressure you can await here
    ;(async () => {
      const updated: Node = { ...editing, content: newValue };
      await updateNode(updated);
      await setEditing(updated);
      // Restore scroll (in case Dexie‑update bumped the DOM)
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.scrollTop = scrollPos;
        }
      });
    })();
  }, [editing]);

  if (!isEditorExpanded) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-gray-500/40 lg:border-r">
      <PaneHeader
        title="Markdown"
        isExpanded={isEditorExpanded}
        onToggleClick={() => toggleEditor(uiDispatch)}
        toggleButtonClassName="lg:hidden"
      />
      <div className="size-full p-1">
        <ScrollSyncPane>
          <textarea
            ref={textareaRef}
            style={{ fontFamily: "Source Code Pro Variable, monospace" }}
            value={content}
            className="block size-full resize-none overflow-y-auto p-3 text-sm focus:outline-2 focus:outline-black"
            onChange={handleChange}
          />
        </ScrollSyncPane>
      </div>
    </div>
  );
};

export default Editor;
