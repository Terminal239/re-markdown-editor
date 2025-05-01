import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../config/dexie";

const useFiles = () => {
  const documents = useLiveQuery(() => db.files.toArray()) ?? [];
  return documents;
};

export default useFiles;
