import "@fontsource-variable/source-code-pro";
import { ScrollSyncPane } from "react-scroll-sync";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { useUIDispatch, useUIState } from "../../context/UIContext";
import { IconEyeOpen, IconEyeSlash } from "../Icons";

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

  return (
    isEditorExpanded && (
      <div className="flex-1 border-r border-gray-500/40 flex flex-col overflow-hidden">
        <div className="bg-gray-200 px-4 py-2 items-center flex">
          Markdown
          <button className="ml-auto md:hidden" onClick={toggleEditor}>
            {isEditorExpanded ? <IconEyeSlash className="hover:text-gray-500" /> : <IconEyeOpen className="hover:text-gray-500" />}
          </button>
        </div>
        <div className="p-1 flex-1">
          <ScrollSyncPane>
            <textarea style={{ fontFamily: "Source Code Pro Variable, monospace" }} value={editing.content} className="text-sm p-3 size-full overflow-y-auto focus:outline-2 resize-none" onChange={handleEditing} />
          </ScrollSyncPane>
        </div>
      </div>
    )
  );
};

export default Editor;
