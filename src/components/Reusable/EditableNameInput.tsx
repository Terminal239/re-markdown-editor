import clsx from "clsx";
import React, { useState } from "react";
import { updateNode } from "../../actions/nodes";
import { resetSidebarAction } from "../../actions/state";
import { validateName } from "../../lib/utils";
import { Node } from "../../types/types";

type EditableNameInputProps = {
  node: Node;
  isEditing: boolean;
  onCancel: () => Promise<void> | void;
  displaySuffix?: string;
  inputClassName?: string;
  textClassName?: string;
};

const EditableNameInput = React.memo(
  ({
    node,
    isEditing,
    onCancel,
    displaySuffix = "",
    inputClassName = "",
    textClassName = "",
  }: EditableNameInputProps) => {
    const [currentValue, setCurrentValue] = useState(node.name);
    const [isValid, setIsValid] = useState(true);

    const validate = async (name: string) => {
      const isValid = await validateName({ ...node, name });
      setIsValid(isValid);
    };

    const handleChange = async (name: string) => {
      setCurrentValue(name);
      await validate(name);
    };

    const handleRename = async (name: string) => {
      await updateNode({ ...node, name });
      await resetSidebarAction();
    };

    const handleSave = async () => {
      if (currentValue !== undefined && (await isValid)) {
        await handleRename(currentValue);
      }

      await onCancel();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        setCurrentValue(node.name);
        onCancel();
      }
    };

    if (isEditing) {
      return (
        <input
          type="text"
          value={currentValue}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
            await handleChange(e.target.value)
          }
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
        {node.name}
        {displaySuffix}
      </span>
    );
  },
);

export default EditableNameInput;
