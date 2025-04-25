import React from "react";
import { IconEyeOpen, IconEyeSlash } from "../Icons";

type PaneHeaderProps = {
  title: string;
  isExpanded: boolean;
  onToggleClick: () => void;
  toggleButtonClassName?: string;
};

const PaneHeader: React.FC<PaneHeaderProps> = ({ title, isExpanded, onToggleClick, toggleButtonClassName = "ml-auto" }) => {
  return (
    <div className="bg-gray-200 text-sm sm:text-base px-4 py-2 items-center flex flex-shrink-0">
      {title}
      <button className={toggleButtonClassName} onClick={onToggleClick}>
        {isExpanded ? <IconEyeSlash className="hover:text-gray-500" /> : <IconEyeOpen className="hover:text-gray-500" />}
      </button>
    </div>
  );
};

export default PaneHeader;
