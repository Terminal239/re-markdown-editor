import { useLiveQuery } from "dexie-react-hooks";
import { getFolderTree } from "../actions/folders";

type Props = {
  parentId?: number;
};

const useFiles = ({ parentId }: Props) => {
  const documents = useLiveQuery(() => getFolderTree(parentId)) ?? [];
  return documents;
};

export default useFiles;
