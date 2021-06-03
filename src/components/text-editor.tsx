import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log('element clicked is inside editor');
        return;
      }
      console.log('element clicked is not inside editor');
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
            value={value}
            onChange={(v) => {
              setValue(v || '');
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-editor card">
        <div className="card-content" onClick={() => setEditing(true)}>
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
