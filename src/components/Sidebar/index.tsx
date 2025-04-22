import clsx from "clsx";
import { formatDistance } from "date-fns";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { createDocument, Document } from "../../reducer/document";

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
    <aside className="w-[256px] bg-orange-50 p-4">
      <button onClick={handleCreateNewDocument} className="w-full py-2 bg-orange-400 hover:bg-orange-500 cursor-pointer text-white rounded mb-4">
        New Document
      </button>
      {documents
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .map((document) => (
          <div className="flex flex-col mb-2 last-of-type:mb-0">
            <div onClick={() => handleItemClick(document)} className={clsx("flex items-center gap-2 font-medium hover:underline w-fit cursor-pointer", editing.id === document.id && "text-orange-400")}>
              <span>{document.name}</span>
              {editing.id === document.id && <div className="size-[8px] rounded-full bg-orange-400"></div>}
            </div>
            <span className="text-sm text-gray-700">{formatDate(document.updatedAt)}</span>
          </div>
        ))}
    </aside>
  );
};

export default Sidebar;
