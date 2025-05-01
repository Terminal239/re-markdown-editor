import toast from "react-hot-toast";
import { deleteDocument } from "../../config/dexie";
import ModalWrapper from "../Wrapper/ModalWrapper";
import useActiveFile from "../hooks/use-active-file";

type Props = {
  toggleModal: () => void;
};

const DeleteModal = ({ toggleModal }: Props) => {
  const editing = useActiveFile();

  const handleDocumentDelete = async () => {
    await deleteDocument(editing?.id);
    toggleModal();

    toast.success("Document deleted successfully!", {
      duration: 5000,
    });
  };

  return (
    <ModalWrapper toggleModal={toggleModal}>
      <div className="bg-white p-4 z-10 w-[320px] rounded">
        <p className="font-bold md:text-xl mb-2">Delete this document?</p>
        <p className="mb-4 text-sm md:text-base text-gray-600">
          Are you sure you want to delete the document named <span className="font-bold text-black">{editing?.name}</span> and its contents? This action cannot be reversed.
        </p>
        <button onClick={handleDocumentDelete} className="h-[36px] text-sm md:text-base text-white font-bold rounded text-center bg-gray-400 w-full">
          Confirm & Delete
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
