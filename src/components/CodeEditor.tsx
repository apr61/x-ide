import { Editor } from "@monaco-editor/react";
import { usePlayground } from "../hooks/usePlayground";

const CodeEditor = () => {
  return (
    <div className="flex-1 w-full h-full">
      <BreadCrumb />
      <Editor theme="vs-dark" />
    </div>
  );
};

export default CodeEditor;

const BreadCrumb = () => {
  const { selectedFile } = usePlayground();
  return (
    <div>
      {selectedFile?.split("/").map((name) => (
        <span key={name}>{name} &gt;</span>
      ))}
    </div>
  );
};
