import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue?: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.updateOptions({ tabSize: 2 });
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const onFormatClick = () => {
    // Get current value from the editor
    const unformatted = editorRef.current.getValue();
    console.log(editorRef.current);
    // Format that value
    const formatted = prettier.format(unformatted, { parser: 'babel', plugins: [parser], useTabs: false, semi: true, singleQuote: true });
    // Set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button style={{ float: 'right'}} onClick={onFormatClick}>Format</button>
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      language="javascript"
      height="500px"
      theme="dark"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
    </div>
  );
};

export default CodeEditor;
