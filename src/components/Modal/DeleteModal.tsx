import { useAppDispatch, useAppState } from "../../context/AppContext";
import { createDocument } from "../../reducer/document";
import ModalWrapper from "../Wrapper/ModalWrapper";

type Props = {
  toggleModal: () => void;
};

const DeleteModal = ({ toggleModal }: Props) => {
  const { documents, editing } = useAppState();
  const dispatch = useAppDispatch();

  const handleDocumentDelete = () => {
    dispatch({
      type: "delete",
      document: documents.length > 1 ? documents[0] : createDocument(),
    });
    toggleModal();
  };

  return (
    <ModalWrapper toggleModal={toggleModal}>
      <div className="bg-white p-4 z-10 w-[320px] rounded">
        <p className="font-bold text-xl mb-2">Delete this document?</p>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete the document named <span className="font-bold text-black">{editing.name}</span> and its contents? This action cannot be reversed.
        </p>
        <button onClick={handleDocumentDelete} className="h-[36px] text-white font-bold rounded text-center bg-red-400 w-full">
          Confirm & Delete
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
