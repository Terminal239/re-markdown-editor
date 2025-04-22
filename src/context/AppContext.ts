import { createContext } from "react";
import { Document } from "../reducer/document";

export const AppContext = createContext<Document[]>([]);
export const AppDispatchContext = createContext<React.ActionDispatch<[action: any]> | null>(null);
