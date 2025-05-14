import saveAs from "file-saver";
import JSZip from "jszip";
import { isFolder } from "../lib/guard";
import { getNodes } from "./nodes";

const exportHelper = async (parentId: number, zip: JSZip) => {
  const files = await getNodes(parentId);

  for (const file of files) {
    if (isFolder(file)) {
      await exportHelper(file.id, zip.folder(`${file.name}-${file.id}`)!);
      continue;
    }

    zip.file(`${file.name}-${file.id}.md`, file.content!, {
      date: new Date(file.updatedAt),
    });
  }

  return zip;
};

const exportDocuments = async () => {
  const zip = await exportHelper(-1, new JSZip());
  const file = await zip.generateAsync({ type: "blob" });
  saveAs(file, "markdown-editor-exported.zip");
};

export { exportDocuments };
