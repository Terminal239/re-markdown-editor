import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  toggleModal: () => void;
};

const ModalWrapper = ({ children, toggleModal }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-full bg-black/25 absolute inset-0" onClick={toggleModal}></div>
      {children}
    </div>
  );
};

export default ModalWrapper;
