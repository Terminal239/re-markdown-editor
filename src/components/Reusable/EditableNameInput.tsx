import clsx from "clsx";
import React, { useEffect, useState } from "react";

type EditableNameInputProps = {
  isEditing: boolean;
  initialValue: string;
  onSave: (newName: string) => Promise<void> | void;
  onCancel: () => Promise<void> | void;
  validateFn: (name: string) => boolean;
  displaySuffix?: string;
  inputClassName?: string;
  textClassName?: string;
};

const EditableNameInput = ({
  isEditing,
  initialValue,
  onSave,
  onCancel,
  validateFn,
  displaySuffix = "",
  inputClassName = "",
  textClassName = "",
}: EditableNameInputProps) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const isValid = validateFn(currentValue);

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    if (currentValue !== undefined && isValid) {
      await onSave(currentValue);
    }

    await onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setCurrentValue(initialValue);
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className={clsx(
          "w-[16ch] bg-white pl-1 !text-[14px] text-black",
          !isValid && "outline outline-red-400",
          inputClassName,
        )}
        autoFocus
        onFocus={(e) => e.target.select()}
      />
    );
  }

  return (
    <span className={clsx("file-tree-entry-text", textClassName)}>
      {initialValue}
      {displaySuffix}
    </span>
  );
};

export default EditableNameInput;
