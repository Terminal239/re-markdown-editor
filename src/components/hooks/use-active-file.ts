import { useLiveQuery } from "dexie-react-hooks";
import { db, Document } from "../../config/dexie";

const useActiveFile = (): Document | null => {
  const file = useLiveQuery(async () => {
    const state = await db.appState.get("activeFileId");
    return db.files.get(state?.value);
  })!;

  return file === undefined ? null : file;
};

export default useActiveFile;
