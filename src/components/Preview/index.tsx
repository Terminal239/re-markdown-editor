import { useWindowSize } from "@uidotdev/usehooks";
import { ScrollSyncPane } from "react-scroll-sync";
import { useUIDispatch, useUIState } from "../../context/UIContext";

import clsx from "clsx";
import useEditing from "../../hooks/use-editing";
import { toggleEditor } from "../../reducer/ui";
import PaneHeader from "../Reusable/PaneHeader";
import MarkdownWrapper from "./MarkdownWrapper";

const Preview = () => {
  const editing = useEditing();
  const uiDispatch = useUIDispatch();

  const { isEditorExpanded } = useUIState();

  const { width } = useWindowSize();

  if (isEditorExpanded && width! < 1024) return null;

  if (editing === null) return null;

  return (
    <div
      className={clsx(
        "flex min-h-0 flex-1 flex-col overflow-hidden border-gray-500/40 lg:border-l",
        !isEditorExpanded && "!border-none",
      )}
    >
      <PaneHeader
        title="Preview"
        isExpanded={isEditorExpanded}
        onToggleClick={() => toggleEditor(uiDispatch)}
      />
      <ScrollSyncPane>
        <div className="flex-1 overflow-y-auto">
          <article className="prose prose-sm md:prose-base mx-auto p-2 pb-12 max-md:w-0 max-md:min-w-full max-md:flex-1 md:max-w-[960px] md:p-4">
            <MarkdownWrapper content={editing.content!} />
          </article>
        </div>
      </ScrollSyncPane>
    </div>
  );
};

export default Preview;
