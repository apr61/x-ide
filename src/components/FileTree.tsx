import { PropsWithChildren, useState } from "react";
import { FileTreeType } from "../types/api";
import {
  FileAddOutlined,
  FileOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { usePlayground } from "../hooks/usePlayground";

type DirectoryProps = {
  name: String;
  path: String;
} & PropsWithChildren;

const Directory = ({ name, children, path }: DirectoryProps) => {
  const [isOpen, setIsopen] = useState(false);
  const { selectedFile, setSelectedFile } = usePlayground();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsopen((prev) => !prev);
    setSelectedFile(path);
  };

  return (
    <div className="my-1 relative">
      <p
        onClick={(e) => handleOnClick(e)}
        className={`cursor-pointer flex gap-2 items-center hover:bg-gray-700 p-1 ${
          selectedFile === path ? "bg-gray-600" : ""
        }`}
      >
        {isOpen ? <FolderOpenOutlined /> : <FolderOutlined />}
        <span>{name}</span>
      </p>
      {isOpen && (
        <button
          className="absolute top-9 left-2 w-[2px] h-[calc(100%-2.5rem)] bg-gray-500"
          onClick={() => setIsopen((prev) => !prev)}
        ></button>
      )}
      {isOpen && children}
    </div>
  );
};

type BuildFileTreeProps = {
  nodes: FileTreeType | null;
  fileName: String;
  filePath: String;
  onSelect: (path: String) => void;
};

const BuildFileTree = ({
  nodes,
  fileName,
  filePath,
  onSelect,
}: BuildFileTreeProps) => {
  const { selectedFile, setSelectedFile } = usePlayground();
  const isDir = !!nodes;

  const handleOnClick = () => {
    onSelect(filePath);
    setSelectedFile(filePath);
  };

  return (
    <div className="ml-4">
      {isDir ? (
        <Directory name={fileName} path={filePath}>
          {/* <div className="my-1 ml-4 max-w-full flex gap-2 items-center">
            <FolderOutlined />
            <input
              type="text"
              className="w-full bg-transparent focus-visible:outline-none border border-gray-700"
              autoFocus
            />
          </div> */}
					
          <ul>
            {Object.keys(nodes).map((child) => (
              <li key={child} className="my-[2px]">
                <BuildFileTree
                  nodes={nodes[child]}
                  fileName={child}
                  filePath={filePath + "/" + child}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ul>
        </Directory>
      ) : (
        <p
          className={`cursor-pointer flex gap-2 hover:bg-gray-700 p-1 ${
            selectedFile === filePath ? "bg-gray-600" : ""
          }`}
          onClick={handleOnClick}
        >
          <FileOutlined />
          <span>{fileName}</span>
        </p>
      )}
    </div>
  );
};

type FileTreeProps = {
  filetree: FileTreeType;
  onSelect: (path: String) => void;
};

const FileTree = ({ filetree, onSelect }: FileTreeProps) => {
  return (
    <aside className="border-r border-red-400 max-w-xs w-full p-2">
      <div className="p-2 flex justify-between">
        <p className="text-lg">Files</p>
        <div className="flex gap-2">
          <button>
            <FileAddOutlined />
          </button>
          <button>
            <FolderAddOutlined />
          </button>
        </div>
      </div>
      <ul>
        {Object.keys(filetree).map((child) => (
          <li key={child}>
            <BuildFileTree
              nodes={filetree[child]}
              fileName={child}
              filePath={`/workspace/${child}`}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FileTree;
