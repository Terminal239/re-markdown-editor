import { useLiveQuery } from "dexie-react-hooks";
import { getNodes } from "../actions/nodes";

type Props = {
  parentId?: number;
};

const useFiles = ({ parentId }: Props) => {
  const fileTree = useLiveQuery(() => getNodes(parentId)) ?? [];
  return fileTree;
};

export default useFiles;
