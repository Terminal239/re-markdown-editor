import { useWindowSize } from "@uidotdev/usehooks";
import { ScrollSyncPane } from "react-scroll-sync";
import { useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconEyeOpen, IconEyeSlash } from "../Icons";
import MarkdownWrapper from "./MarkdownWrapper";

type Props = {};

const Preview = (props: Props) => {
  const { editing } = useAppState();
  const { isEditorExpanded } = useUIState();
  const uiDispatch = useUIDispatch();
  const { width } = useWindowSize();

  const toggleEditor = () => {
    uiDispatch({
      type: "toggle-editor",
    });
  };

  return (
    (!isEditorExpanded || width! >= 768) && (
      <div className="flex flex-col flex-1 border-gray-500/40 overflow-hidden min-h-0">
        <div className="bg-gray-200 px-4 py-2 items-center flex">
          Preview
          <button className="ml-auto" onClick={toggleEditor}>
            {isEditorExpanded ? <IconEyeSlash className="hover:text-gray-500" /> : <IconEyeOpen className="hover:text-gray-500" />}
          </button>
        </div>
        <ScrollSyncPane>
          <div className="flex-1 overflow-y-auto">
            <article className="prose prose-sm md:prose-base  p-4 pb-12 max-w-[960px] mx-auto">
              <MarkdownWrapper content={editing.content} />
            </article>
          </div>
        </ScrollSyncPane>
      </div>
    )
  );
};

export default Preview;
