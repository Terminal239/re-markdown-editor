import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../config/dexie";
import { Node } from "../types/types";

const useSelectedNode = (): Node | null => {
  const entry = useLiveQuery(async () => await db.appState.get("selectedNode"));
  return entry?.value;
};

export default useSelectedNode;
