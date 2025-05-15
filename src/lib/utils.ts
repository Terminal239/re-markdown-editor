import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { checkForDuplicates } from "../actions/nodes";
import { Node } from "../types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateName = async (node: Node) => {
  const filenameRegex = /^(?![ .])(?!.*[ .]$)(?!.*[/\\:*?"<>|]).{1,255}$/;
  if (!filenameRegex.test(node.name)) return false;

  const hasDuplicates = await checkForDuplicates(node);
  return !hasDuplicates;
};
