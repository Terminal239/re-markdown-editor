import { toast } from "sonner";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { IconTrash } from "../Icons";
import ModalWrapper from "../Wrapper/ModalWrapper";

type Props = {
  toggleModal: () => void;
};

const DeleteModal = ({ toggleModal }: Props) => {
  const { editing } = useAppState();
  const dispatch = useAppDispatch();

  const handleDocumentDelete = () => {
    dispatch({ type: "DELETE_DOCUMENT" });
    toggleModal();

    toast.success("Document deleted.", {
      description: `Removed “${editing.name}”.`,
      duration: 5000,
      icon: <IconTrash />,
    });
  };

  return (
    <ModalWrapper toggleModal={toggleModal}>
      <div className="bg-white p-4 z-10 w-[320px] rounded">
        <p className="font-bold md:text-xl mb-2">Delete this document?</p>
        <p className="mb-4 text-sm md:text-base text-gray-600">
          Are you sure you want to delete the document named <span className="font-bold text-black">{editing.name}</span> and its contents? This action cannot be reversed.
        </p>
        <button onClick={handleDocumentDelete} className="h-[36px] text-sm md:text-base text-white font-bold rounded text-center bg-gray-400 w-full">
          Confirm & Delete
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
