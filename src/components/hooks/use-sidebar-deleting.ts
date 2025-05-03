import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../config/dexie";

const useSidebarDeleting = () => {
  const id = useLiveQuery(async () => db.appState.get("sidebarDeleteId"))!;
  return id?.value;
};

export default useSidebarDeleting;
