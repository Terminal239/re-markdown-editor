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
    <div className="flex-1 flex border overflow-y-auto">
      <textarea value={editing.content} className="p-2 flex-1 resize-none" onChange={handleEditing} />
    </div>
  );
};

export default Editor;
