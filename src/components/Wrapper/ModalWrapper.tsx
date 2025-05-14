import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  closeModal: () => void;
};

const ModalWrapper = ({ children, closeModal }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 size-full bg-black/25" onClick={closeModal}></div>
      {children}
    </div>
  );
};

export default ModalWrapper;
