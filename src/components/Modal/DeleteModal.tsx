import toast from "react-hot-toast";
import { deleteNode } from "../../actions/nodes";
import { isFolder } from "../../lib/guard";
import { SidebarAction } from "../../types/types";
import ModalWrapper from "../Wrapper/ModalWrapper";

type Props = {
  sidebarAction: SidebarAction;
  closeModal: () => void;
};

const DeleteModal = ({ sidebarAction, closeModal }: Props) => {
  const isNodeFolder = isFolder(sidebarAction?.node);
  const itemLabel = isNodeFolder ? "folder" : "document";
  const itemLabelCapital = isNodeFolder ? "Folder" : "Document";

  const handleSidebarDelete = async () => {
    if (sidebarAction === undefined) return;

    await deleteNode(sidebarAction);

    const itemLabelCapital = isNodeFolder ? "Folder" : "Document";
    toast.success(`${itemLabelCapital} deleted successfully!`, {
      duration: 5000,
    });

    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="z-10 w-[320px] rounded bg-white p-4">
        <p className="mb-2 font-bold md:text-xl">Delete this {itemLabel}?</p>
        <p className="mb-4 text-sm text-gray-600 md:text-base">
          Are you sure you want to delete the {itemLabel} named{" "}
          <span className="font-bold text-black">{sidebarAction.node.name}</span>
          {isNodeFolder ? " and all of its contents?" : " and its contents?"} This action cannot be
          reversed.
        </p>
        <button
          onClick={handleSidebarDelete}
          className="h-[36px] w-full rounded bg-red-400 text-center text-sm font-bold text-white hover:bg-red-500 md:text-base"
        >
          Confirm & Delete {itemLabelCapital}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
