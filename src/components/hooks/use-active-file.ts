import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../config/dexie";

const useActiveFile = () => {
  const editing = useLiveQuery(async () => {
    const state = await db.appState.get("activeFileId");
    return db.files.get(state?.value);
  })!;

  return editing;
};

export default useActiveFile;
