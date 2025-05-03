import clsx from "clsx";
import React from "react";

type FileTreeEntryLayoutProps = {
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  dataType: string;
  children: React.ReactNode;
  className?: string;

  activeClassName?: string;
};

const FileTreeEntryLayout = ({
  icon,
  onClick,
  isActive,
  dataType,
  children,
  className = "",

  activeClassName = "bg-gray-200",
}: FileTreeEntryLayoutProps) => {
  return (
    <div
      onClick={onClick}
      data-file-type={dataType}
      className={clsx("file-tree-entry-outer-container", isActive && activeClassName, className)}
    >
      {icon}
      <div className="file-tree-entry-inner-container">{children}</div>
    </div>
  );
};

export default FileTreeEntryLayout;
