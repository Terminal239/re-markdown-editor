import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../config/dexie";
import { Node } from "../types/types";

const useEditing = (): Node | null => {
  const file = useLiveQuery(async () => {
    return await db.appState.get("editing");
  });

  return file === undefined ? null : file.value;
};

export default useEditing;
