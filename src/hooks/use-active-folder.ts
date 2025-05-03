import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../config/dexie";

const useActiveFolder = () => {
  const folder = useLiveQuery(async () => {
    const state = await db.appState.get("activeFolderId");
    return db.folders.get(state?.value);
  })!;

  return folder === undefined ? null : folder;
};

export default useActiveFolder;
