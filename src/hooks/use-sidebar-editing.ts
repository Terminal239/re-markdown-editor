import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../config/dexie";

const useSidebarEditing = () => {
  const id = useLiveQuery(async () => db.appState.get("sidebarRenameId"))!;
  return id?.value;
};

export default useSidebarEditing;
