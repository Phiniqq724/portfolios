import { createContext, useContext } from "react";

export type CursorMode =
  | { type: "default" }
  | { type: "image"; src: string; alt?: string }
  | { type: "label"; text: string };

export const CursorContext = createContext<{
  setCursorMode: (mode: CursorMode) => void;
}>({
  setCursorMode: () => {},
});

export const useCursor = () => useContext(CursorContext);
