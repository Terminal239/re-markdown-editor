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

const PaneHeader: React.FC<PaneHeaderProps> = ({
  title,
  isExpanded,
  onToggleClick,
  toggleButtonClassName = "",
}) => {
  return (
    <div className="flex h-[32px] flex-shrink-0 items-center bg-gray-200 px-4 py-2 text-sm text-gray-700">
      {title}
      <Button
        tooltipMessage="Toggle Preview"
        onClick={onToggleClick}
        icon={isExpanded ? IconEyeSlash : IconEyeOpen}
        className={clsx("ml-auto !text-gray-700 hover:!text-gray-400", toggleButtonClassName)}
      />
    </div>
  );
};

export default PaneHeader;
