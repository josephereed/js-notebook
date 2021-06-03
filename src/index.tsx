import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

export const App = () => {
  return (
    <div>
      <TextEditor />
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
