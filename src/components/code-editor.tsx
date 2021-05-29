import { useRef } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';

interface CodeEditorProps {
  initialValue?: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
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
      <button className="button button-format is-primary is-small" style={{ float: 'right'}} onClick={onFormatClick}>Format</button>
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