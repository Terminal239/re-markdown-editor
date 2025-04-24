import { ScrollSyncPane } from "react-scroll-sync";
import { useAppDispatch, useAppState } from "../../context/AppContext";

type Props = {};

const Editor = (props: Props) => {
  const { editing } = useAppState();
  const dispatch = useAppDispatch();

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

  return (
    <div className="flex-1 border-r border-gray-500/40 flex flex-col overflow-hidden">
      <div className="bg-gray-200 px-4 py-2">Markdown</div>
      <div className="p-1 flex-1">
        <ScrollSyncPane>
          <textarea value={editing.content} className="p-3 size-full overflow-y-auto focus:outline-2 resize-none" onChange={handleEditing} />\
        </ScrollSyncPane>
      </div>
    </div>
  );
};

export default Editor;
