import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import ActionBar from './action-bar';

interface TextEditorProps {
  cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return () => {
          setEditing(false);
        };
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  if (editing) {
    return (
      <div>
        <div className="text-editor card-content" ref={ref}>
          <MDEditor
            value={cell.content}
            onChange={(v) => {
              updateCell(cell.id, v || '');
            }}
          ></MDEditor>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-editor card-content">
        <ActionBar id={cell.id} />
        <div className="card-content" onClick={() => setEditing(true)}>
          <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
