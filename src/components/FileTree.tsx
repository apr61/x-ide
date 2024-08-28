import { PropsWithChildren, useState } from "react";
import { FileTreeType } from "../types/api";
import {
  FileAddOutlined,
  FileOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

type DirectoryProps = {
  name: String;
} & PropsWithChildren;

const Directory = ({ name, children }: DirectoryProps) => {
  const [isOpen, setIsopen] = useState(false);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsopen((prev) => !prev);
  };

  return (
    <div className="my-1">
      <p
        onClick={(e) => handleOnClick(e)}
        className="cursor-pointer flex gap-2 items-center hover:bg-gray-700 p-1"
      >
        {isOpen ? <FolderOpenOutlined /> : <FolderOutlined />}
        <span>{name}</span>
      </p>
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
  const isDir = !!nodes;

  return (
    <div className="ml-2">
      {isDir ? (
        <Directory name={fileName}>
          <ul>
            {Object.keys(nodes).map((child) => (
              <li key={child}>
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
          className="cursor-pointer flex gap-2 hover:bg-gray-700 p-1"
          onClick={() => onSelect(filePath)}
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
    <aside className="border-r border-red-400 max-w-xs w-full p-1">
      <div className="p-2 flex justify-between">
        <p className="text-lg">Files</p>
        <div className="flex gap-2">
          <button>
            <FileAddOutlined />
          </button>
          <button className="text-lg">
            <FolderAddOutlined />
          </button>
          <button>
            <ReloadOutlined />
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
