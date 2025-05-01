import { useWindowSize } from "@uidotdev/usehooks";
import { ScrollSyncPane } from "react-scroll-sync";
import { useUIDispatch, useUIState } from "../../context/UIContext";

import useActiveFile from "../hooks/use-active-file";
import PaneHeader from "../Reusable/PaneHeader";
import MarkdownWrapper from "./MarkdownWrapper";

const Preview = () => {
  const editing = useActiveFile();

  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();
  const { width } = useWindowSize();

  const toggleEditor = () => {
    uiDispatch({
      type: "toggle-editor",
    });
  };

  if (isEditorExpanded && width! < 1024) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 lg:border-l border-gray-500/40 overflow-hidden min-h-0">
      <PaneHeader title="Preview" isExpanded={isEditorExpanded} onToggleClick={toggleEditor} />
      <ScrollSyncPane>
        <div className="flex-1 overflow-y-auto">
          <article className="prose prose-sm md:prose-base p-2 md:p-4 pb-12 max-md:flex-1 max-md:w-0 max-md:min-w-full md:max-w-[960px] mx-auto">
            <MarkdownWrapper content={editing?.content} />
          </article>
        </div>
      </ScrollSyncPane>
    </div>
  );
};

export default Preview;
