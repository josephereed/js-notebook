import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const bundle = useTypedSelector((state) => {
    return state.bundles[cell.id];
  });

  const { updateCell, createBundle } = useActions();
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    let timer: any;
    timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line
  }, [cell.content, cell.id, createBundle]);

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
          <div className="iframe-wrapper">
            {!bundle || bundle.loading ? (
              <div className="progress-cover">
                <div className="progress-bar-wrapper">
                  <progress className="progress is-small is-primary">
                    Loading
                  </progress>
                </div>
              </div>
            ) : (
              <Preview
                code={bundle.code}
                error={bundle.err}
                id={cell.id}
              ></Preview>
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
