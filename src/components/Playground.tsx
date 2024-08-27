import CodeEditor from "./CodeEditor";
import FileTree from "./FileTree";
import Terminal from "./Terminal";

const Playground = () => {
  return (
    <main className="flex min-h-screen">
      <FileTree />
      <div className="flex flex-col w-full">
        <CodeEditor />
        <Terminal />
      </div>
    </main>
  );
};

export default Playground;
