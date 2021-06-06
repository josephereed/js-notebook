import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import build from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    let timer: any;
    timer = setTimeout(async () => {
      const output = await build(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setCode('');
      setError('');
    };
  }, [cell.content]);

  return (
    <div className="card-content">
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
            ></CodeEditor>
          </Resizable>
          <Preview code={code} error={error} id={cell.id}></Preview>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
