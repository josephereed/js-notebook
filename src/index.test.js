import ReactDOM from 'react-dom';
import { CodeEditor } from './components/code-editor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CodeEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
