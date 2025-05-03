import { useLiveQuery } from "dexie-react-hooks";
import { getFolderTree } from "../actions/folders";

type Props = {
  parentId?: number;
};

const useFiles = ({ parentId }: Props) => {
  const fileTree = useLiveQuery(() => getFolderTree(parentId)) ?? [];
  return fileTree;
};

export default useFiles;
