import { Editor } from "@monaco-editor/react"

const CodeEditor = () => {
  return (
    <div className="flex-1">
        <Editor theme="vs-dark" />
    </div>
  )
}

export default CodeEditor