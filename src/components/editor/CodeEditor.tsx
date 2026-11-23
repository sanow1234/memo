import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      aria-label="Python 코드 편집기"
      basicSetup={{
        bracketMatching: true,
        closeBrackets: true,
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        lineNumbers: true,
      }}
      className="code-editor h-full"
      extensions={[python()]}
      height="100%"
      onChange={onChange}
      placeholder="Python 코드를 입력하세요."
      theme="dark"
      value={value}
    />
  )
}
