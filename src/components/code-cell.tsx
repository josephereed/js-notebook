import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import build from '../bundler';
import Resizable from './resizable';
import { setTokenSourceMapRange } from 'typescript';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    let timer: any;
    timer = setTimeout(async () => {
      const output = await build(input);
      setCode(output);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
