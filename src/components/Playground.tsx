import CodeEditor from "./CodeEditor";
import FileTree from "./FileTree";
import Terminal from "./Terminal";
import { fileTree } from "../data/filetree";

const Playground = () => {
  const onSelect = (path: String) => {
    console.log(path);
  };
  return (
    <main className="flex min-h-screen">
      <FileTree filetree={fileTree} onSelect={onSelect} />
      <div className="flex flex-col w-full">
        <CodeEditor />
        <Terminal />
      </div>
    </main>
  );
};

export default Playground;
