import ModalWrapper from "../Wrapper/ModalWrapper";
import useActiveFile from "../hooks/use-active-file";

type Props = {
  toggleModal: () => void;
  onClick: () => void;
  type: "FOLDER" | "DOCUMENT";
};

const DeleteModal = ({ toggleModal, onClick, type }: Props) => {
  const activeFile = useActiveFile();

  // Determine labels based on type
  const isFolder = type === "FOLDER";
  const itemLabel = isFolder ? "folder" : "document";
  const itemLabelCapital = isFolder ? "Folder" : "Document";

  return (
    <ModalWrapper toggleModal={toggleModal}>
      <div className="z-10 w-[320px] rounded bg-white p-4">
        <p className="mb-2 font-bold md:text-xl">Delete this {itemLabel}?</p>
        <p className="mb-4 text-sm text-gray-600 md:text-base">
          Are you sure you want to delete the {itemLabel} named{" "}
          <span className="font-bold text-black">{activeFile?.name}</span>
          {isFolder ? " and all of its contents?" : " and its contents?"} This action cannot be
          reversed.
        </p>
        <button
          onClick={onClick}
          className="h-[36px] w-full rounded bg-red-400 text-center text-sm font-bold text-white hover:bg-red-500 md:text-base"
        >
          Confirm & Delete {itemLabelCapital}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
