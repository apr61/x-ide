import { useContext } from "react";
import { PlaygroundContext } from "../context/Playground";

export const usePlayground = () => {
  const context = useContext(PlaygroundContext);
  if (context) {
    return context;
  }
  throw new Error("Playground dcontext used out of scope");
};
