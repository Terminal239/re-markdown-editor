import clsx from "clsx";
import React from "react";
import { IconEyeOpen, IconEyeSlash } from "../Icons";
import Button from "./Button";

type PaneHeaderProps = {
  title: string;
  isExpanded: boolean;
  onToggleClick: () => void;
  toggleButtonClassName?: string;
};

const PaneHeader: React.FC<PaneHeaderProps> = ({ title, isExpanded, onToggleClick, toggleButtonClassName = "" }) => {
  return (
    <div className="bg-gray-200  h-[32px] text-sm sm:text-base px-4 py-2 items-center flex flex-shrink-0">
      {title}
      <Button tooltipMessage="Toggle Preview" onClick={onToggleClick} icon={isExpanded ? IconEyeSlash : IconEyeOpen} className={clsx("ml-auto !text-gray-700 hover:!text-gray-400", toggleButtonClassName)} />
    </div>
  );
};

export default PaneHeader;
