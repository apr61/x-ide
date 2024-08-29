import { createContext, useState } from "react";

type PlaygroundContextType = {
  selectedFile: String | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<String>>
};

export const PlaygroundContext = createContext<PlaygroundContextType | null>(
  null
);

type PlaygroundProviderProps = React.PropsWithChildren;

const PlaygroundProvider = ({ children }: PlaygroundProviderProps) => {
  const [selectedFile, setSelectedFile] = useState<String>("");
  return (
    <PlaygroundContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
