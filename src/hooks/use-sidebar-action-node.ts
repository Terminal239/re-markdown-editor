import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../config/dexie";
import { SidebarAction } from "../types/types";

const useSidebarAction = (): SidebarAction | undefined => {
  const entry = useLiveQuery(async () => await db.appState.get("sidebarAction"));
  return entry?.value;
};

export default useSidebarAction;
