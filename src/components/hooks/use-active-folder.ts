import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../config/dexie";

const useActiveFolder = () => {
  const folderId = useLiveQuery(async () => db.appState.get("activeFolderId"))!;
  return folderId?.value;
};

export default useActiveFolder;
