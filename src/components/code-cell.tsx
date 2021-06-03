import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import build from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    let timer: any;
    timer = setTimeout(async () => {
      const output = await build(input);
      setCode(output.code);
      setError(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="card-content">
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const a = 1;"
              onChange={(value) => setInput(value)}
            />
          </Resizable>
          <Preview code={code} error={error} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
