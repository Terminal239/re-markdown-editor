import { useLiveQuery } from "dexie-react-hooks";
import { db, Document } from "../../config/dexie";

const useActiveFile = (): Document | null => {
  const editing = useLiveQuery(async () => {
    const state = await db.appState.get("activeFileId");
    return db.files.get(state?.value);
  })!;

  return editing === undefined ? null : editing;
};

export default useActiveFile;
