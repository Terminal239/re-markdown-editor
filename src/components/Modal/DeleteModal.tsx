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
      <div className="bg-white p-4 z-10 w-[320px] rounded">
        <p className="font-bold md:text-xl mb-2">Delete this {itemLabel}?</p>
        <p className="mb-4 text-sm md:text-base text-gray-600">
          Are you sure you want to delete the {itemLabel} named <span className="font-bold text-black">{activeFile?.name}</span>
          {isFolder ? " and all of its contents?" : " and its contents?"} This action cannot be reversed.
        </p>
        <button onClick={onClick} className="h-[36px] text-sm md:text-base text-white font-bold rounded text-center bg-red-400 hover:bg-red-500 w-full">
          Confirm & Delete {itemLabelCapital}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
