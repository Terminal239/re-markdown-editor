import clsx from "clsx";
import { formatDistance } from "date-fns";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { createDocument, Document } from "../../reducer/document";
import { IconDocument } from "../Icons";

type Props = {};

const Sidebar = (props: Props) => {
  const { editing, documents } = useAppState();
  const dispatch = useAppDispatch();

  const formatDate = (date: Date) => formatDistance(date, new Date(), { addSuffix: true });

  const handleCreateNewDocument = () => {
    dispatch({
      type: "create",
      document: createDocument(),
    });
  };

  const handleItemClick = (document: Document) => {
    dispatch({
      type: "select-document",
      document,
    });
  };

  return (
    <aside className="min-w-[256px] bg-gray-50 md:p-4">
      <button onClick={handleCreateNewDocument} className="w-full py-2 bg-gray-400 hover:bg-gray-500 cursor-pointer text-white md:rounded mb-2 md:mb-4">
        New Document
      </button>
      {documents
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .map((document) => (
          <div key={document.id} className="mb-2 flex items-center text-gray-700 gap-2 last-of-type:mb-0 max-md:pl-2 md:-ml-1">
            <IconDocument />
            <div className="flex flex-col">
              <div onClick={() => handleItemClick(document)} className={clsx("flex items-center gap-2 font-medium hover:underline w-fit cursor-pointer -mb-1", editing.id === document.id && "text-gray-400")}>
                <span>{document.name}.md</span>
                {editing.id === document.id && <div className="size-[8px] rounded-full bg-gray-400"></div>}
              </div>
              <span className="text-[12px]">{formatDate(document.updatedAt)}</span>
            </div>
          </div>
        ))}
    </aside>
  );
};

export default Sidebar;
